import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../common';
import AboutUsNav from '../components/AboutUsNav';
import ProfileNavigator from './ProfileNavigator';
import MenuNavigator from './MenuNavigator';
import CartNavigator from './CartNavigator';

const TabNavigator = createMaterialBottomTabNavigator({
  Menu: {
    screen: MenuNavigator,
    navigationOptions: {
      title: 'Menu',
      activeColor: '#f4f4f4',
      inactiveColor: '#62B1F6',
      barStyle: {backgroundColor: Colors.appColor},
      tabBarIcon: ({tintColor, focused}) => (
        <MCIcon
          name={'food'}
          size={focused ? 25 : 20}
          style={{color: tintColor}}
        />
      ),
    },
  },
  Cart: {
    screen: CartNavigator,
    navigationOptions: {
      title: 'Cart',
      activeColor: '#f4f4f4',
      inactiveColor: '#62B1F6',
      barStyle: {backgroundColor: Colors.appColor},
      tabBarIcon: ({tintColor, focused}) => (
        <Ionicons
          name={'md-cart'}
          size={focused ? 25 : 20}
          style={{color: tintColor}}
        />
      ),
    },
  },
  AboutUs: {
    screen: AboutUsNav,
    navigationOptions: {
      title: 'About us',
      activeColor: '#f4f4f4',
      inactiveColor: '#62B1F6',
      barStyle: {backgroundColor: Colors.appColor},
      tabBarIcon: ({tintColor, focused}) => (
        <Ionicons
          name={'ios-restaurant'}
          size={focused ? 25 : 20}
          style={{color: tintColor}}
        />
      ),
    },
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      title: 'Profile',
      activeColor: '#f4f4f4',
      inactiveColor: '#62B1F6',
      barStyle: {backgroundColor: Colors.appColor},
      tabBarIcon: ({tintColor, focused}) => (
        <Ionicons
          name={'ios-person'}
          size={focused ? 25 : 20}
          style={{color: tintColor}}
        />
      ),
    },
  },
});

export default createAppContainer(TabNavigator);
