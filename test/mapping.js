const filters = require('./filters');

module.exports = {
  title: {
    index: 0,
    callbackFn: filters.getTitle
  },
  url: {
    index: 0,
    callbackFn: filters.getUrl
  },
  developer: {
    index: 1,
    callbackFn: filters.trimText
  },
  publisher: {
    index: 2,
    callbackFn: filters.trimText
  },
  year: {
    index: 4,
    callbackFn: filters.extractYear,
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
    callbackFn: filters.extractMonth
  },
  day: {
    index: 4,
    callbackFn: filters.extractDay
  }
};
