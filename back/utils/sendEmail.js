const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.EMAIL_PASSWORD)

const sendEmail = (options) => {

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text
  }

  try {
    sgMail.send(mailOptions).then(() => { console.log('email sent')}).catch((err) => { console.log(err)})
  } catch (err) {
    console.log(err)
  }

}

module.exports = sendEmail;