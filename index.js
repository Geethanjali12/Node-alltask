const express = require("express");
const mongoose = require("mongoose");
const axios = require('axios');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());

const { getAllUsers, postUser, getUser, updateUser, deleteUser } = require('./controllers/UserController');

const {Validator} = require('./validate')
async function connectDB() {
    await mongoose.connect('mongodb://127.0.0.1:27017/node-crud', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}

// Axios

connectDB();

const getDistance = async (req, res) => {
    
    const s_lat = req.body.s_lat;
    const s_lng = req.body.s_lng;
    const d_lat = req.body.d_lat;
    const d_lng = req.body.d_lng;

    axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+s_lat+','+s_lng+'&destinations='+d_lat+','+d_lng+'&key=AIzaSyDop9-AriW2sANSeThYlqixD0yHR8UL4FY')
        .then((response) => {
            res.json({result:response.data});
        })
        .catch((error) => {
        })
};

// nodeMailer

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rubanshanthi24@gmail.com',
        pass: 'ebjkrrgpurvlaeua'
    }
});
  
let mailDetails = {
    from: 'rubanshanthi24@gmail.com',
    to: 'geethanjaliganesan9419@gmail.com',
    subject: 'Test mail',
    html: '<p>Node.js testing mail </p>'
};
  
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});


var router = express.Router();

//routes
app.get('/users', getAllUsers);
app.get('/user/:id', getUser);
app.post('/post', postUser);
app.put('/user/update', updateUser);
app.delete('/user/delete', deleteUser);
app.use('/', router);


app.listen(7777, () => {
    console.log('App running on port 7777');
})