import Nav from "@/components/nav";
import { AboutSection } from "@/sections/about";
import { ContactSection } from "@/sections/contact";
import { ProjectsSection } from "@/sections/projects";


export default function Home() {
  return (
    <div>
      <div>
        <Nav />
      </div>
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </div >
  )
}
