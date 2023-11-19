import { poppins } from "@/fonts"
import Image from "next/image";

export const AboutSection = () => {
    return (
        <section id="about" className="bg-main min-h-screen h-screen w-full">
            <div className="flex flex-row pt-52 mx-auto w-[950px]">
                <div className="bg-slate-50 flex flex-col w-full">
                    <div>
                        {/* Presentation */}
                        <p className="text-slate-700 font-semibold text-lg ml-1">Hi, I&apos;m Carmen Santiago</p>
                        <h1 className={`${poppins.variable} text-[55px] font-bold text-[#2d2e32] leading-tight mb-5`}>Front-End React Developer</h1>

                        {/* Links */}
                        <div>
                            <div>
                                <a className="text-slate-700 font-medium">Github</a>
                            </div>
                            <div>
                                <a className="text-slate-700 font-medium">LinkedIn</a>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-14">
                        <a className="bg-accent p-3 px-4" href="#projects">My projects</a>
                        <a className="ml-8 color-accent" href="#contact">Hire me</a>
                    </div>
                </div>
                <div className=" w-full">
                    <div className="w-full h-full flex items-center justify-center rounded-full overflow-hidden">
                        <Image alt="profile image" className="rounded-full overflow-hidden" width={250} height={250} src="https://media.licdn.com/dms/image/C4E03AQFlomGXiyAZTg/profile-displayphoto-shrink_800_800/0/1608249718397?e=1706140800&v=beta&t=fLdVZoTvpdnXLpGq0ZJ8rF2bIeNp3XsmdhkqHTCVk3g" />
                    </div>
                </div>
            </div>
        </section>
    );
}
