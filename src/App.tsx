import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { TechMarquee } from './components/TechMarquee';
import { Skills } from './sections/skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Publications } from './sections/Publications';
import { Recognition } from './sections/Recognition';
import { ContactFooter } from './sections/ContactFooter';

function App() {
  return (
    <>
      <Navbar visible={true} />

      <main className="bg-bg text-white selection:bg-white/20 selection:text-white overflow-x-hidden">
        <Hero isLoading={false} />
        <TechMarquee />
        <Skills />
        <Projects />
        <Experience />
        <Publications />
        <Recognition />
        <ContactFooter />
      </main>
    </>
  );
}

export default App;
