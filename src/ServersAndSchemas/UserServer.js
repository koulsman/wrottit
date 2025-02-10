const mongoose = require('mongoose');
const express = require("express");
const User = require("./UserModel"); // Import the User model
const cors = require('cors'); // CORS middleware
const bodyParser = require('body-parser'); // Body parser middleware

const app = express();
const port = 3001; // Update port to avoid conflict with frontend

// MongoDB URI with specified database name (users_db)
const uri = 'mongodb+srv://stevekoulas:asfalisa1@wrotit.mxylu.mongodb.net/users_db?retryWrites=true&w=majority&appName=wrotit&ssl=true';

// Use CORS to allow requests from frontend
app.use(cors());

// Use body parser to parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB and start server
mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB Connected to users_db!');
    app.listen(port, () => {
      console.log(`Node server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
  });

app.post('/users', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password // Fix: Access password from req.body
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser); // Send created user as a response
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

app.get('/users/:id', getUser, (req, res) => {
  res.json(res.user);
});
app.get('/users/:name', getUser, (req, res) => {
  res.json(res.user);
});
app.get('/users/:email', getUser, (req, res) => {
  res.json(res.user);
});
app.get('/users/:password', getUser, (req, res) => {
  res.json(res.user);
});
app.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Αναζητούμε τον χρήστη με βάση το email
    const user = await User.findOne({ email: email });

    // Έλεγχος αν ο χρήστης υπάρχει και το password ταιριάζει
    if (user && user.password === password) {
      res.status(200).json(user); // Επιστρέφουμε τα δεδομένα του χρήστη
    } else {
      res.status(401).json({ message: 'Invalid email or password' }); // Σφάλμα αν το email ή το password είναι λάθος
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/users/liked',async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password // Fix: Access password from req.body
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser); // Send created user as a response
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})
module.exports = app;
