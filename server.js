const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

app.post('/send_message', (req, res) => {
    const message = req.body.message;
    if (!message) {
        return res.status(400).send('Invalid message');
    }
    fs.appendFileSync('chat.txt', message + '\n');
    res.sendStatus(200);
});

app.get('/get_chat_history', (req, res) => {
    const chatHistory = fs.readFileSync('chat.txt', 'utf8').split('\n').reverse();
    res.send(chatHistory.join('<br>'));
});

app.use(express.static(__dirname));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
