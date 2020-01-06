const scrape = require('../scrape');
const mapping = require('./mapping');
const wikiPage = 'List_of_Super_Nintendo_Entertainment_System_games';
const tableIndexes = [0];
const config = {
  page: wikiPage,
  mapping,
  tableIndexes
};

scrape
  .scrape(config)
  .then(results => {
    console.log('got scrape results:', results);
  })
  .catch(err => {
    console.log(err);
  });

// scrape.checkTables(wikiPage);
