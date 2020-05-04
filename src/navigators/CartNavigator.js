/**
 * Cart Navigator
 */

import React, {Component} from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CartNav from '../components/CartNav';
import HistoryDetail from '../components/cart_content/HistoryDetail';

const Stack = createStackNavigator(
{
    Cart: {screen:CartNav,
        navigationOptions: {
            headerShown: false,
        }
    },
    HistoryDetail: {screen:HistoryDetail,
        navigationOptions: {
            title: 'History Detail',
            headerStyle: {
                backgroundColor: '#3F51B5',
            },
            headerTintColor: '#ffffff',
        }
    },
});

export default createAppContainer(Stack);