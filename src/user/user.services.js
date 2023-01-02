const sequelize = require("sequelize");

const Op = sequelize.Op;

class User {
  async init(db) {
    this.Models = db.models;
  }
  /** create user */
  createUser = async (data) => {
    return this.Models.Users.create(data);
  };
  /** getUser by email */
  getByEmail = async (email) => {
    return this.Models.Users.findOne({ where: { email: email } });
  };
  getByPhone = async (phone_number) => {
    return this.Models.Users.findOne({ where: { phone_number: phone_number } });
  };

  getUserList = async (page) => {
    const query = { role_id: 2};
    let limit = null;

    if (page != undefined) {
      page = 3 * parseInt(page);
      limit = 3;
    } else {
      page = 0;
    }

    return this.Models.Users.findAll({
      where: query,
      attributes: {
        exclude: ["password"],
      },
      attributes: ["id", "first_name"],
      limit: limit,
      offset: page,
     // order:[['id','desc']]
    });
  };

  countUser = async () => {
    const query = { role_id: 2, is_deleted: 0 };
    return this.Models.Users.count({ where: query });
  };
}

module.exports = User;
