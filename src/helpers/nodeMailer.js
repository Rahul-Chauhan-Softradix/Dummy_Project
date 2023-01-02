var nodemailer = require('nodemailer')

const mailSend = function(data){
    console.log(data.email)
    let transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:'ranarahul8889@gmail.com',
            pass:"Bhagat@123"
        }
    })
    
    
    let mailOptions = {
        from:'rahulrajput@yopmail.com',
        to: data.email,
        subject:"successful registration",
        text:"hello from nodejs"
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log("error=========",error)
        }else{
            console.log("email has been sent",info.response)
        }
    })

}

module.exports = {mailSend}