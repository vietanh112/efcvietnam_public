const { Sequelize, Model, DataTypes } = require("sequelize");
const coreModels = require('../models/index');
const { Op } = require("sequelize");
const db =  require('../models');
const CertificateModel = require('../entities/certificate');

const productServices = {

    //admin

    createCertificate: async (body) => {
        let log = {
            status: 0,
            code: 204,
            msg: 'error',
            data: null
        };
        if(!body.cerCode) return
        try {
            var total = await coreModels.inforCompany.count({
                where: {
                    CERTIFICATE_CODE: body.cerCode
                }
            })

            if(total > 0){
                log.code = 201;
                log.msg = 'Certificate code created';
                return log
            }

            const data = await coreModels.inforCompany.create(
                {
                    INFORMATION_CODE: body.inforCode,
                    CERTIFICATE_CODE: body.cerCode,
                    LICENSE_CODE: body.licenseCode,
                    NAME: body.name,
                    ADDRESS: body.address,
                    WEBSITE: body.website,
                    STATUS: body.status,
                    FST_ISSUE_DATE: new Date(body.fstIssueDate),
                    LST_ISSUE_DATE: new Date(body.lstIssueDate),
                    EXPIRY_DATE: new Date(body.expiryDate),
                    STANDARD: body.standard,
                    SCOPE: body.scope,
                    QUANTITY: body.quantity,
                    HECTARES: body.hectares,
                    SHOW: body.show,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            )
            if(data != 0) {
                log.status = 1;
                log.code = 200;
                log.msg = 'success';
                log.data = {
                    CERTIFICATE_CODE: body.cerCode
                };
            }
            return log
        } catch (error) {
            console.log(error);
            return log
        }
    },

    getCertificate: async(queries) => {
        let log = {
            status: 0,
            code: 204,
            data: {
                certificate: [],
                total: 0
            }
        };
        let data = null;
        let array = [];
        try {
            if(!queries.keyword && !queries.status) {
                data = await coreModels.inforCompany.findAll({
                    order: [['createdAt', 'DESC']],
                    limit: 100
                });
            }
            else if(queries.keyword && queries.status) {
                data = await coreModels.inforCompany.findAll({
                    where: {
                        [Op.and]: [
                            {
                                [Op.or]: {
                                    CERTIFICATE_CODE: {
                                        [Op.like]: `%${queries.keyword}%`
                                    },
                                    NAME: {
                                        [Op.like]: `%${queries.keyword}%`
                                    }
                                }
                            },
                            {
                                status: queries.status
                            }
                        ]
                    },
                    order: [['createdAt', 'DESC']],
                    limit: 100
                });
            }
            else if(queries.keyword && !queries.status) {
                data = await coreModels.inforCompany.findAll({
                    where: {
                        [Op.or]: {
                            CERTIFICATE_CODE: {
                                [Op.like]: `%${queries.keyword}%`
                            },
                            NAME: {
                                [Op.like]: `%${queries.keyword}%`
                            }
                        }
                    },
                    order: [['createdAt', 'DESC']],
                    limit: 100
                });
            }
            else if(!queries.keyword && queries.status) {
                data = await coreModels.inforCompany.findAll({
                    where: {
                        status: queries.status
                    },
                    order: [['createdAt', 'DESC']],
                    limit: 100
                });
            }

            log.status = 1;
            log.code = 200;
            array = data;
            for (let i = 0; i < array.length; i++) {
                log.data.certificate.push(new CertificateModel(array[i].dataValues))
            }
            if(data) {
                log.data.total = data.length;
            }
            return log;
        } catch (error) {
            console.log(error);
            return log;
        }
    },

    deleteCertificate: async(cerId) => {
        let log = {
            status: 0,
            code: 204,
            msg: 'error'
        };
        if(!cerId) return log
        try {
            var total = await coreModels.inforCompany.count({
                where: {
                    ID: cerId
                }
            })

            if(total == 0){
                
                log.code = 201;
                log.msg = 'Certificate code not exits';
                return log
            }
            
            const data = await coreModels.inforCompany.destroy({
                where: {
                    ID: cerId
                }
            })
            if(data) {
                log.status = 1;
                log.code = 200;
                log.msg = 'success';
            }
            return log
        } catch (error) {
            return log;
        }
    },

    updateCertificate: async (body, certificateId) => {
        let log = {
            status: 0,
            code: 204,
            msg: 'error',
            data: null
        };
        try {
            var total = await coreModels.inforCompany.count({
                where: {
                    ID: certificateId
                }
            })

            if(total == 0){
                log.code = 201;
                log.msg = 'Certificate code not exist';
                return log
            }

            const data = await coreModels.inforCompany.update(
                {
                    INFORMATION_CODE: body.inforCode,
                    CERTIFICATE_CODE: body.cerCode,
                    LICENSE_CODE: body.licenseCode,
                    NAME: body.name,
                    ADDRESS: body.address,
                    WEBSITE: body.website,
                    STATUS: Number(body.status),
                    FST_ISSUE_DATE: new Date(body.fstIssueDate),
                    LST_ISSUE_DATE: new Date(body.lstIssueDate),
                    EXPIRY_DATE: new Date(body.expiryDate),
                    STANDARD: body.standard,
                    SCOPE: body.scope,
                    QUANTITY: body.quantity,
                    HECTARES: body.hectares,
                    SHOW: Number(body.show),
                    updatedAt: new Date()
                },
                {
                    where: {ID: `${certificateId}`}
                }
            )
            if(data != 0) {
                log.status = 1;
                log.code = 200;
                log.msg = 'success';
                log.data = {
                    CERTIFICATE_CODE: body.cerCode
                };
            }
            return log
        } catch (error) {
            console.log(error);
            return log
        }
    },

    //public 

    getCertificateCode: async (certificateCode) => {
        let log = {
            status: 0,
            code: 204,
            msg: 'error',
            data: null
        };
        if(!certificateCode) return
        try {
            let total = await coreModels.inforCompany.count({
                where: {
                    CERTIFICATE_CODE: certificateCode
                }
            })
            if(total == 0){
                log.code = 201;
                log.msg = 'Certificate code not exits';
                return log
            }
            

            data = await coreModels.inforCompany.findAll({
                where: {
                    [Op.and]: {
                        CERTIFICATE_CODE: certificateCode,
                        SHOW: 1
                    }
                }
            })
            if(data.length > 0) {
                log.status = 1;
                log.code = 200;
                log.msg = 'success';
                log.data = new CertificateModel(data[0].dataValues);
                log.data.id = null;
                log.data.createdAt = null;
                log.data.updatedAt = null;
            }

            return log
        } catch (error) {
            console.log(error);
            return log
        }
    },
}

module.exports = productServices
