import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd, MdEdit } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axioInstance from '../../../utils/axiosIntance'
import Toast from '../../components/ToastMessage/Toast'

const Home = () => {

  const [openAddEditModal, setOpenEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const showToastMessage = (type, message) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate()

  const handleEdit = (noteDetails) => {
    setOpenEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  //Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axioInstance.get("/get-user");
      if(response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if(error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }

  //Get All Notes
  const getAllNotes = async () => {
    try {
      const response = await axioInstance.get("/get-all-notes");

      if(response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error ocurred. Please try again");
    }
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {}
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
          {allNotes.map((item, index) => ( 
            <NoteCard
            key={item._id}
            title={item.title} 
            content={item.content}
            tags={item.tags}
            isPinned={item.isPinned}
            onEdit={() => handleEdit(item)}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
          ))}
          
      </div>
    </div>

    <button className='fixed w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 right-10 bottom-10' 
    onClick={() => {
      setOpenEditModal({ isShown: true, type: "add", data: null})
    }}> 
      <MdAdd className='text-[32px] text-white' />
    </button>

    <Modal
    isOpen={openAddEditModal.isShown}
    onRequestClose={() => setOpenEditModal({ isShown: false, type: "add", data: null })}
    style={{
      overlay: {
        backgroundColor: "rgba(0,0,0,0.2)",
      }
    }}
    contentLabel='Add/Edit Note'
    className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5'
    >
      <AddEditNotes 
      type={openAddEditModal.type}
      noteData={openAddEditModal.data}
      onClose={() => {
        setOpenEditModal({isShown: false, type: "add", data: null});
      }}
      getAllNotes={getAllNotes}
      />
    </Modal>

    <Toast
      isShown={showToastMsg.isShown}
      message={showToastMsg.message}
      type={showToastMsg.type}
      onClose={handleCloseToast}

    />
    </>
  ) 
}

export default Home