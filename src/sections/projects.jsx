import Image from 'next/image';
import { TbExternalLink } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";

const { data } = require('./projects.json');

const notFoundImg = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";

const SkillChip = ({ text }) => (
    <div className="rounded-full p-1 px-2 border border-slate-300 text-sm text-slate-600">
        {text}
    </div>
);

const ImageWrapper = ({ children }) => {
    return (
        <div className="flex w-full items-center justify-center h-full">
            {children}
        </div>
    )
}

const ProjectCard = ({ data }) => (
    <div className="rounded shadow-md bg-white grid grid-cols-2">
        <div className="pt-4 pl-4 pb-4 flex flex-col justify-between">
            <div>
                <h4 className="font-semibold text-xl text-slate-700">{data.title}</h4>
                <p className="text-sm mt-2 text-slate-600">{data.description}</p>
            </div>
            <div className="flex gap-4 text-slate-600">
                <a target='_blank' href="https://boom-tools.casantiago.com?source=casantiago.com" className='flex gap-2 justify-center'>Live demo <TbExternalLink size={20} /></a>
                <a target='_blank' href='https://github.com/ca-santiago/boom-steps-ui' className='flex gap-2 justify-center'>Code <FaGithub size={20} /></a>
            </div>
            <div className="flex gap-2">
                {data.skills.map(sk => <SkillChip key={sk} text={sk} />)}
            </div>
        </div>
        {/* Images */}
        <div className='bg-slate-50'>
            {data.images.map(uri => (
                <ImageWrapper key={uri}>
                    <Image width={250} height={250} src={uri || notFoundImg} alt={`${data.title.replace(' ', '-')}-img`} />
                </ImageWrapper>
            ))}
        </div>
    </div>
)

export const ProjectsSection = () => {
    return (
        <section id="projects" className="h-screen w-full bg-slate-200">
            <h3 className="text-center font-semibold text-slate-600 text-3xl pt-5 md:pt-10">Projects</h3>
            <div className="w-full md:w-4/5 lg:w-2/3 xl:w-1/3 px-2 md:px-0 md:mx-auto mt-10">
                <div className="flex flex-col gap-4">
                    {data.map(proj => <ProjectCard key={proj.id} data={proj} />)}
                </div>
            </div>
        </section>
    )
}