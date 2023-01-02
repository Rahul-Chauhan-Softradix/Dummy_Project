const Services =  require('./user.services.js')
const bcrypt =  require('bcrypt')
const uuid = require('uuid-v4')
const {RESPONSE_CODES,ROLES} = require('../../config/constants')
const {successResponse,errorResponse} = require('../../config/responseHelper')
const {CUSTOM_MESSAGES} = require('../../config/customMessages.js')
const {refreashToken} = require('../services/jwt')
//const {mailSend} = require("../helpers/nodeMailer")

class User{
    async init(db){
        this.services = new Services();
        this.Models = db.models;
       await this.services.init(db)
    }
    async userRegistration(req,res){
        const body = req.body;

        const {first_name,email,phone_number} = body;
       // const nodemail = mailSend(body)
        /** check user email */
       let checkUserEmail = await this.services.getByEmail(email)
        if(checkUserEmail){
           return res.send(errorResponse(CUSTOM_MESSAGES.EMAIL_EXIST,null,null,RESPONSE_CODES.POST))
        }
        /** check user phone_number */
        let checkPhone = await this.services.getByPhone(phone_number)
        if(checkPhone){
            return res.send(errorResponse(CUSTOM_MESSAGES.PHONE_NUMBER_EXIST,null,null,RESPONSE_CODES.POST))
         }
         body.uuid = uuid()
        const userDetails = await this.services.createUser(body)
       
        delete userDetails.dataValues.password
        return res.send(successResponse(CUSTOM_MESSAGES.USER_REGISTER_SUCCESS,null,userDetails,RESPONSE_CODES.POST))
    }
    async userLogin(req,res){
        const body = req.body;
        const {email ,password} = body
        /** check user email */
        const checkEmail = await this.services.getByEmail(email)
        if(!checkEmail){
            return res.send(errorResponse(CUSTOM_MESSAGES.INVALID_EMAIL,null,null,RESPONSE_CODES.POST))
        }
        /** check user password */
        const checkPassword = await bcrypt.compare(password,checkEmail.password)
        if(!checkPassword){
           return res.send(errorResponse(CUSTOM_MESSAGES.INVALID_PASSWORD,null,null,RESPONSE_CODES.POST))
        }
        /** generate token */
        const token = refreashToken(checkEmail.dataValues)
        
        return res.send(successResponse(CUSTOM_MESSAGES.LOGIN_SUCCESS,null,token,RESPONSE_CODES.POST))
    }

    async listUser(req,res){
        const {page} = req.body;
        let response = {}
        let list = await this.services.getUserList(page)
      
        const totalUser = await this.services.countUser()
        response = successResponse(CUSTOM_MESSAGES.SUCCESS, null,list,RESPONSE_CODES.POST)
        response.recordsTotal = totalUser

       return res.send(response)
    }
}

module.exports = User