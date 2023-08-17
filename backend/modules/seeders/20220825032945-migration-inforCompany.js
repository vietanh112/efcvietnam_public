'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('inforCompany', [
        {
            ID: 1,
            INFORMATION_CODE: '109',
            CERTIFICATE_CODE: '5202230109',
            LICENSE_CODE: '0317401829; 0317401829-001',
            NAME: 'CÔNG TY TNHH NAMY TN/NAMY TN COMPANY LIMITED',
            ADDRESS: '1041/62/186 Trần Xuân Soạn, Phường Tân Hưng, Quận 7, Thành phố Hồ Chí Minh, Việt Nam Tổ 1, Khu Phố Hòa Thuận 2, Thị Trấn Cần Giuộc, Huyện Cần Giuộc, Tỉnh Long An, Việt Nam/1041/62/186 Tran Xuan Soan, Tan Hung Ward, District 7, Ho Chi Minh City, Vietnam Group 1, Hoa Thuan 2 Quarter, Can Giuoc Town, Can Giuoc District, Long An Province, Vietnam',
            WEBSITE: 'namy.com.vn',
            STATUS: 0,
            FST_ISSUE_DATE: new Date("11/14/2022"), //Month - day - year
            LST_ISSUE_DATE: new Date("11/14/2022"),
            EXPIRY_DATE: new Date("11/14/2025"),
            STANDARD: 'HACCP Codex 2020',
            SCOPE: `Sản xuất và kinh doanh sản phẩm từ yến sào/Producing and trading products from salanganes'nest`,
            QUANTITY: 'N/A',
            HECTARES: 'N/A',
            SHOW: 0,
            HECTARES: 'EFC3010912',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
          
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('inforCompany', null, {});
  }
};
