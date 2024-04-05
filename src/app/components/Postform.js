'use client'
import { useState } from "react";
import { format } from 'date-fns';

export default function Postform({ addDraftedPost }) {
    const [content, setContent] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleScheduledDateChange = (e) => {
        setScheduledDate(e.target.value);
    };

    const handleSubmit = (e) => {
        // e.preventDefault();
        if (content && scheduledDate) {
            const formattedDate = format(new Date(scheduledDate), "yyyy-MM-dd'T'HH:mm");
            addDraftedPost({ content, scheduledDate: formattedDate });

            // Save drafted post to local storage
            const draftedPostsFromStorage = JSON.parse(localStorage.getItem('draftedPosts')) || [];
            localStorage.setItem('draftedPosts', JSON.stringify([...draftedPostsFromStorage, { content, scheduledDate: formattedDate }]));

            setContent('');
            setScheduledDate('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
        <div className="flex  gap-4">
            <textarea
                className="border border-gray-300 text-black rounded-lg px-4 py-2 placeholder-gray-700 focus:outline-none focus:border-blue-500"
                value={content}
                onChange={handleContentChange}
                placeholder="Write your post"
                rows={4}
            />
            <input
                className="border border-gray-300 rounded-lg px-4 py-2 placeholder-black text-black focus:outline-none focus:border-blue-500"
                type="datetime-local"
                value={scheduledDate}
                onChange={handleScheduledDateChange}
            />
            <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
                Schedule Post
            </button>
        </div>
    </form>
    );
}
