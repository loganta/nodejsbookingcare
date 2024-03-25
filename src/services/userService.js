import db from '../models/index';
import bcrypt, { hash } from 'bcryptjs';

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //check pass word is correctly
                let checkPassword = await compareUserPassword(email, password);
                if (checkPassword.errCode === 0) {
                    userData = checkPassword;
                } else {
                    userData.errCode = 3;
                    userData.message = 'Wrong password!';
                }
            } else {
                userData.errCode = 1;
                userData.message = 'Your email not exist. Please try other again!';
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let compareUserPassword = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let user = await db.User.findOne({
                where: { email: email },
                attributes: ['email', 'roleId', 'password'],
                raw: true
            })
            if (user) {
                //compare password
                let check = await bcrypt.compareSync(password, user.password);
                if (check) {
                    userData.errCode = 0;
                    userData.message = 'OK';

                    delete user.password;
                    userData.user = user;
                } else {
                    userData.errCode = 3;
                    userData.message = 'Wrong password!';
                }
            } else {
                userData.errCode = 2;
                userData.message = 'User not found. Please try other one again!';
            }

            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email }
            })
            if (user) {
                resolve(user);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    },
                })
            }

            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers
}