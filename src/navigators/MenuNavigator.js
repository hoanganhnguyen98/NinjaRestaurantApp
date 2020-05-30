import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MenuNav from '../components/MenuNav';
import FoodDetail from '../components/FoodDetail';
import I18n from '../i18n/i18n';

const Stack = createStackNavigator({
  Menu: {
    screen: MenuNav,
    navigationOptions: {
      headerShown: false,
    },
  },
  FoodDetail: {
    screen: FoodDetail,
    navigationOptions: {
      title: I18n.t('navigator.foodDetail'),
      headerStyle: {
        backgroundColor: '#3F51B5',
      },
      headerTintColor: '#ffffff',
    },
  },
});

export default createAppContainer(Stack);
