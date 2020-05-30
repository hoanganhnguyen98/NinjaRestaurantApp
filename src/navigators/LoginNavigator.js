import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from '../components/auth/Home';
import BottomNavigator from './BottomNavigator';
import ResetPassword from '../components/auth/ResetPassword';
import I18n from '../i18n/i18n';

const Stack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false,
    },
  },
  BottomNavigator: {
    screen: BottomNavigator,
    navigationOptions: {
      headerShown: false,
    },
  },
  ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      title: I18n.t('navigator.resetPassword'),
      headerStyle: {
        backgroundColor: '#3F51B5',
      },
      headerTintColor: '#ffffff',
    },
  },
});

export default createAppContainer(Stack);
