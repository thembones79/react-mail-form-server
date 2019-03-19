const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

const port = 4444;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(port, () => {
    console.log('We are live on port 4444');
});


app.get('/', (req, res) => {
    res.send('Welcome to my api');
})

app.post('/api/v1', (req, res) => {
    var data = req.body;


    let smtpTransport = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "order@unisystem.pl", // generated ethereal user
        pass: "turlam3M&Msy" // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });



    var mailOptions = {
        from: data.email,
        to: 'michal.szumnarski@gmail.com',
        subject: 'ENTER_YOUR_SUBJECT',
        html: `<p>${data.name}</p>
          <p>${data.email}</p>
          <p>${data.message}</p>`
    };

    smtpTransport.sendMail(mailOptions,
        (error, response) => {
            if (error) {
                res.send(error)
            } else {
                res.send('Success')
            }
            smtpTransport.close();
        });

})
