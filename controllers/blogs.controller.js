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
try {
    
    const blog = await BLOG.findById(postId);
  
    if (!blog) {
      return res.status(200).json({
        success: false,
        message: "Blog not found ! ",
      });
    }
  
    blog.title = title;
    blog.category = category;
    blog.content = content;
    blog.tags = tags;
  
    await blog.save();
  
    return res.status(200).json({
      success: true,
      message: "Blog Updated Successfully",
    });
} catch (error) {
    return res.status(200).json({
        success : false,
        message : error.message,
    })
    
}
};

//
const deletePost = async (req, res) => {
  const id = req.params.id;

  const blogs = await BLOG.findById(id);

  if (!blogs) {
    return res.status(400).json({
      success: false,
      message: "blog not found",
    });
  }

  try {
    await BLOG.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "blog deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { allBlogs, createBlogs, editPost, deletePost };
