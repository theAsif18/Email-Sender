// PB1fNOv6L1mu3j9CWKOD_D9lFWFX0sZ8LePk5jZt

const nodemailer = require('nodemailer');
const express = require('express');
const { Siprec } = require('twilio/lib/twiml/VoiceResponse');
const dotenv = require('dotenv').config({ path: './config.env' });
const path = require('path');
const exp = require('constants');

const app = express();

const sid = 'ACbe730df67a8abc7282d7aa6e3eff92d8';
const auth_token = '5e0fe4d4762cde8b4834658e60b40371';
const twilio = require('twilio')(sid, auth_token);

const publicDirPath = path.join(__dirname, './public');

app.use(express.static(publicDirPath));

const port = process.env.PORT || 3000;

app.get('/sendMail', (req, res) => {
    const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "asif1251999@gmail.com",
            pass: "vuhuyikgsxrzozek"
        }
    })

    const details = {
        from: "asif1251999@gmail.com",
        to: "18bmiit072@gmail.com",
        subject: "For testing purpose",
        text: "Hello from nodemailer. Email has been sent to you for testing",
        html: `<h1>Hello and welcome to nodemailer.</h1>`,
        attachments: [
            {
                filename: 'sending.pdf',
                path: './sending.pdf',
                cid: 'ASIF'
            }
        ]
    }

    mailTransporter.sendMail(details, (err) => {
        if (err) {
            return res.status(400).send({
                msg: err
            })
        }

        res.status(400).send({
            msg: "Email has been sent"
        })
    })
})

app.get('/sendMessage', (req, res) => {
    twilio.messages.create({
        from: "+15139516211",
        to: "+917202849630",
        body: "This is for testing purpose"
    }).then((res) => {
        console.log("Message has been sent");
        res.send(res);
    }).catch((err) => {
        res.send(err);
    })
})
app.listen(port, console.log(`Server connected to port ${port}`));