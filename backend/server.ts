import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import articleRouter from './routes/article.route';
import blogTitleRouter from './routes/blog-title.route'
import imageRouter from './routes/image.route'
import removeBackgroundRouter from './routes/removeBg.route'


dotenv.config();
const app = express()
// middlewares
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
app.use(requireAuth())

// routes
app.use('/api', articleRouter)
app.use('/api', blogTitleRouter)
app.use('/api', imageRouter)
app.use('/api', removeBackgroundRouter)

app.get('/', (req, res) => res.send("server is live"))


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));