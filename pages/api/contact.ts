import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {

    console.log('Data', req.body)

    const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const { name, email, message } = req.body;


async function send() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Contact Form" <sandbox.smtp.mailtrap.io>',
    to: "Dekpour@yahoo.com.com",
    subject: "New Contact Form",
    text:`Hello you have a new form entry from: ${name} with the email address ${email}.
    
    ${message}
    `,

  });


  console.log("Message sent: %s", message);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

send().catch(console.error);

    res.status(200).json({ message: 'Message Delivered' })
}