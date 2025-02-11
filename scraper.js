// scraper.js
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeDonations() {
  try {
    // Fetch the HTML from the target site.
    const { data: html } = await axios.get('https://blokadnedonacije.rs/');
    const $ = cheerio.load(html);

    const donationsData = {};

    // Select each donation card. Here we assume every card has both the "card" and "m-3" classes.
    $('.card.m-3').each((i, card) => {
      // Extract the school name from the card title.
      const schoolName = $(card).find('.card-title').first().text().trim();
      const items = [];

      // For each donation item in the unordered list.
      $(card)
        .find('ul.list-group li')
        .each((j, li) => {
          // Get the item name from the first <span> in the list item.
          const itemName = $(li).find('span').first().text().trim();
          // (Optional) You can also extract additional details (e.g., badges for “Manjak” or “Hitno”)
          items.push(itemName);
        });

      if (schoolName) {
        donationsData[schoolName] = items;
      }
    });

    return donationsData;
  } catch (error) {
    console.error('Error scraping data:', error);
    throw error;
  }
}

// Allow running this script directly.
if (require.main === module) {
  scrapeDonations().then((data) => {
    console.log(JSON.stringify(data, null, 2));
  });
}

module.exports = { scrapeDonations };
