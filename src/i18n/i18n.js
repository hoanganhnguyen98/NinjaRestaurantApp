import I18n from 'react-native-i18n';

import en from './locales/en';
import vi from './locales/vi';

I18n.fallbacks = true;

I18n.translations = {
  en,
  vi,
};

// use command below if want to us 'trans' instead of 'I18n.t'
// export const trans = (name, params = {}) => I18n.t(name, params);

// set language and update, below using forceUpdate to refresh component

// export const setLanguage = (lang, component) => {
//   I18n.locale = lang;
//   component.forceUpdate();
// };

// but navigator not working so using package to restart app
export const setLanguage = (locale) => {
  I18n.locale = locale;
};

export default I18n;
