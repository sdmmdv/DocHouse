const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = new express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  }catch{
    return res.status(500).json({ err });
  }
});

// Sign up a user
router.post('/signup', async (req, res) => {

  try {
    const user = await User.find({ email: req.body.email });
    if (user.length > 0) {
      return res.status(400).json({ errors: 'This e-mail already exists!' });
    }

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: hashedPass
      });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({err});
  }
});



// Log in a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email: email});
    if (!user) {
      return res.status(400).json({ errors: 'Could not find this e-mail!',error_type: 'email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json(
        {errors: "Invalid credentials!", error_type: 'password'}
      );
    }

    //Assign token for 2 hours session
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        userId: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
        expiresIn: '2h'
    });
  }catch (err) {
    return res.status(500).json(err);
  }
});




// Get a user by their id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

// Update a user's information
router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          avatarColor: req.body.avatarColor,
          bio: req.body.bio || '',
          email: req.body.email,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          showEmail: req.body.showEmail
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err) => {
        if (err != null && err.name === 'MongoError' && err.code === 11000) {
          return res
            .status(500)
            .send({ message: 'This email is already in use.' });
        }
      }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const token = jwt.sign(
      {
        avatarColor: user.avatarColor,
        bio: user.bio,
        createdAt: user.createdAt,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        showEmail: user.showEmail,
        userId: user._id
      },
      process.env.REACT_APP_JWT_KEY || require('../secrets').jwtKey,
      {
        expiresIn: '24h'
      }
    );

    return res.json({ user, token });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user
router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;