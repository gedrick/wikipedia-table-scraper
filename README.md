# wikipedia-table-scraper
Scrape wikipedia tables and do things with the results.

# Example

```js
const scraper = require('wikipedia-table-scraper');

getTitle($, obj) {
  let title;
  let links = $(obj).find('a');

  if (links.length) {
    title = $(links[0]).text();
  } else {
    title = $(obj).text();
  }

  return title;
}

const mapping = {
  nameOfField: {
    index: 0, // index of table column
    callbackFn: getTitle // function to apply to each field
    failFn: ($, obj) => {
      return $(obj).text() === '';
      // Short circuit (skip) the row if this evals to true.
    }
  }
};

const config = {
  page: 'Name_of_Wikipedia_Page',
  // Wikipedia page name pulled from URL.
  mapping,
  // Object with list of fields to extract and what filters 
  // to apply.
  tableIndexes: [0, 1, 2]
  // array of indexes for each table on the Wiki page
};

scraper.scrape(config).then(result => {
  // Do something with the results.
})
```