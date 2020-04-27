const translate = require('@vitalets/google-translate-api');

// translate('Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much. They were the last people you\'d expect to be involved in anything strange or mysterious, because they just didn\'t hold with such nonsense.', {from: 'en', to: 'de'}).then(res => { console.log(res.text); });

app.get('/translate', (req, res) => {
    res.send("Test!!");
});
