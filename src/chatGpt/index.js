const chatGptController = require('./chatGpt.controller')

class chatGpt{
    constructor(router,db){
        this.router = router;
        this.db = db;
        this.chatGptInstance = new chatGptController()
    }
    async routes(){
        await this.chatGptInstance.init(this.db)

        /** list all users */
        this.router.post('/chatGpt', (req,res)=>{ 
            this.chatGptInstance.returnMsg(req,res)
        })
    }
}

module.exports = chatGpt;