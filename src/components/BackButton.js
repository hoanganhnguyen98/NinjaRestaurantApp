import {BackHandler, Alert} from 'react-native';

const backButton = () => {
  Alert.alert('EXIT', 'Are you sure you want to exit?', [
    {
      text: 'Cancel',
      onPress: () => null,
      style: 'cancel',
    },
    {text: 'EXIT', onPress: () => BackHandler.exitApp()},
  ]);
};

const handleAndroidBackButton = (callback) => {
  BackHandler.addEventListener('hardwareBackPress', () => {
    callback();
    return true;
  });
};

export {backButton, handleAndroidBackButton};
