const router = require('express').Router();
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Doctor = require('../models/Doctor');


// Sign up a Doctor
router.post('/signup', async (req, res) => {

  try {
    const doctor = await Doctor.find({ email: req.body.email });
    if (doctor.length > 0) {
      return res.status(400).json({ errors: 'This e-mail already exists!' });
    }

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(req.body.password, salt);

      const newDoctor = new Doctor({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        email: req.body.email,
        password: hashedPass
      });

    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    res.status(500).json({err});
  }
});


// Log in a Doctor
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({email: email});
    if (!doctor) {
      return res.status(400).json({ errors: 'Could not find this e-mail!',error_type: 'email' });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json(
        {errors: "Invalid credentials!", error_type: 'password'}
      );
    }

    //Assign token for 2 hours session
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
    res.json({
      token,
      doctor: {
        doctorId: doctor._id,
        first_name: doctor.first_name,
        last_name: doctor.last_name,
        email: doctor.email,
      },
        expiresIn: '2h'
    });
  }catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;