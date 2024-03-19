import db from '../models/index';

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

let getAboutPage = () => {
    return res.render('test/about.ejs');
}

//Tranfer functions and can call other posittion
module.exports = {
    getHomepage, getAboutPage
}