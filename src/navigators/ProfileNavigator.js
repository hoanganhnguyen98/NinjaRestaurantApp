import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import ProfileNav from '../components/ProfileNav';
import ChangeInfo from '../components/users/ChangeInfo';
import ChangePassword from '../components/users/ChangePassword';

const Stack = createStackNavigator({
  Profile: {
    screen: ProfileNav,
    navigationOptions: {
      headerShown: false,
    },
  },
  ChangeInfo: {
    screen: ChangeInfo,
    navigationOptions: {
      title: 'Change information',
      headerStyle: {
        backgroundColor: '#3F51B5',
      },
      headerTintColor: '#ffffff',
    },
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: {
      title: 'Change password',
      headerStyle: {
        backgroundColor: '#3F51B5',
      },
      headerTintColor: '#ffffff',
    },
  },
});

export default createAppContainer(Stack);
