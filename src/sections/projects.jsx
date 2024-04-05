'use client';
import React from 'react';
import { TbExternalLink } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";

import Slider from 'react-slick';
import ImageViewer from "react-simple-image-viewer";
import Image from "next/image";

import './projects.css';

const { data } = require("./projects.json");

const SkillChip = ({ text }) => (
  <div className="rounded-full p-1 px-2 border border-slate-300 text-sm text-slate-600">
    {text}
  </div>
);

const ProjectCard = ({ data }) => {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);

  const openImageViewer = React.useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div className="rounded shadow-md bg-white grid grid-cols-2 overflow-hidden">
      <div className="p-4 pr-5 flex flex-col justify-between">
        <div>
          <h4 className="font-semibold text-xl text-slate-700">{data.title}</h4>
          <p className="text-sm mt-2 text-slate-600">{data.description}</p>
        </div>
        <div className="flex gap-3 flex-col mt-8">
          <div className="flex gap-4 text-slate-600 ml-1">
            {data.url &&
              <a
                target="_blank"
                href={data.url}
                className="flex gap-2 justify-center"
              >
                Live demo <TbExternalLink size={20} />
              </a>
            }
            {data.gitUrl &&
              <a
                target="_blank"
                href={data.gitUrl}
                className="flex gap-2 justify-center"
              >
                Code <FaGithub size={20} />
              </a>
            }
          </div>
          <div className="flex gap-2 flex-wrap">
            {data.skills.map((sk) => (
              <SkillChip key={sk} text={sk} />
            ))}
          </div>
        </div>
      </div>
      {/* Images */}
      <div className="bg-slate-50 flex flex-row w-full max-h-80">
        {data.images && (
          <Slider
            adaptiveHeight
            className='w-full h-full'
            dots
            infinite
            slidesToScroll={ 1 }
            slidesToShow={ 1 }
          >
            { data.images.map((s, index) => (
              <div
                className="w-[354px] xl:w-[423px] flex"
                key={ index }
              >
                <Image
                  alt={`${ data.title }-${ index }`}
                  className="w-full h-full object-fill"
                  height={ 600 }
                  key={ index }
                  onClick={() => openImageViewer(index)}
                  src={ s || notFoundImg }
                  width={ 600 }
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
      { isViewerOpen && (
        <Viewer
          src={data.images}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)"
          }}
          closeOnClickOutside={true}
        />
      )}
    </div>
  );
};

export const ProjectsSection = () => {
  return (
    <section id="projects" className="scroll-m-14 w-full bg-slate-200 pb-16">
      <h3 className="text-center font-semibold text-slate-600 text-3xl pt-5 md:pt-10">
        Projects
      </h3>
      <div className="w-full md:w-4/5 lg:w-2/3 xl:w-1/3 px-2 md:px-0 md:mx-auto mt-10">
        <div className="flex flex-col gap-10">
          {data.map((proj) => (
            <ProjectCard key={proj.id} data={proj} />
          ))}
        </div>
      </div>
    </section>
  );
};
