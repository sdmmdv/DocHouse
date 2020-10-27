const express = require('express');

const cors  = require('cors');

const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
     next();
});


mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Success! Connected to MongoDB!')
});

const generalRouter = require('./routes/generalRoute');
const usersRouter = require('./routes/userRoute');
const doctorsRouter = require('./routes/doctorRoute');
const requestsRouter = require('./routes/requestRoute');

app.use('/general', generalRouter);
app.use('/users',usersRouter);
app.use('/doctors', doctorsRouter);
app.use('/requests', requestsRouter);



app.listen(port,() => {
    console.log('Server listening on port:', port);
})
