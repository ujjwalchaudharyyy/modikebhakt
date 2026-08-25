import { useCallback, useEffect, useState } from "react";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Events from "./components/Events";
import Schedule from "./components/Schedule";
import Speakers from "./components/Speakers";
import Sponsors from "./components/Sponsors";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import RegisterModal from "./components/RegisterModal";

export default function App() {
  const [dark, setDark] = useState(true);
  const [modal, setModal] = useState(false);
  const [preselect, setPreselect] = useState<string | undefined>();

  useEffect(() => {
    const stored = localStorage.getItem("nirvan-theme");
    if (stored) setDark(stored === "dark");
    else setDark(!window.matchMedia("(prefers-color-scheme: light)").matches);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("nirvan-theme", dark ? "dark" : "light");
  }, [dark]);

  const openModal = useCallback((id?: string) => {
    setPreselect(typeof id === "string" ? id : undefined);
    setModal(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Cursor />
      <Navbar dark={dark} toggleTheme={() => setDark((d) => !d)} onRegister={() => openModal()} />

      <main>
        <Hero dark={dark} onRegister={() => openModal()} />
        <Marquee />
        <About />
        <Events onRegister={openModal} />
        <Schedule />
        <Speakers />
        <Sponsors />
        <Gallery />
        <Contact onRegister={() => openModal()} />
      </main>

      <Footer onRegister={() => openModal()} />
      <RegisterModal open={modal} onClose={() => setModal(false)} preselect={preselect} />
    </div>
  );
}
