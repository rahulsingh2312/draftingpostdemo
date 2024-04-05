'use client'
import { useState } from "react"
import {format } from 'date-fns'
export default function Postform ({addDraftedPost}) {
    const [content , setContent] = useState('');
    const [scheduledDate , setScheduledDate] = useState('');
    const handleContentChange = (e) =>{
        setContent(e.target.value);

    };
    const handleScheduledDateChange = (e) =>{
        setScheduledDate(e.target.value);

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(content && scheduledDate){
            const formattedDate = format(new Date(scheduledDate), "yyyy-MM-dd-'T'HH:mm")
          addDraftedPost({ content , scheduledDate: formattedDate});
            setContent('');
            setScheduledDate('');

        }
    }
    return(<>
    <form onSubmit={handleSubmit}>
    <div className="flex mt-20 gap-2"> 
    <textarea className="text-black"
        value={content}
        onChange={handleContentChange}
        placeholder="write your post"/>
        <input   className="text-black "
        type="datetime-local"
        value={scheduledDate}
        onChange={handleScheduledDateChange} />
        </div>
        <div className="flex justify-center mt-10 border-1  ">
        <button type="submit" className="border-white border-2 p-2 rounded-md   mb-10">schedule post</button>
        </div>
    </form>
    
    </>)
}