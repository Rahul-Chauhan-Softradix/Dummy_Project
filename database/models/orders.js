module.exports = (sequelize,Datatypes)=>{
    const orders = sequelize.define('orders',{
        id:{
            type:Datatypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        user_id:{
            type:Datatypes.INTEGER,
            allowNull:true
        },
        ProductName:{
            type:Datatypes.STRING(50),
            allowNull:true
        },
        Price:{
            type:Datatypes.INTEGER,
            allowNull:false
        },
        Quantity:{
            type:Datatypes.INTEGER,
            allowNull:false
        },
        totalAmount:{
            type:Datatypes.INTEGER,
            allowNull:true
        }
    },{timeStamps:true})
    return orders;
}