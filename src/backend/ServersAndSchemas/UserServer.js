const mongoose = require('mongoose');
const express = require("express");
const User = require("./UserModel"); // Import the User model
const cors = require('cors'); // CORS middleware
const bodyParser = require('body-parser'); // Body parser middleware
const bcrypt = require("bcryptjs")
const app = express();
const port = 3001; // Update port to avoid conflict with frontend

// MongoDB URI with specified database name (users_db)
const uri = 'mongodb+srv://stevekoulas:asfalisa1@wrotit.mxylu.mongodb.net/users_db?retryWrites=true&w=majority&appName=wrotit&ssl=true';

// Use CORS to allow requests from frontend
const allowedOrigins = [
  'http://localhost:3000', // local frontend
  'https://wrottit-yovc.onrender.com' // deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

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
    password: req.body.password, // Fix: Access password from req.body,
    userImage: req.body.userImage
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser); // Send created user as a response
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/users/:uid/commented', async (req,res) => {
  const { uid } = req.params;
  const { id } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      uid,
      { $push: { commented: { id } } }, // Push the new comment into the array
      { new: true } // Return the updated document
    );
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    res.status(200).send(user); // Send updated post
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
})
app.post('/users/:uid/liked', async (req,res) => {
  const { uid } = req.params;
  const { id } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      uid,
      { $push: { liked: { id } } }, // Push the new comment into the array
      { new: true } // Return the updated document
    );
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    res.status(200).send(user); // Send updated post
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
})
app.post('/users/:uid/posts', async (req,res) => {
  const { uid } = req.params;
  const { id } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      uid,
      { $push: { posts: { id } } }, 
      { new: true } 
    );
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    res.status(200).send(user); // Send updated post
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
})
app.post('/users/:uid/joined', async (req,res) => {
  const { uid } = req.params;
  const { id } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      uid,
      { $push: { joined: { id } } }, // Push the new comment into the array
      { new: true } // Return the updated document
    );
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    res.status(200).send(user); // Send updated post
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
})
app.post('/users/:uid/saved', async (req,res) => {
  const { uid } = req.params;
  const { id } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      uid,
      { $addToSet: { saved: { id } } }, // Push the new comment into the array
      { new: true } // Return the updated document
    );
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    res.status(200).send(user); // Send updated post
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
})

app.delete('/users/:uid/saved/:postid', async (req, res) => {
  const { uid, postid } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      uid,
      { $pull: { saved: { id: postid } } },
      { new: true }
    );
    res.json(user.saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete saved post' });
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
})
app.get('/users/:id/joined', getUser, (req, res) => {
  res.json(res.user);
});
app.get('/users/:id/saved', getUser, (req, res) => {
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
app.get('/users/:userImage', getUser, (req, res) => {
  res.json(res.user);
});
app.get('/users/:uid/commented', async (req, res) => {
  try {
    const user = await User.findById(req.params.uid); // Find user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Error if not found
    }
    res.json(user.commented); // Return only the "commented" array from that user
  } catch (err) {
    res.status(500).json({ message: err.message }); // Error handling
  }
});
app.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If password matches, return user data (excluding password for security)
    res.status(200).json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// app.post('/users/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Αναζητούμε τον χρήστη με βάση το email
//     const user = await User.findOne({ email: email });

//     // Έλεγχος αν ο χρήστης υπάρχει και το password ταιριάζει
//     if (user && user.password === password) {
//       res.status(200).json(user); // Επιστρέφουμε τα δεδομένα του χρήστη
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' }); // Σφάλμα αν το email ή το password είναι λάθος
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
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
