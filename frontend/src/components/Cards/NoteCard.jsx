import moment from 'moment';
import { MdOutlinePushPin } from "react-icons/md"; 
import { MdCreate, MdDelete } from 'react-icons/md';

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) => {
  return (
    <div className="border rounded p-4 bg-white dark:bg-slate-800 hover:shadow-xl transition-all mt-5 border-s-slate-500 dark:border-slate-700 mx-4 ease-in-out">
        <div className="flex items-center justify-between">
            <div>
                <h6 className="text-sm font-medium dark:text-slate-100">{title}</h6>
                <span className="text-xs text-slate-500 dark:text-slate-300">{moment(date).format("Do MMM YYYY")}</span>
            </div>

                <MdOutlinePushPin 
                    className={`icon-btn ${isPinned ? 'text-primary' : 'text-gray-400'} dark:text-slate-100`} 
                    onClick={onPinNote} 
                />
        </div>

        <p className="text-xs text0-slate-600 dark:text-slate-200 mt-2">{content?.slice(0, 60)}</p>

        <div className='flex items-center justify-between mt-2'>
            <div className='text-xs text-gray-800 mb-2'>{tags.map((item) => `#${item}`)}</div>

                <div className='flex items-center gap-2'>
                    <MdCreate
                        className='icon-btn hover:text-green-600'
                        onClick={onEdit}
                    />

                    <MdDelete 
                        className='icon-btn hover:text-red-500'
                        onClick={onDelete}
                    />
                </div>
        </div>
    </div>
  )
}

export default NoteCard
