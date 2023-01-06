const Services = require('./order.services.js')

class Order{
    async init(db){
        this.services = new Services()
        this.Models = db.models;
        await this.services.init(db)
    }

    orderPlaced = async (req,res)=>{
        try{
        const body = req.body;
      
        const orderDetails = await this.services.createOrder(body)

        return res.send({data:orderDetails})
        }catch(err){
            console.log(err)
           return res.send(err.errors[0].message)
        }
    }
    getAllOrder = async (req,res)=>{
    
        const userId = req.params.userId
      let data = await this.services.getAll(userId)

      return res.send(data)
    }
}

module.exports = Order;