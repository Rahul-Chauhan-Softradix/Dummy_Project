const orderController = require('./order.Controller');

class Order{
    constructor(router,db){
        this.router = router;
        this.db = db;
        this.orderInstance = new orderController();
    }
    async routes(){
     await this.orderInstance.init(this.db)

        this.router.post('/order/registration', (req,res)=>{
            this.orderInstance.orderPlaced(req,res)
        })

        this.router.get('/orderList/:userId',(req,res)=>{
            this.orderInstance.getAllOrder(req,res)
        })
    }
}

module.exports = Order