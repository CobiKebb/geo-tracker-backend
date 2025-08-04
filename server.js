const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/log', (req, res) => {
  const logEntry = {
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    ...req.body
  };

  fs.appendFile('logs.txt', JSON.stringify(logEntry) + '\n', err => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});

app.get('/', (req, res) => {
  res.send('API de tracking en ligne');
});

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
