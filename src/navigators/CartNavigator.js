import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import CartNav from '../components/CartNav';
import HistoryDetail from '../components/cart_content/HistoryDetail';
import I18n from '../i18n/i18n';

const Stack = createStackNavigator({
  Cart: {
    screen: CartNav,
    navigationOptions: {
      headerShown: false,
    },
  },
  HistoryDetail: {
    screen: HistoryDetail,
    navigationOptions: {
      title: I18n.t('navigator.billDetail'),
      headerStyle: {
        backgroundColor: '#3F51B5',
      },
      headerTintColor: '#ffffff',
    },
  },
});

export default createAppContainer(Stack);
