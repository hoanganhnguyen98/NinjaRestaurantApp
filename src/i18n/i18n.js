import I18n from 'react-native-i18n';

import en from './locales/en';
import vi from './locales/vi';

// set new locale languages
export const setLanguage = (locale) => {
  I18n.locale = locale;
};

I18n.fallbacks = true;

I18n.translations = {
  en,
  vi,
};

export default I18n;
