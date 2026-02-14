require("dotenv").config();
const express=require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const app= express();
const cookieParser = require('cookie-parser');
const port=process.env.PORT || 5000

const dbConfig=require('./config/dbConfig');
const userRoutes = require("./modules/user/routes/user.routes");


// CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ⬅️ bodyParser is deprecated, use express built-in
app.use(cookieParser());



//Routes
app.use("/api/users", userRoutes);




  



app.listen(port,()=>{
    console.log("server is listening on port ",port);
});