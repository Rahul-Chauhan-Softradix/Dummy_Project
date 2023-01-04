const sequelize = require("sequelize");

class Order {
  async init(db) {
    this.Models = db.models;
  }

  createOrder = async (data) => {
    return this.Models.Orders.create(data);
  };

  getAll = async (userId) => {
    let data = this.Models.Users.findAll({attributes:['first_name','phone_number'],
      include: [{model:this.Models.Orders,attributes:['ProductName',"Price"],as:'orderInfo'}],
      where: { id: userId },
    });

    return data;
  };
}

module.exports = Order;
