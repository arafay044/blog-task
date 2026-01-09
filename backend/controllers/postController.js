const Post = require("../models/Post");

// PUBLIC - ALL POSTS
exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate("authorId", "name");
  res.json(posts);
};

// PUBLIC - SINGLE POST
exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("authorId", "name");
  res.json(post);
};

// CREATE POST
exports.createPost = async (req, res) => {
  const post = await Post.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.userId
  });
  res.json(post);
};

// UPDATE POST (OWNER ONLY)
exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.authorId.toString() !== req.userId)
    return res.status(403).json({ message: "Unauthorized" });

  post.title = req.body.title;
  post.content = req.body.content;
  await post.save();

  res.json(post);
};

// DELETE POST (OWNER ONLY)
exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.authorId.toString() !== req.userId)
    return res.status(403).json({ message: "Unauthorized" });

  await post.deleteOne();
  res.json({ message: "Post deleted" });
};
