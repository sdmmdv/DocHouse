const express = require('express');

const cors  = require('cors');

const mongoose = require('mongoose');

const Pusher = require("pusher");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;



// Pusher for realtime synchronization (socket)
const pusher = new Pusher({
  appId: "1103333",
  key: "efd0c2d67fea5dc4f0fd",
  secret: "2528fe26633c1e59ed59",
  cluster: "eu",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
     next();
});


const DB_URI = process.env.NODE_ENV === 'test' ? process.env.DB_TEST_URI : process.env.DB_URI;

if (process.env.NODE_ENV){
    console.log('Server mode: ', process.env.NODE_ENV);
}

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', () => {
    console.log('Success! Connected to MongoDB!');
    changeStream = db.collection("rooms").watch();
    changeStream.on("change", (change) => {
        // console.log(change);
        if(change.operationType == "update"){
            let messageDetails = Object.values(change.updateDescription.updatedFields)[0];
            if(change.updateDescription.updatedFields.messages)
                messageDetails = change.updateDescription.updatedFields.messages[0];
            
            pusher.trigger("rooms", "updated" , {
                author: messageDetails.author,
                author_id: messageDetails.author_id,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                room_id: messageDetails.room_id
            });
        }
    });
});

const generalRouter = require('./routes/generalRoute');
const usersRouter = require('./routes/userRoute');
const doctorsRouter = require('./routes/doctorRoute');
const requestsRouter = require('./routes/requestRoute');
const chatRouter = require('./routes/chatRoute');
const paymentRouter = require('./routes/paymentRoute');

app.use('/general', generalRouter);
app.use('/users',usersRouter);
app.use('/doctors', doctorsRouter);
app.use('/requests', requestsRouter);
app.use('/chat', chatRouter);
app.use('/payment', paymentRouter);


app.listen(port,() => {
    console.log('Server listening on port:', port);
})
