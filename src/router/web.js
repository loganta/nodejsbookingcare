import express from "express";
import homeController from '../controller/homeController';
import userController from '../controller/userController';

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
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    //restful api
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    //return current "router" controller url choosed by client action
    return app.use('/', router);
}

//export to use router config
export default initWebRoute;