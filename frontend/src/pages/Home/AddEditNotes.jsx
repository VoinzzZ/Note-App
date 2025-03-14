import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';
import axioInstance from '../../../utils/axiosIntance';

const AddEditNotes = ({ type, onClose, getAllNotes, noteData, showToastMessage  }) => {
        const [title, setTitle] = useState(noteData?.title || "");
        const [content, setContent] = useState(noteData?.content || "");
        const [tags, setTags] = useState(noteData?.tags || []);

        const [error, setError] = useState(null);

        // Add Note
        const addnewNote = async () => {
                try {
                        const response = await axioInstance.post("/add-note", {
                                title,
                                content,
                                tags,
                        });

                        if(response.data && response.data.note) {
                                showToastMessage("add", "Note Added Successfully"); // Tambahkan type "add"
                                getAllNotes();
                                onClose();
                        }
                } catch (error) {
                        if(error.response && error.response.data && error.response.data.message) {
                                setError(error.response.data.message);
                        }
                }
        };

        // Edit Note
        const editNote = async () => {
                const noteId = noteData._id;

                try {
                        const response = await axioInstance.put("/edit-note/" + noteId, {
                                title,
                                content,
                                tags,
                        });

                        if(response.data && response.data.note) {
                                showToastMessage("add", "Note Updated Successfully"); // Tambahkan type "add" 
                                getAllNotes();
                                onClose();
                        }
                } catch (error) {
                        if(error.response && error.response.data && error.response.data.message) {
                                setError(error.response.data.message);
                        }
                }
        };
        
        
        const handleAddNote = () => {
                if(!title) {
                        setError("Please enter the title");
                        return;
                }

                if(!content) {
                        setError("Please enter the content");
                        return;
                }

                setError("");

                if(type === 'edit') {
                        editNote()
                } else {
                        addnewNote()
                }


        }
        
return (
    <div className='relative'>
        <button 
        className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50'
        onClick={onClose}
        >
                <MdClose className='text-xl text-slate-400' />
        </button>
        <div className='flex flex-col gap-2'>
                <label className='input-label'>TITLE</label>
                <input
                type='text'
                className='text-2xl text-slate-950 outline-none mb-2'
                placeholder='Go to GYM At 5'  
                value={title}
                onChange={({ target }) => setTitle(target.value)}                                             
                />
        </div>

        <div className='flex flex-col gap-2 mt-2'>
                <label className='input-label mb-2'>CONTENT</label>
                <textarea 
                type='text'
                className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
                placeholder='Content'
                rows={10}
                value={content}
                onChange={({ target }) => setContent(target.value)}
                />
        </div>

        <div className='mt-3'>
                <label className='input-label mb-2'>TAGS</label>
                <TagInput tags={tags} setTags={setTags}/> 
        </div>

        {error && <p className='text-red-500 text-xs pr-4'>{error}</p>}

        <button
        className='btn-primary font-medium mt-5 p-3'
        onClick={handleAddNote}>
               {type === "edit" ? "UPDATE" : "ADD"}
        </button>
    </div>
)
}

export default AddEditNotes