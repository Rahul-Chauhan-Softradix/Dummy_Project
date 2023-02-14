const  config   =  require('config');
//const Sequelize = require('sequelize');
const {Sequelize,DataTypes}  = require('sequelize');


 class DB{

    constructor(){
        this.seqClient = null;
        this.dbConfig = config.db;
        this.mysqlConfigClient = this.dbConfig.mysql.client;
        this.db = {};
        this.isDbRunning = true;
    }

    async connectMySQLClient(){
        try{
            this.seqClient = new Sequelize(
                this.mysqlConfigClient.database,
                this.mysqlConfigClient.username,
                this.mysqlConfigClient.password,
                {
                  host:this.mysqlConfigClient.host,
                  port:this.mysqlConfigClient.port,
                  dialect:this.mysqlConfigClient.dialect,
                  operatorsAliases:0,
                  logging:true,
                  pool:{
                    min:this.mysqlConfigClient.pool.min,
                    max:this.mysqlConfigClient.pool.max,
                    idle:this.mysqlConfigClient.pool.idle
                  },
                  define:{
                    underscored:true,
                  },
                  logging:false
                },
            );
            this.seqClient
            .authenticate()
            .then(()=>{
                console.log("Connection to Client DB has been established successfully.")
            })
        .catch((err) =>{
            console.error('Unable to connect to the Client database:',err)
        })        
        } catch(err){
            throw err
        }
    }
    async init(){
        await this.connectMySQLClient()
        await this.setupModels()
    }

    async checkConnection() {
        try {
          return this.isDbRunning;
        } catch (error) {
          return !this.isDbRunning;
        }
      }

      async setupModels(){
        this.db.sqlClient = this.seqClient;      
        this.db.models = {};
      this.db.models.Users = require('../../database/models/user.js')(this.seqClient,DataTypes);

     this.db.models.Roles = require('../../database/models/roles.js')(this.seqClient,DataTypes);

     this.db.models.Orders = require('../../database/models/orders.js')(this.seqClient,DataTypes)

     /**Associations */

  // this.db.models.Orders.belongsTo(this.db.models.Users,{foreignKey:'user_id'})

 this.db.models.Users.hasMany(this.db.models.Orders,{ foreignKey:'user_id',as:'orderInfo'})
      
      this.db.sqlClient.sync({alter:true});
      }

      async getDB(){
        return this.db
      }
}

module.exports = DB