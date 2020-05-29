import {Alert} from 'react-native';

const showMessage = (notify, message) => {
  Alert.alert(notify, message, [
    {
      text: 'OK',
      onPress: () => null,
      style: 'cancel',
    },
  ]);
};

export default showMessage;
