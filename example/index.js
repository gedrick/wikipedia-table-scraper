const scraper = require('../index');
const mapping = require('./mapping');
const wikiPage = 'List_of_Super_Nintendo_Entertainment_System_games';
const tableIndexes = [0];
const config = {
  page: wikiPage,
  mapping,
  tableIndexes
};

scraper
  .scrape(config)
  .then(results => {
    console.log('Scrape results:', results);
  })
  .catch(err => {
    console.log(err);
  });

