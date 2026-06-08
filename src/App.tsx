import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './sections/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { TechMarquee } from './components/TechMarquee';
import { Skills } from './sections/skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Publications } from './sections/Publications';
import { Hobbies } from './sections/Hobbies';
import { ContactFooter } from './sections/ContactFooter';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <Navbar visible={!isLoading} />

      <main className="bg-bg text-white selection:bg-white/20 selection:text-white overflow-x-hidden">
        <Hero isLoading={isLoading} />
        <TechMarquee />
        <Skills />
        <Projects />
        <Experience />
        <Publications />
        <Hobbies />
        <ContactFooter />
      </main>
    </>
  );
}

export default App;
