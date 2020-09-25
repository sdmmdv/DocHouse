const express = require('express');

const cors  = require('cors');

const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Success! Connected to MongoDB!')
});

const usersRouter = require('./routes/users');
const doctorsRouter = require('./routes/doctors');

app.post('/',(req,res) =>{
    res.send('We are at home');
});

app.use('/users',usersRouter);
app.use('/doctors', doctorsRouter);


app.listen(port,() => {
    console.log('Server listening on port:', port);
})
