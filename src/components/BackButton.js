import {BackHandler, Alert} from 'react-native';

import I18n from '../i18n/i18n';

const backButton = () => {
  Alert.alert(I18n.t('backButton.exit'), I18n.t('backButton.message'), [
    {
      text: I18n.t('cancel'),
      onPress: () => null,
      style: 'cancel',
    },
    {text: I18n.t('backButton.exit'), onPress: () => BackHandler.exitApp()},
  ]);
};

const handleAndroidBackButton = (callback) => {
  BackHandler.addEventListener('hardwareBackPress', () => {
    callback();
    return true;
  });
};

export {backButton, handleAndroidBackButton};
