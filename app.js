import express from "express";
import path from "path";

const app = express();
import blogRoute from "./routes/blog.route.js";
import BLOG from "./models/blog.model.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allBlogs = await BLOG.find({});
  res.render("home", {
    blogs: allBlogs,
  });
});

app.get("/addblog", (req, res) => {
  res.render("addblog");
});

app.get("/blog/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await BLOG.findById(id);
     if (!blog) {
      return res.redirect("/"); // or 404 page
    }
    res.render("blog", {
    blog 
  });
});

app.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await BLOG.findById(id);
  res.render("edit" , {
    blog
  });
});


app.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await BLOG.findByIdAndDelete(id);
  return res.redirect("/"); // or 404 page

  
});

app.use("/api/v1/blogs", blogRoute);

export default app;
