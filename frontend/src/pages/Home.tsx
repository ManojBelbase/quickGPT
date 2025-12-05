import { AITools } from "../components/home/AIToolsGrid"
import { Hero } from "../components/home/Hero"
import Plans from "../components/home/Plans"
import { Testimonials } from "../components/home/Testimonials"
import { FooterSection } from "../components/shared/Footer"
import Navbar from "../components/shared/Navbar"

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <AITools />
            <Testimonials />
            <Plans />
            <FooterSection />
        </>
    )
}

export default Home