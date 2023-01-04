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
    uuid:{
      type:DataTypes.STRING(50),
      allowNull:false,

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
      allowNull:true
    },
    is_deleted:{
      type:DataTypes.TINYINT,
      allowNull:true,
      defaultValue:0
    }
   
 },{timeStamps:true,paranoid: true,underscored:true,
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