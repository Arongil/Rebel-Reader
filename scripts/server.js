const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/scripts'));

app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
