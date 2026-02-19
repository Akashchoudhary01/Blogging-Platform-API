import express from 'express';

const app = express();
import blogRoute from './routes/blog.route.js'

app.use(express.json());

app.use("/api/v1/blogs" , blogRoute);

export default app;