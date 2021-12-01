const ExpressError = require('./ExpressError');
const nodemailer = require("nodemailer");
const Joi = require("joi");

const contactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    service: Joi.string().required()
});

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    port: 587, // port for secure SMTP
    secureConnection: false, // TLS requires secureConnection to be false
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Nodemailer running");
    }
});

module.exports.sendMail = async (mail) => {
    try {
        const { error } = contactSchema.validate(mail, {allowUnknown: true});
        if (error) {
            console.log(error)
            return false;
        } else {
            let textBody;
            if (mail.website) {
                textBody = `Client: \n${mail.name}\n${mail.email}\n${mail.phone} \n\nService: \n${mail.service} - ${mail.website} \n\nMessage: \n${mail.message}`
            } else {
                textBody = `Client: \n${mail.name}\n${mail.email}\n${mail.phone} \n\nService: \n${mail.service} \n\nMessage: \n${mail.message}`
            }
        
            const contactInformation = {
                sender: mail.email,
                to: process.env.EMAIL_USER, // receiver email,
                subject: mail.service,
                text: textBody,
            };
    
            let mailSent = await transporter.sendMail(contactInformation);
    
            if (mailSent.accepted) {
                return true;
            } else {
                return false;
            }
        }
    } catch (err) {
        return err;
    }
};