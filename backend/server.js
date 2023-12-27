require('dotenv').config();
const express = require('express');

express.application.prefix = express.Router.prefix = function (path, configure) {
    const router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
};

const cors = require("cors");
const app = express();
const path = require('path')
const fs = require('fs')

const ip = process.env.IP || 'localhost'
const port = process.env.PORT || 3000
const prefixPath = process.env.PREFIX_PATH || '/';

//
const productController = require('./modules/controllers/productController');
const authController = require('./modules/controllers/authController');

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


//joining path of directory
const directoryModulesPath = path.join(__dirname, 'modules')
// routes grouping
app.prefix(`${prefixPath}`, function (appGroup) {
    fs.readdir(directoryModulesPath, function (err, modules) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err)
        }
        //listing all files using forEach
        const moduleRoutes = require(`./modules/routes/routes.js`);
        moduleRoutes(appGroup);
    });
})

//auth
app.route(`/auth/login`).post([], async(req, res) => {
    return authController.login(req, res);
})
app.route(`/auth/register`).post([], async(req, res) => {
    return authController.register(req, res);
})
app.route(`/auth/logout`).get([], async(req, res) => {
    return authController.logout(req, res);
})
app.route(`/auth/change-password`).post([], async(req, res) => {
    return authController.changePassword(req, res);
})
app.route(`/auth/:userId/infor`).get([], async(req, res) => {
    return authController.infor(req, res);
})

//admin

app.route(`/admin/certificate/create-certificate`).post([], async(req, res) => {
    return productController.createCertificate(req, res);
})
app.route(`/admin/certificate/get-certificate`).get([], async(req, res) => {
    return productController.getCertificate(req, res);
})
app.route(`/admin/certificate/get-all-certificate`).get([], async(req, res) => {
    return productController.getAllCertificate(req, res);
})
app.route(`/admin/certificate/delete-certificate/:certificateId`).delete([], async(req, res) => {
    return productController.deleteCertificate(req, res);
})
app.route(`/admin/certificate/update-certificate/:certificateId`).patch([], async(req, res) => {
    return productController.updateCertificate(req, res);
})

app.route(`/admin/certificate/reset-password-qrcode/:certificateId`).patch([], async(req, res) => {
    return productController.resetPasswordQrcode(req, res);
})
//public
app.route(`/public/certificate/:certificateCode`).get([], async(req, res) => {
    return productController.getCertificateCode(req, res);
})
app.route(`/public/certificate/:certificateCode/:passwordQrcode`).get([], async(req, res) => {
    return productController.searchCertificateCode(req, res);
})
