const express = require('express');
const cors = require('cors');
const { scrapeDonations } = require('./scraper');
const app = express();
const http = require('http');

const PORT_API = 3000;
const PORT_TELEGRAM = 88;

const announcements = [];

app.use(cors());
app.use(express.json());

// Middleware for the webhook endpoint to restrict access by port
app.use('/webhook', (req, res, next) => {
  if (req.socket.localPort !== PORT_TELEGRAM) {
    return res.status(403).send('Forbidden');
  }
  next();
});

// Webhook endpoint (only works on port 88)
app.post('/webhook', (req, res) => {
  const update = req.body;
  if (update.channel_post) {
    // ... your webhook processing logic ...
    console.log('Webhook received from Telegram on port 88');
    announcements.push(update.channel_post);
    if (announcements.length > 50) announcements.shift();
  }
  res.sendStatus(200);
});

// Other API endpoints (accessible on both ports but ideally used via 3000)
app.get('/api/donations', async (req, res) => {
  try {
    const data = await scrapeDonations();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape data' });
  }
});

app.get('/api/announcements', (req, res) => {
  const lastThree = announcements.slice(-3).reverse();
  res.json(lastThree);
});

// Create two servers using the same app
const telegramServer = http.createServer(app);
const apiServer = http.createServer(app);

telegramServer.listen(PORT_TELEGRAM, () => {
  console.log(`Telegram webhook server listening on port ${PORT_TELEGRAM}`);
});

apiServer.listen(PORT_API, () => {
  console.log(`API server listening on port ${PORT_API}`);
});
