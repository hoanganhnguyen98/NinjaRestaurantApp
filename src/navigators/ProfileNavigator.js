import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import ProfileNav from '../components/ProfileNav';
import ChangeInfo from '../components/users/ChangeInfo';
import ChangePassword from '../components/users/ChangePassword';
import I18n from '../i18n/i18n';

const Stack = createStackNavigator({
  Profile: {
    screen: ProfileNav,
    navigationOptions: {
      headerShown: false,
    },
  },
  ChangeInfo: {
    screen: ChangeInfo,
    navigationOptions: () => ({
      title: I18n.t('navigator.changeInformation'),
      headerStyle: {
        backgroundColor: '#3F51B5',
      },
      headerTintColor: '#ffffff',
    }),
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: () => ({
      title: I18n.t('navigator.changePassword'),
      headerStyle: {
        backgroundColor: '#3F51B5',
      },
      headerTintColor: '#ffffff',
    }),
  },
});

export default createAppContainer(Stack);
