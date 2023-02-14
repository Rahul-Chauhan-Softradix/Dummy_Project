const auth = require('./auth/index.js')
const user = require('./user/index')
const Order = require('./order/index.js')
const chatGpt = require('./chatGpt/index')
 class Routes{
    constructor(router,db){
        this.router = router;
        this.DatabaseConnect = db;
    }

    async routesRegistration(){
        this.db = await this.DatabaseConnect.getDB();

        
        this.auth = new auth(this.router,this.db);
        await this.auth.routes()


        this.order = new Order(this.router,this.db)
        await this.order.routes()
        
        this.user = new user(this.router,this.db);
        await  this.user.routes()

        this.user = new chatGpt(this.router,this.db);
        await this.user.routes()

    }
}

module.exports = Routes