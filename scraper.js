// scraper.js
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeDonations() {
  try {
    // Fetch the HTML from the target site.
    const { data: html } = await axios.get('https://blokadnedonacije.rs/');
    const $ = cheerio.load(html);

    const donationsData = {};

    $('.card.m-3').each((i, card) => {
      // Extract the school name from the card title.
      const schoolName = $(card).find('.card-title').first().text().trim();
      const items = [];

      // For each donation item in the unordered list.
      $(card)
        .find('ul.list-group li')
        .each((j, li) => {
          // The first span is the item name.
          const itemName = $(li).find('span').first().text().trim();

          // Look for all badges to determine the donation types.
          const types = [];
          $(li)
            .find('.badge')
            .each((k, badge) => {
              const typeText = $(badge).text().trim().toLowerCase();
              // Normalize the text if needed (e.g., remove extra spaces).
              if (['manjak', 'hitno', 'višak'].includes(typeText)) {
                types.push(typeText);
              }
            });

          // Push an object with both the name and the types.
          items.push({ name: itemName, types });
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

if (require.main === module) {
  scrapeDonations().then((data) => {
    console.log(JSON.stringify(data, null, 2));
  });
}

module.exports = { scrapeDonations };
