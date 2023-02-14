const {Configuration, OpenAIApi} = require('openai')

const configuration = new Configuration({
    apiKey:"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"
})
const openai = new OpenAIApi(configuration);

class chatGpt{
    async init(db){
        this.Models = db.models;
    
    }
    async returnMsg(req,res){
       const {message} = req.body

        const response = await openai.createCompletion({
            model: "davinci:ft-personal:rahul-testing-16-2023-02-01-07-14-48",
            prompt: `Question: ${message}`,
            temperature: 0,
            max_tokens: 50,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
           stop: ["Question","QUESTION","END","End"],
        });
        console.log(response.data.choices[0].text)
        let newObj = { data:response.data.choices[0].text}

        const d1 = newObj.data.replace("\n", "");
        const ans = d1.split("\n");

       
        res.send({data:response.data.choices[0].text})
    }   

}

module.exports = chatGpt;

//  \n\nQ: calculate total ammount if i take a loan of 10000 amount at 10 percent interset for one year on simple interset.\nA: You have to pay $11,000.