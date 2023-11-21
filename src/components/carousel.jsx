"use client";
import Image from "next/image";
import { useState } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

const notFoundImg =
  "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";

export default function Carousel({ slides, w, h, name }) {
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="overflow-hidden relative flex">
      <div
        className={`flex transition ease-out duration-40`}
        style={{
          transform: `translateX(-${current * 354}px)`,
        }}
      >
        {slides.map((s, index) => (
          <div key={index} className="w-[354px]">
            <Image
              className="w-full"
              key={index}
              src={s || notFoundImg}
              width={1080}
              height={912}
              alt={`${name}-${index}`}
            />
          </div>
        ))}
      </div>

      <div className="absolute top-0 h-full w-full justify-between items-center flex text-transparent hover:text-slate-500 transition duration-800 ease-in px-3 text-xl">
        <button onClick={previousSlide}>
          <BsFillArrowLeftCircleFill />
        </button>
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-4 w-full">
        {slides.map((s, i) => (
          <div
            onClick={() => setCurrent(i)}
            key={"circle-" + i}
            className={`rounded-full w-2 h-2 cursor-pointer  ${
              i == current ? "bg-white" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
