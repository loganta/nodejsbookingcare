import express from 'express';
import bodyParser from "body-parser";
import configViewEngine from './config/viewEngine';
import initWebRouter from './router/web';
require('dotenv').config();


const app = express();
const port = process.env.PORT || 6868;

//support send data/ post data/ tranfer data better
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setup config views
configViewEngine(app);

//setup router
initWebRouter(app);

//check listening on port
app.listen(port, () => {
    console.log(`Verify app listening on port ${port}`)
})