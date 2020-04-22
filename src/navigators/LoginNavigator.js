/**
 * Start app, if exist login info, go BottomNavigator, else go Home to login
 */

import React, {Component} from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../components/auth/Home';
import BottomNavigator from './BottomNavigator';

const Stack = createStackNavigator(
{
    Home: {
        screen:Home,
        navigationOptions: {
            headerShown: false,
        }
    },
    BottomNavigator: {
        screen:BottomNavigator,
        navigationOptions: {
            headerShown: false,
        }
    }
});

export default createAppContainer(Stack);