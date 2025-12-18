# QuickGPT – All-in-One AI Content & Image Creator

**Your ultimate AI toolbox for creators, bloggers, designers, and marketers** ✨

Generate stunning images from text, write full articles, craft catchy blog titles, edit photos like a pro — and share your best creations in a vibrant public community gallery.

**Live Demo:** [https://quickgptai.vercel.app/](https://quickgptai.vercel.app/) 

## 🚀 Key Features

- **Text-to-Image Generation**  
  Turn any idea into beautiful artwork with multiple styles (Realistic, Anime, Watercolor, Digital Painting, 3D Render, etc.).

- **Article Generation**  
  Create complete, well-structured blog posts or articles from just a topic or prompt.

- **Blog Title Generator**  
  Instantly get dozens of catchy, SEO-friendly title suggestions.

- **Background Removal**  
  One-click transparent PNG results for clean product photos or designs.

- **Replace Background**  
  Swap any background with a new scene, color, or custom image using AI.

- **Magic Eraser (Object Removal)**  
  Describe unwanted objects (e.g., "person, car, signs") and let AI seamlessly erase them.

- **Public Community Gallery**  
  Publish your creations for everyone to see, explore trending AI art, and get inspired.

- **Personal History**  
  Quick access to all your past generations with one-click reuse.

- **Responsive & Modern UI**  
  Clean, beautiful design powered by Tailwind CSS that works perfectly on mobile and desktop.

## 🛠️ Tech Stack

### Frontend
- React + TypeScript + Vite
- Tailwind CSS
- ShadCN UI components
- Lucide React icons
- Axios
- React Hot Toast (notifications)
- **Clerk** – Authentication (email, social logins, magic links)

### Backend
- Node.js + Express + TypeScript
- **Neon Database** (Serverless PostgreSQL)
- **Cloudinary** – Image storage and optimized delivery
- **ClipDrop API** – AI-powered image processing (background remove/replace, object removal)
- **Clerk** – User management and secure authentication

### Payment
- **Clerk Payments** – Seamless subscription and credit purchase integration

## 📦 Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/quickgpt.git
   cd quickgpt
