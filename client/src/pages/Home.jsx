import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Skills from "../components/Skills/Skills";
import Experience from "../components/Experience/Experience";
import Projects from "../components/Projects/Projects";
import Contact from "../components/Contact/Contact";
import ScrollCurve from "../components/shared/ScrollCurve";

const Home = () => {
    return (
        <>
            <Hero />
            <div style={{ position: 'relative', overflow: 'hidden' }}>
                <ScrollCurve />
                <About />
                <Skills />
                <Experience />
                <Projects />
            </div>
            <Contact />
        </>
    );
};

export default Home;