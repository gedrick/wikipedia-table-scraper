module.exports = function($, obj) {
  let title;
  let links = $(obj).find('a');

  if (links.length) {
    title = $(links[0]).text();
  } else {
    title = $(obj).text();
  }

  return title;
};
