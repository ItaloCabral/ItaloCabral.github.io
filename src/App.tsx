import BackgroundDecor from "./components/BackgroundDecor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Talks from "./components/Talks";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export default function App() {
  return (
    <>
      <BackgroundDecor />
      <div className="app-shell">
        <Header />
        <BackToTop />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Talks />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
