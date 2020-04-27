const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static(path.join(__dirname + '/')));

app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');

const translate = require('@vitalets/google-translate-api');
var sourceLang = 'es', targetLang = 'en';

app.post('/change-language', (req, res) => {
    sourceLang = req.body.sourceLang;
    targetLang = req.body.targetLang;
});

app.post('/translate', (req, res) => {
    translate(req.body.text, {from: sourceLang, to: targetLang}).then( (translation) => {
        res.send(translation);
    });
});
