const sequelize =  require('sequelize')

const Op = sequelize.Op;

class User{
    async init(db){
        this.Models = db.models;
        
    }
    /** create user */
    createUser = async(data) =>{
        return this.Models.Users.create(data)
    }
    /** getUser by email */
    getByEmail = async(email)=>{
        return this.Models.Users.findOne({where:{ email:email}})
    }
    getByPhone = async (phone_number)=>{
        return this.Models.Users.findOne({where:{phone_number:phone_number}})
    }
}

module.exports = User