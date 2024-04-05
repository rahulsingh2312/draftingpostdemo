'use client'
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const PostList = () => {
  const [draftedPosts, setDraftedPosts] = useState([]);
  const [publishedPosts, setPublishedPosts] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedDraftedPosts = JSON.parse(localStorage.getItem('draftedPosts')) || [];
      const storedPublishedPosts = JSON.parse(localStorage.getItem('publishedPosts')) || [];
      setDraftedPosts(storedDraftedPosts);
      setPublishedPosts(storedPublishedPosts);
    }
  }, []);

  const handlePublish = (index) => {
    const publishedPost = draftedPosts[index];
    const updatedDraftedPosts = draftedPosts.filter((_, i) => i !== index);
    setPublishedPosts([...publishedPosts, publishedPost]);
    setDraftedPosts(updatedDraftedPosts);
    if (typeof window !== 'undefined') {
      localStorage.setItem('draftedPosts', JSON.stringify(updatedDraftedPosts));
      localStorage.setItem('publishedPosts', JSON.stringify([...publishedPosts, publishedPost]));
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <div>
        <h2 className="text-lg font-bold mb-4">Scheduled Posts</h2>
        {draftedPosts.length > 0 ? (
          <div className="grid gap-4">
            {draftedPosts
              .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))
              .map((post, index) => (
                <div key={index} className="border rounded-lg p-4 bg-white shadow">
                  <p className="font-bold text-black">{post.content}</p>
                  <p className="text-sm text-gray-500">Scheduled for: {format(new Date(post.scheduledDate), 'MMM dd, yyyy HH:mm')}</p>
                  <button onClick={() => handlePublish(index)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Publish</button>
                </div>
              ))}
          </div>
        ) : (
          <p>No scheduled posts</p>
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Published Posts</h2>
        {publishedPosts.length > 0 ? (
          <div className="grid gap-4">
            {publishedPosts.map((post, index) => (
              <div key={index} className="border rounded-lg p-4 bg-white shadow">
                <p className="font-bold text-gray-500">{post.content}</p>
                <p className="text-sm text-black">Published at: {format(new Date(), 'MMM dd, yyyy HH:mm')}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No published posts</p>
        )}
      </div>
    </div>
  );
};

export default PostList;
