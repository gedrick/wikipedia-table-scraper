module.exports = function($, obj) {
  const str = $(obj).text();
  if (str.includes(',')) {
    const year = str.split(',')[1];
    return parseInt(year.trim());
  } else if (str.includes(' ')) {
    return parseInt(str.split(' ')[1]);
  }

  return null;
};
