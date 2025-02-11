// /api/donations.js
const { scrapeDonations } = require('../scraper');

module.exports = async (req, res) => {
  try {
    const data = await scrapeDonations();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error scraping data:', error);
    res.status(500).json({ error: 'Failed to scrape data' });
  }
};
