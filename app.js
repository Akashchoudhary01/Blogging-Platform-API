import express from 'express';
import path from 'path';

const app = express();
import blogRoute from './routes/blog.route.js'
import BLOG from './models/blog.model.js';

app.use(express.json());

app.set('view engine' , 'ejs');
app.set('views' , path.resolve('./views'));

app.get("/" , async(req , res)=>{
    const allBlogs = await BLOG.find({})
    res.render("home" , {
        blogs : allBlogs
    });
})
app.use("/api/v1/blogs" , blogRoute);

export default app;