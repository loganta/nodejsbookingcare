import express from "express";
import homeController from '../controller/homeController';

//use Router service of express framework js
let router = express.Router();

const initWebRoute = (app) => {

    //response the action show homepage
    router.get('/', homeController.getHomepage);

    //response the action show about page
    router.get('/about', homeController.getAboutPage);

    //response the action show crub page
    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD);

    //return current "router" controller url choosed by client action
    return app.use('/', router);
}

//export to use router config
export default initWebRoute;