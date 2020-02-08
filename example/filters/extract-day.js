module.exports = function($, obj) {
  const str = $(obj).text();
  if (str.includes(',')) {
    const dayMonth = str.split(',')[0];
    return parseInt(dayMonth.split(' ')[1].trim());
  } else {
    return null;
  }
};
