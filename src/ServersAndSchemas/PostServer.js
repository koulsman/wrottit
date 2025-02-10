const mongoose = require('mongoose');
const express = require("express");
const Post = require("./PostModel"); // Assuming Post model is defined properly
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const app = express();
const port = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = 'mongodb+srv://stevekoulas:asfalisa1@wrotit.mxylu.mongodb.net/users_db?retryWrites=true&w=majority&appName=wrotit&ssl=true';

app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB Connected!');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
  });

// Handling post creation
app.post("/posts", upload.array("images"), async (req, res) => {
  const { title, community, uid, uname, date, content, upvotes } = req.body;
  const images = req.files; // Retrieve images

  try {
    const post = new Post({
      title,
      community,
      uid,
      uname,
      date,
      content,
      upvotes,
      comments: [], // Ensure comments is always initialized as an array
      images: images.map(image => image.path), // Save image paths in the database
    });

    const newPost = await post.save();
    res.status(201).json({ message: "Post created successfully!", data: newPost });
  } catch (err) {
    console.error("Error saving post:", err.message);
    res.status(400).json({ message: err.message });
  }
});


app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.post('/posts/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { uid, uname, comment } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { $push: { comments: { uid, uname, comment } } }, // Push the new comment into the array
      { new: true } // Return the updated document
    );
    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }
    res.status(200).send(post); // Send updated post
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
  console.log(uid,uname,comment)
});
// Upvote a post
app.post('/:id/upvotes', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }
    res.status(200).send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Get posts by UID
app.get('/posts/postsby/:uid', async (req, res) => {
  const { uid } = req.params;
  try {
    const posts = await Post.find({ uid });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = app;
