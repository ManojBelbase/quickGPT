import { AITools } from "../components/home/AIToolsGrid"
import { Hero } from "../components/home/Hero"
import { Testimonials } from "../components/home/Testimonials"
import Navbar from "../components/shared/Navbar"

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <AITools />
            <Testimonials />
        </>
    )
}

export default Home