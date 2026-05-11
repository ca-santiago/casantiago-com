'use client';
import React from 'react';
import ReactDOM from 'react-dom';
import { TbExternalLink } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";

import Slider from 'react-slick';
import ImageViewer from "react-simple-image-viewer";
import Image from "next/image";

import './projects.css';

const { data } = require("./projects.json");

const SkillChip = ({ text }) => (
  <span className="rounded-full px-3 py-1 bg-slate-100 text-xs font-medium text-slate-500 border border-slate-200">
    {text}
  </span>
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
    <div className="rounded-xl shadow-sm border border-slate-200 bg-white overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Image carousel */}
      {data.images && (
        <div className="bg-slate-100 overflow-hidden">
          <Slider
            className="w-full"
            dots
            infinite
            slidesToScroll={1}
            slidesToShow={1}
            arrows={false}
          >
            {data.images.map((s, index) => (
              <div key={index} className="cursor-zoom-in" onClick={() => openImageViewer(index)}>
                <Image
                  alt={`${data.title}-${index}`}
                  src={s}
                  width={600}
                  height={340}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* No-image placeholder */}
      {!data.images && (
        <div className="h-24 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <span className="text-slate-300 text-4xl font-bold select-none">
            {data.title.charAt(0)}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <h4 className="font-bold text-base text-slate-800 leading-snug">{data.title}</h4>
          <p className="text-sm mt-2 text-slate-500 leading-relaxed line-clamp-3">{data.description}</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((sk) => (
              <SkillChip key={sk} text={sk} />
            ))}
          </div>

          {(data.url || data.gitUrl) && (
            <div className="flex gap-3 pt-3 border-t border-slate-100">
              {data.url && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data.url}
                  className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <TbExternalLink size={16} />
                  Live demo
                </a>
              )}
              {data.gitUrl && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data.gitUrl}
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <FaGithub size={16} />
                  Code
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {isViewerOpen && typeof document !== 'undefined' && ReactDOM.createPortal(
        <ImageViewer
          src={data.images}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{ backgroundColor: "rgba(0,0,0,0.9)" }}
          closeOnClickOutside
        />,
        document.body
      )}
    </div>
  );
};

export const ProjectsSection = () => {
  return (
    <section id="projects" className="scroll-m-14 w-full bg-slate-50 pb-20">
      <div className="text-center pt-12 md:pt-16">
        <a href="#projects">
          <h3 className="font-bold text-slate-800 text-3xl">Projects</h3>
        </a>
        <p className="text-slate-400 mt-2 text-sm">Some things I&apos;ve built</p>
      </div>
      <div className="max-w-5xl mx-auto px-4 md:px-8 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((proj) => (
            <ProjectCard key={proj.id} data={proj} />
          ))}
        </div>
      </div>
    </section>
  );
};
