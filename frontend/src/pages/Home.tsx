import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import { Hero } from "../components/home/Hero";
import { AITools } from "../components/home/AIToolsGrid";
import { Testimonials } from "../components/home/Testimonials";
import Plans from "../components/home/Plans";
import { FooterSection } from "../components/shared/Footer";
import ChatAssistant from "../components/home/ChatAssistant";

const Home = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const el = document.querySelector(hash);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    }, [hash]);

    return (
        <>
            <Navbar />
            <Hero />
            <AITools />
            <Testimonials />
            <div id="plans" className="scroll-mt-24">
                <Plans />
            </div>
            <FooterSection />
            <ChatAssistant />
        </>
    );
};

export default Home;
