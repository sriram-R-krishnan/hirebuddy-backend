const nodemailer = require('nodemailer')

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "srirammern95@gmail.com",
        pass: 'czbzvcebregykmbh'
    }
})

let details = {
    from: "srirammern95@gmail.com",
    to: "swathy@guvi.in",
    subject: "Sending Test Mail",
    text: "this is the message from nodemailer"
}


const sendMail = async (req, res) => {

    mailTransporter.sendMail(details, (error) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('mailsent');
        }
    })
    res.send("I am Sending Mail")
}

module.exports = sendMail