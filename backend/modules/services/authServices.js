const { Sequelize, Model, DataTypes } = require("sequelize");
const coreModels = require('../models/index');
const { Op } = require("sequelize");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const configs = require('../../configs/configs')

const authServices = {
    register: async (body) => {
        let log = {
            code: 204,
            status: 0,
            msg: 'error',
            data: ''
        };
        let data;
        let dataUpdate;
        const total = await coreModels.users.count({
            where: {
                username: body.username
            }
        })
        if(total > 0) {
            log.code = 201;
            log.msg = 'Username created';
            return log
        }
        let encryptedPassword = await bcrypt.hash(body.password, 10);
        try {
            data = await coreModels.users.create({
                username: body.username,
                password: encryptedPassword,
                email: body.email,
                roleId: Number(body.role),
                allow: 1,
                status: 1,
                token: ''
            })
        } catch (error) {
            console.log(error);
            return log;
        }
        let email = body.email;
        try {
            const token = jwt.sign(
                { userId: data.dataValues.id, email, roleId: data.dataValues.roleId },
                configs.jwt.secret,
                {
                  expiresIn: configs.jwt.ttl,
                }
            );
            dataUpdate = await coreModels.users.update({
                token: token,
                updatedAt: new Date()
            },{
                where: {id: data.dataValues.id}
            })
        } catch (error) {
            console.log(error);
            return log;
        }
        if(data && dataUpdate) {
            log.code = 200;
            log.msg = 'success';
            log.data = body.username;
        }
        log.status = 1;
        return log
    },
    login: async (body) => {
        var tokenUpdate;
        let token;
        let log = {
            code: 204,
            status: 0,
            data: null,
            msg: 'Login error'
        }
        const total = await coreModels.users.count({
            where: {
                username: body.username
            }
        })
        if(total != 1) {
            log.code = 201;
            log.msg = 'User not exits';
            return log;
        }
        const user = await coreModels.users.findAll({
            where: {
                username: body.username
            }
        })
        console.log(user);

        if(user.length > 0){
            if (user && (await bcrypt.compare(body.password, user[0].dataValues.password))) {
                try {
                    let email = body.email;
                    token = jwt.sign(
                        { userId: user[0].dataValues.id, email, roleId: user[0].dataValues.roleId },
                        configs.jwt.secret,
                        {
                          expiresIn: configs.jwt.ttl,
                        }
                    );
                    tokenUpdate = await coreModels.users.update({
                        token: token,
                        updatedAt: new Date()
                    },{
                        where: {id: user[0].dataValues.id}
                    })
                    user[0].dataValues.token = token;
                    log.data = user[0].dataValues;
                    log.status = 1;
                    log.code = 200;
                    log.msg = 'Login success';
                }
                catch(error) {
                    console.log(error);
                    return log;
                }
            }
            else {
                log.code = 202;
                log.msg = 'Username or password failed';
            }
        }
        return log;
    },
    changePassword: async (body) => {
        let log = {
            code: 204,
            status: 0,
            data: null,
            msg: 'error'
        }
        const user = await coreModels.users.findAll({
            where: {
                id: body.id
            }
        })
        try {
            if(!user) {
                log.code = 201;
                log.msg = 'User not exits';
                return log;
            }
            if(!await bcrypt.compare(body.oldPassword, user[0].dataValues.password)) {
                log.code = 202;
                log.msg = 'Old password not match';
                return log;
            }

            let encryptedPassword = await bcrypt.hash(body.newPassword, 10);
            passwordUpdate = await coreModels.users.update({
                password: encryptedPassword,
                updatedAt: new Date()
            },{
                where: {id: body.id}
            })

            log.code = 200;
            log.status = 1;
            log.msg = 'Change password success';
            return log;

        } catch (error) {
            console.log(error);
            return log;
        }
    },
    infor: async (userId) => {
        let checkReturn = {
            code: 400,
            status: 0,
            data: {}
        }
        if(userId) {
            const user = await coreModels.users.findAll({
                where: {
                    id: userId
                }
            })
            if(user == [] || user == '' || user == null || user == undefined) {
                checkReturn.code = 200;
                return checkReturn;
            }
            checkReturn.code = 200;
            checkReturn.status = 1;
            if(user[0]?.dataValues) {
                checkReturn.data['id'] = user[0].dataValues['id'];
                checkReturn.data['email'] = user[0].dataValues['email'];
                checkReturn.data['username'] = user[0].dataValues['username'];
                checkReturn.data['roleId'] = user[0].dataValues['roleId'];
                checkReturn.data['status'] = user[0].dataValues['status'];
                checkReturn.data['createdAt'] = user[0].dataValues['createdAt'];
                checkReturn.data['updatedAt'] = user[0].dataValues['updatedAt'];
            }
            
            return checkReturn;
        }
        return checkReturn
    }
}



module.exports = authServices