/**
 * From Menu go to Food Detail
 */

import React, {Component} from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MenuNav from '../components/MenuNav';
import FoodDetail from '../components/FoodDetail';
import Search from '../components/Search';

const Stack = createStackNavigator(
{
    Menu: {
        screen:MenuNav,
        navigationOptions: {
            headerShown: false,
        }
    },
    FoodDetail: {
        screen:FoodDetail,
        navigationOptions: {
            title: 'Food Detail',
            headerStyle: {
                backgroundColor: '#3F51B5',
            },
            headerTintColor: '#ffffff',
        }
    },
    Search: {
        screen:Search,
        navigationOptions: {
            headerShown: false,
        }
    },
});

export default createAppContainer(Stack);