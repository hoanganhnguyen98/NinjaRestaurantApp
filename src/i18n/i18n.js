import I18n from 'react-native-i18n';
import {AsyncStorage} from 'react-native';

import en from './locales/en';
import vi from './locales/vi';

I18n.locale = 'en';

I18n.fallbacks = false;

I18n.translations = {
  en,
  vi,
};

export default I18n;
export const switchLanguage = (language) => {
  I18n.locale = language;
  AsyncStorage.setItem('defaultLanguage', language);
};
