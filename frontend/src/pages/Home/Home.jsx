import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axioInstance from '../../../utils/axiosIntance'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import addNotesImg from '../../assets/images/add-notes.svg';
import noDataImg from '../../assets/images/no-data.svg';

const Home = () => {

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate()

  const [openAddEditModal, setOpenEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  // Keep modal vertically clear of the sticky navbar and nicely centered
  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "88px 16px 24px", // top padding offsets navbar height
      zIndex: 30,
    },
    content: {
      position: "relative",
      inset: "unset", // let flex layout handle positioning
    }
  };

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

  const handleEdit = (noteDetails) => {
    setOpenEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  //Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axioInstance.get("/api/auth/get-user");
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
      const response = await axioInstance.get("/api/notes/get-all-notes");

      if(response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch(error) {
      console.error("An unexpected error occurred while fetching notes:", error);
    }
  }

  //Delted Note
  const DeleteNote = async (data) => {
    try {
      const noteId = data._id;
      const response = await axioInstance.delete("api/notes/delete-note/" + noteId);

      if(response.data && !response.data.error) {
              showToastMessage("delete", "Note Deleted Successfully",);
              getAllNotes();
              setOpenEditModal({ isShown: false, type: "add", data: null });
      }
    } catch (error) {
          if(
            error.response &&
            error.response.data &&
              error.response.data.message
            ) {
            console.log("An unexpected error ocurred. Please try again");
          }
    }
  }

  //Search for a notes
  const onSearchNote = async (query) => {
    try {
      const response = await axioInstance.get("/api/notes/search-notes", {
         params: { query },
      });

      if(response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Update isPinned notes
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    const currentPinStatus = noteData.isPinned;
    const newPinStatus = !currentPinStatus;

    console.log('Before update:', {
      noteId,
      currentPinStatus,
      newPinStatus
    });

    try {
      const response = await axioInstance.put(
        "/api/notes/update-note-pinned/" + noteId,
        {
          isPinned: newPinStatus
        }
      );
  
      if(response.data && response.data.note) {
        console.log('After update:', {
          updatedNote: response.data.note,
          newPinStatus: response.data.note.isPinned
        });
        
        if(response.data.note.isPinned === newPinStatus) {
          showToastMessage("update", "Note Pin Status Updated");
          getAllNotes();
        } else {
          showToastMessage("error", "Pin status not updated correctly");
          console.error("Pin status mismatch:", {
            expected: newPinStatus,
            received: response.data.note.isPinned
          });
        }
      }
    } catch (error) {
      console.error("Error updating pin status:", {
        error: error.message,
        response: error.response?.data
      });
      showToastMessage("error", "Failed to update note pin status");
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar 
      userInfo={userInfo}
      onSearchNote={onSearchNote} 
      handleClearSearch={handleClearSearch}
      />

      <div className='container mx-auto px-6'>
       {allNotes.length> 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
          {allNotes.map((item) => ( 
            <NoteCard
            key={item._id}
            title={item.title} 
            content={item.content}
            tags={item.tags}
            isPinned={item.isPinned}
            onEdit={() => handleEdit(item)}
            onDelete={() => DeleteNote(item)}
            onPinNote={() => updateIsPinned(item)}
          />
          ))}
      </div>
      ) : (
        <EmptyCard
          imgSrc={isSearch ? noDataImg : addNotesImg} 
          message={isSearch ? `Opps! No notes found matching your search.` : `Start creating your first note! Click the 'Add' button to
          jot down your thoughts, ideas, and reminders. Let's get started!`}
        />
      )}
    </div>

    <button className='fixed w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 right-10 bottom-10 shadow-lg shadow-primary/30' 
    onClick={() => {
      setOpenEditModal({ isShown: true, type: "add", data: null})
    }}> 
      <MdAdd className='text-[32px] text-white' />
    </button>

    <Modal
    isOpen={openAddEditModal.isShown}
    onRequestClose={() => setOpenEditModal({ isShown: false, type: "add", data: null })}
    style={modalStyles}
    contentLabel='Add/Edit Note'
    className='w-[90%] md:w-[60%] lg:w-[40%] max-h-[80vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-md mx-auto p-5 border border-slate-100 dark:border-slate-700'
    >
      <AddEditNotes 
      type={openAddEditModal.type}
      noteData={openAddEditModal.data}
      onClose={() => {
        setOpenEditModal({isShown: false, type: "add", data: null});
      }}
      getAllNotes={getAllNotes}
      showToastMessage={showToastMessage}
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
