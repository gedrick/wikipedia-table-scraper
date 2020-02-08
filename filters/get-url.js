module.exports = function($, obj) {
  let href = null;
  let links = $(obj).find('a');

  if (links.length) {
    href = $(links[0]).attr('href');
  }

  if (href && !href.includes('/wiki')) {
    return null;
  }

  return href;
};
