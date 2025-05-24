
"use client";

import Image from "next/image";
import { useState } from 'react';



export default function Home() {
  const [count, setCount] = useState(0);

  function MyButton({ onClick }) {
  return (
    <button onClick={onClick}>
      I'm a button, I've been clicked {count} times
    </button>
  );
}

function SecondButton({}) {
  function handleClick() {
    setCount(0);
  }

  return (
    <button onClick={handleClick} className="bg-red-500 text-4xl text-amber-300 p-4">
      <div className="text-blue">Click to reset!</div>
    </button>
  )
}
  
  function handleClick() {
    setCount(count + 1);
  }
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-(family-name:--font-geist-sans)">
      <MyButton count = {count} onClick = {handleClick}/>
      <SecondButton  />

    </div>
  );
}
