import { Router } from "express";
import {
  allBlogs,
  createBlogs,
  editPost,
  deletePost,
  allBlogsdetails,
} from "../controllers/blogs.controller.js";

const route = Router();

// Show all blogs
route.get("/", allBlogs);

// Add blog
route.post("/addblog", createBlogs);

// Show single blog
route.get("/:id", allBlogsdetails);

// Update
route.put("/:id", editPost);

// Delete
route.delete("/:id", deletePost);

export default route;
