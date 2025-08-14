const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { createPost, deletePost } = require("../controllers/post.controller");
const multer = require('multer');
const router = express.Router();
const Post = require("../models/post.model");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/post', 
  authMiddleware, 
  upload.single('image'), 
  createPost)
router.get('/post', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete('/post/:id', authMiddleware, deletePost);

module.exports = router;