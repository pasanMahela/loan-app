const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv');
const loanApplicationsRouter = require('./routes/loanApplications');
const fileUpload = require('express-fileupload');
const bankRoutes = require('./routes/bankRoutes');
const path = require('path'); // Import the path module
const bodyParser = require("body-parser");
const twilio = require('twilio'); //send sms-pasan


const fileuplaod = require("express-fileupload");
dotenv.config();


const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/attachFile"));
// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//Pasan image upload
app.use(fileUpload()); // Add express-fileupload middleware

app.use(express.static(__dirname + "/attachFile"));

// connect to mongoDB
//mongoose.connect("mongodb://localhost/mern-stack-db");
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// define routes and middleware

// Twilio credentials
const accountSid = 'AC08b9c2b00fb1b869e78bb9c024f0e4ad';
const authToken = 'b7354a62f6acb88cffa877a1c4b6b6b5';
const client = twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
  const { to, body } = req.body;

  client.messages
    .create({
      body: body,
      from: '+19292388493', // Your Twilio number
      to: to, // Customer's phone number
    })
    .then((message) => {
      res.status(200).send({ message: `SMS sent with SID: ${message.sid}` });
    })
    .catch((error) => {
      console.error('Error sending SMS:', error);
      res.status(500).send({ error: 'Failed to send SMS' });
    });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`); 
});

// const todoSchema = new mongoose.Schema({
//   task: String,
//   completed: Boolean,
// });

// app.use(cors());

console.log("hi");
console.log("hi");


app.use('/loan-applications', loanApplicationsRouter);
app.use('/banks', bankRoutes);

// Define the sendEmail route
//router.post('/studentapp/sendEmail/:id', sendEmail);
