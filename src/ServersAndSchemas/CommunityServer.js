const mongoose = require('mongoose');
const express = require("express");
const Community = require("./CommunitySchema"); // Import the User model
const cors = require('cors'); // CORS middleware
const bodyParser = require('body-parser'); // Body parser middleware
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const app = express();
const port = 3003; // Update port to avoid conflict with frontend

const uri = 'mongodb+srv://stevekoulas:asfalisa1@wrotit.mxylu.mongodb.net/users_db?retryWrites=true&w=majority&appName=wrotit&ssl=true';

app.use(cors({
  origin: 'http://localhost:3000', // Διεύθυνση του frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Επιτρεπόμενες μέθοδοι
  credentials: true
}));

app.use(bodyParser.json());

mongoose.connect(uri)
.then (
    () => {
        app.listen(port,()  => {
            console.log(`Node server is running on port ${port}`);
        })
    } 
)
.catch((error) => {
    console.log(error)
})

app.post('/communities', async (req, res) => {
    const community = new Community({
      name: req.body.name,
      cid: req.body.cid,
      description: req.body.description,
      isPrivate: req.body.isPrivate,
      moderators: req.body.moderators,
      mainImage: req.body.mainImage,
      bannerImage: req.body.bannerImage, 
      members: req.body.members
    });
  
    try {
      const newCommunity = await community.save();
      res.status(201).json(newCommunity); // Send created user as a response
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });