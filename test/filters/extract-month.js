module.exports = function($, obj) {
  const str = $(obj).text();
  if (str.includes(',')) {
    const dayMonth = str.split(',')[0];
    return dayMonth.split(' ')[0];
  } else {
    return null;
  }
};
