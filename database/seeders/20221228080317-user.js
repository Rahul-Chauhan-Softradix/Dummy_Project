'use strict';

 module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
     queryInterface.bulkInsert('users', [{
        first_name: 'Rahul','role_id':1, 'email':'rahul@gmail.com','phone_number':'9090908885','password':'$2b$10$YHHTS.HW58MA1GNTTiipPuD5vzu5rw/5s.zsWi/OBC1hr4cohQesq', 'created_at':new Date(),'updated_at':new Date()
      }], {truncate: true }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
 
      return queryInterface.bulkDelete('users', null, {});
  }
};
