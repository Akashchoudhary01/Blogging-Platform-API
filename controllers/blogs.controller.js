import BLOG from "../models/blog.model.js";
const allBlogs = async (req, res) => {
  try {
    const allpost = await BLOG.find();

    res.render("home", { blogs: allpost }); // index.ejs
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const createBlogs = async (req, res) => {
  try {
    const { title, category, content, tags } = req.body;

    if (!title || !category || !content || !tags) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const tagsArray = tags.split(",").map(tag => tag.trim());

    await BLOG.create({
      title,
      category,
      content,
      tags: tagsArray,
    });

    res.redirect("/");

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const Blogsdetails = async(req , res)=>{
    const id = req.params.id;

    const blog = await BLOG.findById(id);

    if(!blog){
        return res.status(400).json({
            success : true,
            message : "Blog not found"
        })
    }
    return res.status(200).json({
        success : true,
        blog,
    })

}
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
  try {
    const { id } = req.params;

    const blog = await BLOG.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await BLOG.findByIdAndDelete(id);

    return res.redirect("/");

    // return res.status(200).json({
    //   success: true,
    //   message: "Blog deleted successfully",
    // });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export { allBlogs, createBlogs, editPost, deletePost , Blogsdetails
 };
