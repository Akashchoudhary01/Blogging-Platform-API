import { Router } from "express";
import {
  allBlogs,
  createBlogs,
  editPost,
  deletePost,
  Blogsdetails,
} from "../controllers/blogs.controller.js";

const route = Router();

// Show all blogs
route.get("/", allBlogs);

// Add blog
route.post("/addblog", createBlogs);

// Show single blog
route.get("/blog/:id", Blogsdetails);

// Update
route.put("/:id", editPost);

// Delete
route.delete("/delete/:id", deletePost);

export default route;
