// server.js
const express = require('express');
const cors = require('cors'); // Import cors
const { scrapeDonations } = require('./scraper');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

app.get('/api/donations', async (req, res) => {
  try {
    const data = await scrapeDonations();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
