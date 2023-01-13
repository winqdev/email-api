//Note: Put your email at line 48 or this will return a error

//Main packages
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { SMTP, PORT, USER, PASS, FROM } = require("./config.json");
var port = 80

let transporter = nodemailer.createTransport({
  host: SMTP,
  port: PORT,
  secure: true,
  auth: {
    user: USER,
    pass: PASS,
  },
})

//Using body parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Listener and Port binding
const listener = app.listen(port, () => {
  console.log("Your app running and listening on port " + listener.address().port);
});

app.post("/send/:to/:subject", async (request, response) => {
  
  if(!request.params.to) {
    response.send("To?")
    return
  }

  if(!request.params.subject) {
    response.send("Subject?")
    return
  }

  let result = await transporter.sendMail({
    from: '"API" <youremail@gmail.com>',
    to: request.params.to,
    subject: request.params.subject,
    text: request.body.text || "No text provided in body!",
  })
  response.send(`Sent!`)
})
