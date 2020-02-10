const req = require('request');
const cheerio = require('cheerio');

function processResults(tableIndexes, mapping, body, maxRows = 0) {
  const $ = cheerio.load(body);
  const tables = $('.sortable');

  let rowCells;
  let results = [];
  let nextResult;
  let currentProperty;
  let finalValue;
  let resultsCount = 0;
  tableIndexes.forEach(tableIndex => {
    // Loop over each row in the table.
    $(tables[tableIndex])
      .find('tbody tr')
      .each((index, tableRow) => {
        if (maxRows > 0 && resultsCount >= maxRows) {
          return;
        }

        let shortCircuited = false;

        rowCells = $(tableRow).children();

        const props = Object.keys(mapping);
        nextResult = {};

        props.forEach(propName => {
          currentProperty = mapping[propName];

          // If it's simply pointing to an index, grab it.
          if (Number.isInteger(currentProperty)) {
            finalValue = $(rowCells[currentProperty]).text();
          } else {
            // Check the failFn if it exists. If the test passes, short circuit the row.
            if (
              currentProperty.failFn &&
              typeof currentProperty.failFn === 'function'
            ) {
              if (
                currentProperty.failFn($, $(rowCells[currentProperty.index]))
              ) {
                shortCircuited = true;
              }
            }

            // Otherwise, run the callback on the index.
            if (
              currentProperty.callbackFn &&
              typeof currentProperty.callbackFn === 'function'
            ) {
              finalValue = currentProperty.callbackFn(
                $,
                $(rowCells[currentProperty.index])
              );
            } else {
              finalValue = $(rowCells[currentProperty.index]).text();
            }
          }

          nextResult[propName] = finalValue;
        });

        if (!shortCircuited) {
          results.push(nextResult);
          resultsCount++;
        }
      });
  });

  return results;
}

// function findTables(body) {
//   const $ = cheerio.load(body);
//   const tables = [];

//   $('.wikitable').each((index, table) => {
//     const $table = $(table);

//     const tableId = $table.attr('id');
//     const closestHeader = $table
//       .prevAll('h2')
//       .first()
//       .text();
//     const firstRows = $table.find('tr').slice(0, 3);

//     tables.push({
//       tableId,
//       closestHeader,
//       firstRows
//     });
//   });

//   displayResults(tables);
// }

// function displayResults(tables) {
//   console.log(`++++++ ${tables.length} TABLES FOUND ++++++`);

//   tables.forEach((table, index) => {
//     console.log(`Table ${index} ID: ${table.tableId}`);
//     if (table.closestHeader) {
//       console.log(`\tClosest header: ${table.closestHeader}`);
//     }
//     // if (table.firstRows.length) {
//     //   console.log(table.firstRows);
//     // }
//   });
// }

function scrape(config) {
  const url = `https://en.wikipedia.org/wiki/${config.page}`;
  return new Promise((resolve, reject) => {
    req.get({ url }, (err, resp, body) => {
      if (resp.statusCode === 404) {
        reject(`Error: wiki page \`${config.page}\` does not exist!`);
      } else if (err) {
        reject(`Error with Wikipedia request: ${err}`);
      } else {
        const results = processResults(
          config.tableIndexes,
          config.mapping,
          body,
          config.maxRows
        );

        resolve(results);
      }
    });
  });
}

// function checkTables(page) {
//   const url = `https://en.wikipedia.org/wiki/${page}`;
//   req.get({ url }, (err, resp, body) => {
//     if (resp.statusCode === 404) {
//       console.error(`Error: wiki page \`${page}\` does not exist!`);
//     } else if (err) {
//       console.error(`Error with Wikipedia request: ${err}`);
//     } else {
//       findTables(body);
//     }
//   });
// }

module.exports = {
  scrape
  // checkTables
};
