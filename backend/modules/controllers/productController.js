const productServices = require('./../services/productServices')

module.exports = {
    
    //admin
    createCertificate: async (req, res) => {
        const body = await req.body.body;
        const data = await productServices.createCertificate(body);
        let response = {
            status: 1,
            code: 200,
            message: 'success',
            data: null
        }
        response.code = data.code;
        response.message = data.msg;
        response.data = data.data;
        if (data.code != 200 ) {
            response.data = null;
            response.status = 0;
        }
        return res.json(response)
    },

    getCertificate: async (req, res) => {
        let queries = {};
        for (const [key, value] of Object.entries(req.query)) {
            if(key == 'keyword' || key == 'status') {
                queries[key] = value;
            }
        }
        const data = await productServices.getCertificate(queries);
        let response = {
            status: 1,
            code: 200,
            message: 'success',
            data: null
        }
        response.code = data.code;
        response.data = data.data;
        if (data.code != 200 ) {
            response.status = 0;
            response.message = 'error';
        }
        return res.json(response)
    },

    deleteCertificate: async (req, res) => {
        const cerId = req.params.certificateId;
        const data = await productServices.deleteCertificate(cerId);
        let response = {
            status: 1,
            code: 200,
            message: '',
            data: 'Deleted'
        }
        response.code = data.code;
        response.message = data.msg;
        if (data.code == 400) {
            response.data = null;
        }
        return res.json(response)
    },

    updateCertificate: async (req, res) => {
        const certificateId = req.params.certificateId;
        const body = await req.body.body;
        const data = await productServices.updateCertificate(body, certificateId);
        let response = {
            status: 1,
            code: 200,
            message: 'success',
            data: null
        }
        response.code = data.code;
        response.message = data.msg;
        response.data = data.data;
        if (data.code != 200) {
            response.message = 'error';
            response.data = null;
        }
        return res.json(response)
    },

    //public

    getCertificateCode: async (req, res) => {
        const certificateCode = req.params.certificateCode;
        // const passwordQrcode =  req.params.passwordQrcode;
        const data = await productServices.getCertificateCode(certificateCode);
        let response = {
            status: 1,
            code: 200,
            message: 'Created',
            data: null
        }
        response.code = data.code;
        response.message = data.msg;
        response.data = data.data;
        response.status = data.status;
        if (data.code == 400 ) {
            response.data = null;
        }
        return res.json(response)
    },

    resetPasswordQrcode: async (req, res) => {
        const cerId = req.params.certificateId;
        const data = await productServices.resetPasswordQrcode(cerId);
        let response = {
            status: 1,
            code: 200,
            message: '',
            data: 'Deleted'
        }
        response.code = data.code;
        response.message = data.msg;
        response.data = data.data;
        if (data.code == 400) {
            response.data = null;
        }
        return res.json(response)
    },
}
