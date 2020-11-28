const router = require('express').Router();
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const ObjectId = require('mongodb').ObjectID;


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
        speciality: req.body.speciality,
        address: req.body.address,
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
    const token = jwt.sign({ id: doctor._id,email: doctor.email}, process.env.JWT_SECRET);
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


// Get logged in doctor
router.get("/current-doctor", auth, async (req, res) => {
  const doctor = await Doctor.findById(req.user);
  res.json({
    id: doctor._id,
    first_name: doctor.first_name,
    last_name: doctor.last_name,
    phone_number: doctor.phone_number,
    address: doctor.address,
    email: doctor.email,
    speciality: doctor.speciality,
    bio: doctor.bio,
    web: doctor.web,
    appointment_fee: doctor.appointment_fee
  });
});

// Get a doctor by ID
router.get('/:id',auth, async (req, res) => {
  const {id} = req.params;
  try {
    const doctor = await Doctor.findById(id);
    if (doctor) {
      res.status(200).json(doctor);
    } else {
      res.status(404).json({ message: 'Doctor has been not found!' });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

// Update User Information
router.patch('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    await Doctor.findOneAndUpdate({ _id: id},
      {
        $set: {
          speciality: req.body.speciality,
          bio: req.body.bio,
          address: req.body.address,
          phone_number: req.body.phone_number,
          web: req.body.web,
          appointment_fee: req.body.appointment_fee
        }
      },
      {useFindAndModify: false }
    );
    return res.status(200).json({message: "Successfully changed!"});
  } catch (err) {
    return res.status(500).json({message: err});
  }
});


// Get all the doctors
// based on received query
router.get('/', auth, async (req, res) => {
  //receive query from get request
  try{
  const doctors = await Doctor.find({
                                      $and: [
                                              {},
                                              {
                                                $and: [{
                                                    $or: [
                                                    {first_name: {$regex: req.query.condition_docname,$options: "$i"}},
                                                    {last_name: {$regex: req.query.condition_docname,$options: "$i"}},
                                                    {speciality: {$regex: req.query.condition_docname,$options: "$i"}},
                                                    {bio: {$regex: req.query.condition_docname,$options: "$i"}}
                                                    ]},
                                                    {address: {$regex: req.query.city_region,$options: "$i"}}
                                                  ]
                                              }
                                            ]
                                   })
  res.status(200).json(doctors);}
  catch (err) {
    res.status(500).json({ err });
  }
});


// Delete a doctor
router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.doctor);
    res.json(deletedDoctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;