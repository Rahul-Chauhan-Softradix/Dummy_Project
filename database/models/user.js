const bcrypt = require('bcrypt')
const {saltRounds} = require('../../config/keys')

module.exports = (sequelize,DataTypes) =>{
 const users = sequelize.define('users',{
    id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type:DataTypes.INTEGER
    },
    role_id: {
      type: DataTypes.TINYINT,
      defaultValue: 2,
      comment: '1 = Admin, 2= User',
    },
    first_name:{
          type:DataTypes.STRING(200),
            allowNull:false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    },
    last_name:{
      type:DataTypes.STRING(200),
      allowNull:true
    },
    gender:{
      type:DataTypes.ENUM("male","female"),
      allowNull:true
    },
     email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    password:{
      type:DataTypes.STRING(100),
      allowNull:false
    }
   
 },{timeStamps:true,paranoid: true,
    hooks:{
      beforeCreate: async(user)=>{
        /**  password encryption **/

        if (user && user.password) {
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      }
    }
})
 return users;
}