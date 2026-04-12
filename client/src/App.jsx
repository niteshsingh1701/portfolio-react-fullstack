import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/shared/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Navbar />
            <main>
                <Suspense fallback={<div className="loading-fallback" style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/project/:id" element={<ProjectDetails />} />
                    </Routes>
                </Suspense>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
