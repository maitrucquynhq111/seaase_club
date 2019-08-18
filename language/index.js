const langen = require('./en');
const langvi = require('./vi');

module.exports = function language(lang) {
  return lang === 'vi' ? langvi : langen;
};
