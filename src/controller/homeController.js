import pool from '../config/connectDB';

/**
* Return Homepage 
*/
let getHomepage = async (req, res) => {

    return res.render('index.ejs');
}

//Tranfer functions and can call other posittion
module.exports = {
    getHomepage
}