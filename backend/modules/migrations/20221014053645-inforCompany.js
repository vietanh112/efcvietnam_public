'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('inforCompany', {
            ID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            INFORMATION_CODE: {
                type: Sequelize.STRING
            },
            CERTIFICATE_CODE: {
                type: Sequelize.STRING
            },
            LICENSE_CODE: {
                type: Sequelize.STRING
            },
            NAME: {
                type: Sequelize.STRING
            },
            ADDRESS: {
                type: Sequelize.TEXT('long')
            },
            WEBSITE: {
                type: Sequelize.STRING
            },
            STATUS: {
                type: Sequelize.INTEGER
            },
            FST_ISSUE_DATE: {
                type: Sequelize.DATEONLY
            },
            LST_ISSUE_DATE: {
                type: Sequelize.DATEONLY
            },
            EXPIRY_DATE: {
                type: Sequelize.DATEONLY
            },
            STANDARD: {
                type: Sequelize.STRING
            },
            SCOPE: {
                type: Sequelize.TEXT('long')
            },
            QUANTITY: {
                type: Sequelize.STRING
            },
            HECTARES: {
                type: Sequelize.STRING
            },
            SHOW: {
                type: Sequelize.INTEGER
            },
            PASSWORD_QRCODE: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }, {charset: 'utf8', collate: 'utf8_unicode_ci'});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('inforCompany');
    }
};
