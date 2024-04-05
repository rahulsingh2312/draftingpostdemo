'use client'
import { useState } from "react";
import Postform from './components/Postform'
import Postlist from "./components/Postlist";
import { set } from "date-fns";
export default function Home() {
  const [draftedPosts, setDraftedPosts] = useState([]);
  const addDraftedPost = (post) =>{
    setDraftedPosts([...draftedPosts , post])
  }
  return (
    <div className="flex justify-center items-center">
      <div>
    <div className="flex justify-center items-center text-2xl mt-40"> Post scheduler </div>
    <Postform addDraftedPost={addDraftedPost} />
    <Postlist draftedPosts={draftedPosts} />
    </div>
    </div >
  );
}
