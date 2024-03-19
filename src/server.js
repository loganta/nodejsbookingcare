import express from 'express';
import bodyParser from "body-parser";
import configViewEngine from './config/viewEngine';
import initWebRouter from './router/web';
import connectDB from './config/connectDB';
require('dotenv').config();


const app = express();
const port = process.env.PORT || 6868;

//step 1: support send data/ post data/ tranfer data better
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//step 2: setup config views
configViewEngine(app);

//step 3: setup router
initWebRouter(app);

//step 4: setup database connection
connectDB();

//check listening on port
app.listen(port, () => {
    console.log(`Verify app listening on port ${port}`)
})