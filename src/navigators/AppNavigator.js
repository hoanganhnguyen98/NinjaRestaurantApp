import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginNav from './LoginNavigator';
import BottomNavigator from './BottomNavigator';
import StartScreen from '../components/StartScreen';

const Stack = createStackNavigator({
  StartScreen: {
    screen: StartScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  LoginNav: {
    screen: LoginNav,
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
});

export default createAppContainer(Stack);
