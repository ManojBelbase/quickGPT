
import { SquarePen, Hash, Image, Eraser, Replace, FileText } from 'lucide-react'
import { path } from "../routes/paths";




export const AiToolsData = [
    {
        title: 'AI Article Writer',
        description: 'Generate high-quality, engaging articles on any topic with our AI writing technology.',
        Icon: SquarePen,
        bg: { from: '#3588F2', to: '#0BB0D7' },
        path: path.WRITE_ARTICLE
    },
    {
        title: 'Blog Title Generator',
        description: 'Find the perfect, catchy title for your blog posts with our AI-powered generator.',
        Icon: Hash,
        bg: { from: '#B153EA', to: '#E549A3' },
        path: path.BLOG_TITLE
    },
    {
        title: 'AI Image Generation',
        description: 'Create stunning visuals with our AI image generation tool, Experience the power of AI ',
        Icon: Image,
        bg: { from: '#20C363', to: '#11B97E' },
        path: path.GENERATE_IMAGE
    },
    {
        title: 'Background Removal',
        description: 'Effortlessly remove backgrounds from your images with our AI-driven tool.',
        Icon: Eraser,
        bg: { from: '#F76C1C', to: '#F04A3C' },
        path: path.REMOVE_BACKGROUND
    },
    {
        title: 'Replace Background',
        description: 'Replace your image background seamlessly using AI for fast, accurate, and professional-looking results.',
        Icon: Replace,
        bg: { from: '#5C6AF1', to: '#427DF5' },
        path: path.REPLACE_BACKGROUND
    },
    {
        title: 'Resume Reviewer',
        description: 'Get your resume reviewed by AI to improve your chances of landing your dream job.',
        Icon: FileText,
        bg: { from: '#12B7AC', to: '#08B6CE' },
        path: path.REVIEW_RESUME,
        tag: "Upcomming"
    }
]

