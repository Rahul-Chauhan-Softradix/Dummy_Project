const user = require('./user/index.js')
const Order = require('./order/index.js')
 class Routes{
    constructor(router,db){
        this.router = router;
        this.DatabaseConnect = db;
    }

    async routesRegistration(){
        this.db = await this.DatabaseConnect.getDB();

        
        this.user = new user(this.router,this.db);
        await this.user.routes()


        this.order = new Order(this.router,this.db)
        await this.order.routes()
        
    }
}

module.exports = Routes