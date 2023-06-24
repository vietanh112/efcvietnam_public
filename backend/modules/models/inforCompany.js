'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class inforCompany extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    };
    inforCompany.init({
        ID: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        INFORMATION_CODE: DataTypes.STRING,
        CERTIFICATE_CODE: DataTypes.STRING,
        LICENSE_CODE: DataTypes.STRING,
        NAME: DataTypes.STRING,
        ADDRESS: DataTypes.TEXT('long'),
        WEBSITE: DataTypes.STRING,
        STATUS: DataTypes.INTEGER,
        FST_ISSUE_DATE: DataTypes.DATEONLY,
        LST_ISSUE_DATE: DataTypes.DATEONLY,
        EXPIRY_DATE: DataTypes.DATEONLY,
        STANDARD: DataTypes.STRING,
        SCOPE: DataTypes.TEXT('long'),
        QUANTITY: DataTypes.STRING,
        HECTARES: DataTypes.STRING,
        SHOW: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        tableName: 'inforCompany',
        modelName: 'inforCompany',
    });
    return inforCompany;
};
