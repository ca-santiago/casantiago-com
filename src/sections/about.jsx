import { poppins } from "@/fonts"
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const AboutSection = () => {
    return (
        <section id="about" className="scroll-m-14 bg-main h-auto md:min-h-screen md:h-screen w-full">
            <div className="flex flex-col md:flex-row pt-10 md:pt-52 mx-auto w-full lg:w-[950px]">
                <div className="flex flex-col w-full pl-8 md:px-20 lg:px-0">
                    <div>
                        {/* Presentation */}
                        <p className="text-slate-700 font-semibold text-lg ml-1">Hi, I&apos;m Carmen Santiago</p>
                        <h1 className={`${poppins.variable} text-[55px] font-bold text-[#2d2e32] leading-tight mb-5`}>Frontend React Developer</h1>

                        {/* Links */}
                        <div className="flex flex-row gap-10 items-center select-none cursor-pointer text-slate-500">
                            <div className="flex flex-ro gap-2 items-center">
                                <FaGithub size={24} /><a target="_blank" href="https://github.com/ca-santiago?source=casantiago.com" className="text-slate-700 font-medium">Github</a>
                            </div>
                            <div className="flex flex-row gap-2 items-center ">
                                <FaLinkedin size={24} /><a target="_blank" href="https://www.linkedin.com/in/carmen-santiago-casj?source=casantiago.com" className="text-slate-700 font-medium">LinkedIn</a>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-14 select-none">
                        <a className="bg-accent p-3 px-4" href="#projects">My projects</a>
                        <a className="ml-8 color-accent" href="#contact">Hire me</a>
                    </div>
                </div>
                <div className="w-full">
                    <div id="profile-container" className="w-full h-full flex items-center justify-center rounded-full mt-10 md:-mt-10 -mx-4 md:mx-0 select-none">
                        <Image alt="profile image" className="rounded-full overflow-hidden border-none bg-transparent" width={450} height={450} src="https://media.licdn.com/dms/image/C4E03AQFlomGXiyAZTg/profile-displayphoto-shrink_800_800/0/1608249718397?e=1706140800&v=beta&t=fLdVZoTvpdnXLpGq0ZJ8rF2bIeNp3XsmdhkqHTCVk3g" />
                    </div>
                </div>
            </div>
        </section>
    );
}
