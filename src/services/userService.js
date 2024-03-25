import db from '../models/index';
import bcrypt, { hash } from 'bcryptjs';

var salt = bcrypt.genSaltSync(10);

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

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let emailExist = await checkUserEmail(data.email);
            if (emailExist) {
                resolve({
                    errCode: 1,
                    errMessage: 'The email is exist!. Please try other email!'
                });
            } else {
                //TODO check have to full parameters => to create user
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId
                })

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: idInput }
            })

            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: 'Can not find any user with the id!'
                })
            }
            // Delete everyone with id === userId
            await db.User.destroy({
                where: {
                    id: idInput
                },
            });
            resolve({
                errCode: 0,
                errMessage: 'Delete the user successfully!'
            })
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter!'
                });
            }
            // check it found the record need update exist
            let userData = await db.User.findOne({
                where: { id: data.id }
            });
            if (userData) {
                await db.User.update(
                    // Values to update
                    {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address
                    },
                    { // Clause
                        where: { id: data.id }
                    }
                );

                resolve({
                    errCode: 0,
                    errMessage: 'Update user successfully!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                });
            }

        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData
}