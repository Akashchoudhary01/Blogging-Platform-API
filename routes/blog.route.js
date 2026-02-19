import { Router } from "express";
import { allBlogs , createBlogs , editPost , deletePost } from "../controllers/blogs.controller.js";

const route = Router();

route.get("/" , allBlogs);
route.post("/" , createBlogs);
route.put("/:id" , editPost);
route.delete("/:id" , deletePost)

export default route;