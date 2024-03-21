import bcrypt from 'bcryptjs';
import db from '../models/index';

var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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

            resolve('Create new user successfully!');
        } catch (e) {
            reject(e);
        }
    });
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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true
            });
            resolve(users);
        } catch (e) {
            reject(e)
        }
    });
}

let getUserInfoById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userInfo = await db.User.findOne({
                where: { id: userId },
                raw: true
            });
            if (userInfo) {
                resolve(userInfo);
            } else {
                resolve({});
            }

        } catch (e) {
            reject(e);
        }
    });
}

let updateUserData = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check it found the record need update exist
            let userData = await db.User.findOne({
                where: { id: data.id },
                raw: true
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

                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }

        } catch (e) {
            console.log(e);
        }
    });
}

let deleteCRUDById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check it found the record need update exist
            let userInfo = await db.User.findOne({
                where: { id: userId },
                raw: true
            });
            if (userInfo) {
                // Delete everyone with id === userId
                await db.User.destroy({
                    where: {
                        id: userId
                    },
                });
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteCRUDById: deleteCRUDById
}