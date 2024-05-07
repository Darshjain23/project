import nodemailer from 'nodemailer'
import 'dotenv/config'

function setmail() {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.email,
          pass: process.env.password
        }
      });
      return(transporter)
}

function sendmail(email,fname,trans) {
  var mailOptions = {
    from: 'darsh10@somaiya.edu',
    to: email,
    subject: 'Registration',
    html: '<h3>Thank you for registering with us</h3>' + fname + '<p>Shop Now</p>'
  };

  trans.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function database() {
  const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'register',
    password: '123456',
    port: 5432
  });
  
  client.connect(function (err) {
    if (err) throw err;
    console.log("connected")
  });
}


export {setmail,sendmail}
