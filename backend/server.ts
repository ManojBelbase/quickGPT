import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import articleRouter from './routes/article.route';
import blogTitleRouter from './routes/blog-title.route'
import imageRouter from './routes/image.route'
import removeBackgroundRouter from './routes/removeBg.route'
import resumeRouter from './routes/reviewResume.route';
import ReplaceBackgroundRouter from './routes/removeObject.route';

dotenv.config();
const app = express()
// middlewares
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
app.use(requireAuth())

// routes
app.use('/api/article', articleRouter)
app.use('/api/blog-title', blogTitleRouter)
app.use('/api/image', imageRouter)
app.use('/api/remove-background', removeBackgroundRouter)
app.use('/api/remove-object', ReplaceBackgroundRouter)
app.use('/api', resumeRouter)

app.get('/', (req, res) => res.send("server is live"))


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));