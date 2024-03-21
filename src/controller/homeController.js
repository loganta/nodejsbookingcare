import db from '../models/index';
import CRUDService from '../services/CRUDService';

/**
* Return Homepage 
*/
let getHomepage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });

    } catch (e) {
        console.log('logging from getHomepage function:', e);
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);

    res.send('post crud from sever');
}

//Tranfer functions and can call other posittion
module.exports = {
    getHomepage,
    getAboutPage,
    getCRUD,
    postCRUD
}