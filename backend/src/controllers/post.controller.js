const postModel = require('../models/post.model');
const generateCaption = require('../service/ai.service');
const uploadImage = require('../service/storage.service');
const {v4: uuidv4} = require('uuid');

async function createPost(req,res){
 
  const file = req.file;
  const base64ImageFile = file.buffer.toString('base64');
  
  console.log(file)
  
  const caption = await generateCaption(base64ImageFile);

  const result = await uploadImage(file.buffer, `${uuidv4()}`);

  const post = await postModel.create({
    caption: caption,
    image: result.url,
    user: req.user._id
  })

  res.status(201).json({
    message: "Post created successfully",
    // post
  })

}

async function deletePost(req, res) {
  try {
    const postId = req.params.id;
    await postModel.findByIdAndDelete(postId);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createPost,
  deletePost
};