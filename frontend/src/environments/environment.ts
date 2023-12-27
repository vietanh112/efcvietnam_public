// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiServer: {
      ssl: false,
      host: 'localhost:4001',
      prefix: '',
      paths: {
        auth: {
          login:'auth/login',
          logout: 'auth/logout',
          register: 'auth/register',
          forgotPassword: '',
          changePassword: 'auth/change-password',
          infor: 'auth/{USER_ID}/infor'
        },
        qrCode: {
          createCerCode: 'dashboard/qrCode/create-cer-code',
          getCerCode: 'dashboard/qrCode/get-cer-code/{CERTIFICATE_CODE}',
          createCertificate: 'admin/certificate/create-certificate',
          deleteCertificate: 'admin/certificate/delete-certificate/{CERTIFICATE_ID}',
          getCertificate: 'admin/certificate/get-certificate',
          getAllCertificate: 'admin/certificate/get-all-certificate',
          updateCertificate: 'admin/certificate/update-certificate/{CERTIFICATE_ID}',
          resetPasswordQrcode: 'admin/certificate/reset-password-qrcode/{CERTIFICATE_ID}'
        },
        public: {
          getCertificateCode: 'public/certificate/{CERTIFICATE_CODE}',
          searchCertificateCode: 'public/certificate/{CERTIFICATE_CODE}/{PASSWORD_QRCODE}'
        }
      }
  },
  frontEnd: {
    ssl: false,
    host: 'localhost:4200',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
