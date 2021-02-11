const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Importing routes
const authRoute = require('./routes/auth');

//dotenv.config();

//connect to DB
mongoose.connect(
    'mongodb+srv://shubham:gharat123@cluster0.dgvqs.mongodb.net/assap?retryWrites=true&w=majority',

() => console.log('connected to db')
);

// mongoose.connect('mongodb+srv://shubham:gharat123@cluster0.dgvqs.mongodb.net/assap?retryWrites=true&w=majority',
// { useNewUrlParser: true,useUnifiedTopology: true  },()=>{
//     console.log('Connected to DB')
// })



//neww
// mongoose.connect("mongodb+srv://shubham:gharat123@cluster0.dgvqs.mongodb.net/<dbName>?retryWrites=true&w=majority",{
//     dbName: "assap",
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//     })
//     .then((result)=>{
//     console.log("Connected to Mongo")
//     })  
//     .catch((error)=>{
//     console.log(error);
// })

//middleware
app.use(express.json());


//Route middlewares
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server up and running'));
