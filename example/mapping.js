const scraper = require('../index');

module.exports = {
  title: {
    index: 0,
    callbackFn: scraper.filters.getTitle
  },
  url: {
    index: 0,
    callbackFn: scraper.filters.getUrl
  },
  developer: {
    index: 1,
    callbackFn: scraper.filters.trimText
  },
  publisher: {
    index: 2,
    callbackFn: scraper.filters.trimText
  },
  year: {
    index: 4,
    callbackFn: scraper.filters.extractYear,
    failFn: ($, obj) => {
      return (
        $(obj)
          .text()
          .trim() === 'Unreleased'
      );
    }
  },
  month: {
    index: 4,
    callbackFn: scraper.filters.extractMonth
  },
  day: {
    index: 4,
    callbackFn: scraper.filters.extractDay
  }
};
