const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = new express.Router();


router.get("/current-user", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    bio: user.bio,
    address: user.address,
    web: user.web
  });
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
    const token = jwt.sign({ id: user._id,email: user.email}, process.env.JWT_SECRET);
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

// Update User Information
router.patch('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    await User.findOneAndUpdate({ _id: id},
      {
        $set: {
          bio: req.body.bio,
          address: req.body.address,
          web: req.body.web,
        }
      },
      {useFindAndModify: false}
    );
    return res.status(200).json({message: "Successfully changed!"});
  } catch (err) {
    return res.status(500).json({ message: err });
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