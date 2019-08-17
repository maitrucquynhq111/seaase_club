import langen from './en';
import langvi from './vi';

export function language(lang) {
  return lang === 'vi' ? langvi : langen;
};
