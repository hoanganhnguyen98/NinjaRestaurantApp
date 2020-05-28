import NetInfo from '@react-native-community/netinfo';
import {Alert} from 'react-native';

const networkChecking = () => {
  NetInfo.fetch().then((state) => {
    if (state.isConnected !== true) {
      Alert.alert(
        'Internet disconnected',
        'Check network connection to continue?',
        [
          {
            text: 'OK',
            onPress: () => null,
            style: 'cancel',
          },
        ],
      );
    }
  });
};

const handleNetworkState = NetInfo.addEventListener((state) => {
  console.log(state.isConnected);
  if (state.isConnected !== true) {
    Alert.alert(
      'Internet disconnected',
      'Check network connection to continue?',
      [
        {
          text: 'OK',
          onPress: () => null,
          style: 'cancel',
        },
      ],
    );
  }
});

export {networkChecking, handleNetworkState};
