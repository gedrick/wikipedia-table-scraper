module.exports = function trimText($, obj) {
  const str = $(obj).text();
  return str.trim();
};
