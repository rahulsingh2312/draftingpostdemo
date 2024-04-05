'use client'
import { useState } from "react"
import {format} from "date-fns"
export default function Postlist ({draftedPosts}) {
    const [publishedPosts , setPublishedPosts] = useState([]);

    const handlePublish = (index) => {
        const publishPost = draftedPosts[index];
        setPublishedPosts([...publishedPosts, publishPost]);
        const updatedDraftedPosts = draftedPosts.filter(( _ ,i) => i !==index);
    };
    return(<div>
    <h2>
        scheduled posts
    </h2>
    <ul>
        {draftedPosts.sort((a,b)=>new Date(a.scheduledDate) - new Date(b.scheduledDate))
        .map((post , index) => (
            <li key={index}>
                <div className="border-2 border-white my-10 p-4">
                <div className="">content:  {post.content}</div>
                <div> time it is scheduled for :  {post.scheduledDate}</div>
                <button className="border-white border-2 p-2 rounded-md mt-5 " onClick={()=> handlePublish(index)}> publish </button>
                </div>
            </li>
        ))}
    </ul>
    <h2>
        published posts
    </h2>
    <ul>
        {publishedPosts.map((post , index) => (
            <li key={index}>
                <div className="border-2 border-white my-10 p-4">
                <div className="">content:  {post.content}</div>
                <div> published at :  {format(new Date(), 'MMM dd, yyyy HH:mm')}</div>
                </div>
            </li>
        ))}
    </ul>
    </div>)
}