const { mongoose } = require("mongoose");

const Blog = require("../model/Blog");
const HttpError = require("../model/http-error");
const getAllBlogs = async (req, res, next) => {
  let blog;
  try {
    blog = await Blog.find();
  } catch (err) {
    console.log("couldn't get blogs at home");
  }
  if (!blog) {
    return next(new HttpError("Could not find all blog ", 404));
  }
  res.status(200).json({ Blog: blog });
};

const create_Blog = async (req, res, next) => {
  const { title, body, author } = req.body;
  const created_blog = new Blog({
    title,
    body,
    author,
  });
  try {
    await created_blog.save();
  } catch (err) {
    const error = new HttpError("User creation failed", 500);
    return next(error);
  }
  res.status(201).json({ Blog: created_blog });
};

const getblogby_user = async (req, res, next) => {
  const blogId = req.params.blog_id;
  let blog;
  try {
    blog = await Blog.findById(blogId);
  } catch (err) {
    const error = new HttpError("Could not find a blog for the given id", 404);
    return next(error);
  }
  res.status(201).json({ Blog: blog });
};

const delete_blog = async (req, res, next) => {
  const blogId = req.params.blog_id;
  let blog;
  try {
    blog = await Blog.findById(blogId);
  } catch (err) {
    const error = new HttpError("Could not find a blog for the given id", 404);
    return next(error);
  }
  if (blog) {
    try {
      await Blog.deleteOne({ _id: blogId });
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not delete place !!!.",
        500
      );
      return next(error);
    }
  }
  res.status(200).json({ message: 'Deleted place.' });
};

exports.create_Blog = create_Blog;
exports.getAllBlogs = getAllBlogs;
exports.delete_blog = delete_blog;
exports.getblogby_user = getblogby_user;
