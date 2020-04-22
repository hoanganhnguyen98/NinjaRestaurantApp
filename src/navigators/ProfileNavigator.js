/**
 * From Profile Navigation, go to Change Info
 */

import React, {Component} from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ProfileNav from '../components/ProfileNav';
import ChangeInfo from '../components/users/ChangeInfo';
import LoginNavigator from './LoginNavigator';

const Stack = createStackNavigator(
{
    Profile: {
        screen:ProfileNav,
        navigationOptions: {
            headerShown: false,
        }
    },
    ChangeInfo: {
        screen:ChangeInfo,
        navigationOptions: {
            title: 'Change information',
            headerStyle: {
                backgroundColor: '#3F51B5',
            },
            headerTintColor: '#ffffff',
        }
    },
    // Login: {
    //     screen:LoginNavigator,
    //     navigationOptions: {
    //         headerShown: false,
    //     }
    // }
});

export default createAppContainer(Stack);