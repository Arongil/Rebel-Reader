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

// translate('Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much. They were the last people you\'d expect to be involved in anything strange or mysterious, because they just didn\'t hold with such nonsense.', {from: 'en', to: 'de'}).then(res => { console.log(res.text); });

app.post('/translate', (req, res) => {
    translate(req.body.text, {from: 'es', to: 'en'}).then( (translation) => {
        res.send(translation);
    });
});
