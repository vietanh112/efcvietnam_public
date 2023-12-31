// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiServer: {
      ssl: true,
      host: 'verifys-api.efcvietnam.net',
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
          updateCertificate: 'admin/certificate/update-certificate/{CERTIFICATE_ID}',
        },
        public: {
          getCertificateCode: 'public/certificate/{CERTIFICATE_CODE}'
        }
      }
  },
  frontEnd: {
    ssl: true,
    host: 'verifys.efcvietnam.net',
    port: ''
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
