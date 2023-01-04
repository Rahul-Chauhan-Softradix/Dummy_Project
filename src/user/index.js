const userController = require('./user.Controller.js')
const schemaValidator = require('../helpers/schemaValidator')
const {registerValidator,loginValidator} = require('./user.validator')


 class User{
    constructor(router,db){
        this.router = router;
        this.db = db;
        this.userInstance = new userController();
    }
    async routes(){
        await this.userInstance.init(this.db);

        /** user registration */
        this.router.post('/users/registration',schemaValidator(registerValidator), (req,res)=>{
            this.userInstance.userRegistration(req,res)
        })
        /** user login */
        this.router.post('/users/login',schemaValidator(loginValidator), (req,res)=>{
            this.userInstance.userLogin(req,res)
        })

        /** list all users */
        this.router.post('/users/list',(req,res)=>{
            this.userInstance.listUser(req,res)
        })
    }
}

module.exports = User