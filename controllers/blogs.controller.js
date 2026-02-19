import BLOG from "../models/blog.model.js";
const allBlogs = async (req, res) => {
  try {
    const allpost = await BLOG.find();
    return res.status(200).json({
      success: true,
      message: " All Blogs",
      allpost,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.mess,
    });
  }
};
const createBlogs = async (req, res) => {
  const { title, category, content, tags } = req.body;

  if (!title || !category || !content || !tags) {
    return res.status(400).json({
      success: false,
      message: "All fields are mandatory",
    });
  }

  const newPost = await BLOG.create({
    title,
    category,
    content,
    tags,
  });

  if (!newPost) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong",
    });
  }

  await newPost.save();

  res.status(201).json({
    success: true,
    message: "blog created Successfully",
    data: newPost,
  });
};
const editPost = async (req, res) => {
  const postId = req.params.id;
  const { title, category, content, tags } = req.body;

  if (!title || !category || !content || !tags) {
    return res.status(400).json({
      success: false,
      message: "All fields are mandatory",
    });
  }
  const post = await BLOG.findById(postId);
  if (!post) {
    return res.status(400).json({
      success: false,
      message: "No blog found",
    });
  }

  try {
    post.title = title;
    post.category = category;
    post.content = content;
    post.tags = tags;

    await post.save();
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "e.message",
    });
  }
};
const deletePost = async (req, res) => {
  const id = req.params._id;

  const blogs = await BLOG.findByIdAndDelete(id);

  if (!blogs) {
    res.status(400).json({
      success: false,
      message: "blog not found",
    });


    return res.status(200).json({
      success: true,
      message: "blog deleted Successfully",
    });
  }
};

export { allBlogs, createBlogs, editPost, deletePost };
