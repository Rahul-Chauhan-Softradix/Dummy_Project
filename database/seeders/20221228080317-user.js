'use strict';

 module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
     queryInterface.bulkInsert('users', [{
      uuid: '7cedacea-87fa-4212-b3f0-bd3b5c7c21d8', 'role_id':1, first_name: 'Rahul', 'email':'rahul@gmail.com','phone_number':'9090908885','password':'$2b$10$YHHTS.HW58MA1GNTTiipPuD5vzu5rw/5s.zsWi/OBC1hr4cohQesq', 'createdAt':new Date(),'updatedAt':new Date()
      }], {truncate: true }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
 
      return queryInterface.bulkDelete('users', null, {});
  }
};
