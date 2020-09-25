const router = require('express').Router();
let Doctor = require('../models/Doctor');

router.route('/').get((req, res) => {
  Doctor.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
        //creating a new doctor
        const newDoctor = new Doctor({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        })

  newDoctor.save()
    .then(() => res.json('Doctor added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;