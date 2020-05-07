import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from '../components/auth/Home';
import BottomNavigator from './BottomNavigator';
import ResetPassword from '../components/auth/ResetPassword';

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
      title: 'Reset password',
      headerStyle: {
        backgroundColor: '#3F51B5',
      },
      headerTintColor: '#ffffff',
    },
  },
});

export default createAppContainer(Stack);
