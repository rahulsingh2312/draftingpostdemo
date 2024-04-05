'use client'
import { gsap } from "gsap";
import Postform from './components/Postform'
import Postlist from "./components/Postlist";
import { set } from "date-fns";
import { useState, useEffect } from 'react';
export default function Home() {
  const [draftedPosts, setDraftedPosts] = useState([]);
  const addDraftedPost = (post) =>{
    setDraftedPosts([...draftedPosts , post])
  }
  useEffect(() => {
    gsap.set(".ball", { xPercent: -50, yPercent: -50 });
    let targets = gsap.utils.toArray(".ball");
    window.addEventListener("mouseleave", (e) => {
      gsap.to(targets, {
        duration: 0.5,
        scale: 0,
        ease: "power1.out",
        overwrite: "auto",
        stagger: 0.02,
      });
    });
    window.addEventListener("mouseenter", (e) => {
      gsap.to(targets, {
        duration: 0.5,
        scale: 1,
        ease: "power1.out",
        overwrite: "auto",
        stagger: 0.02,
      });
    });
    window.addEventListener("mousemove", (e) => {
      gsap.to(targets, {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY,
        ease: "power1.out",
        overwrite: "auto",
        stagger: 0.02,
      });
    });
  }, []);

  return (
    <>
     <div className="ball bg-violet-400/50 w-96 h-96 fixed top-0 left-0 rounded-full"></div>
    <div className="flex justify-center z-50 items-center">
       
    
      <div>
    <div className="flex justify-center items-center text-2xl mt-40"> Post scheduler </div>
    <Postform addDraftedPost={addDraftedPost} />
    <Postlist draftedPosts={draftedPosts} />
    </div>
    </div >
    </>
  );
}
