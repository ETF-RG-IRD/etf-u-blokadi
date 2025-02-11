// /netlify/functions/donations.js
const { scrapeDonations } = require('../../scraper');

exports.handler = async (event, context) => {
  try {
    const data = await scrapeDonations();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error scraping data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to scrape data' }),
    };
  }
};
