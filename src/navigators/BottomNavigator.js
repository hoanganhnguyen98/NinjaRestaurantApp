/**
 * Bottom Navigation in app
 */

import React, {Component} from 'react';

import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import I18n from '../i18n/i18n';

import SearchNav from '../components/SearchNav';
import AboutUsNav from '../components/AboutUsNav';
import MenuToFoodDetail from './MenuNavigator';
import ProfileNavigator from './ProfileNavigator';
import MenuNavigator from './MenuNavigator';

const TabNavigator = createMaterialBottomTabNavigator(
{
    Menu : {
        screen:MenuNavigator,
        navigationOptions: {
            title: I18n.t('nav.menu'),
            activeColor: '#f4f4f4',
            inactiveColor: '#62B1F6',
            barStyle: {backgroundColor: '#3F51B5'},
            tabBarIcon: ({ tintColor, focused }) => (
                <MCIcon
                    name={'food'}
                    size={focused ? 25 : 20}
                    style={{ color: tintColor }}
                />
            ),
        }
    },
    Search : {
        screen:SearchNav,
        navigationOptions: {
            title: I18n.t('nav.search'),
            activeColor: '#f4f4f4',
            inactiveColor: '#62B1F6',
            barStyle: {backgroundColor: '#3F51B5'},
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={'ios-search'}
                    size={focused ? 25 : 20}
                    style={{ color: tintColor }}
                />
            ),
        }
    },
    AboutUs : {
        screen:AboutUsNav,
        navigationOptions: {
            title: I18n.t('nav.aboutus'),
            activeColor: '#f4f4f4',
            inactiveColor: '#62B1F6',
            barStyle: {backgroundColor: '#3F51B5'},
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={'ios-restaurant'}
                    size={focused ? 25 : 20}
                    style={{ color: tintColor }}
                />
            ),
        }
    },
    Profile : {
        screen:ProfileNavigator,
        navigationOptions: {
            title: I18n.t('nav.profile'),
            activeColor: '#f4f4f4',
            inactiveColor: '#62B1F6',
            barStyle: {backgroundColor: '#3F51B5'},
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={'ios-person'}
                    size={focused ? 25 : 20}
                    style={{ color: tintColor }}
                />
            ),
        }
    }
}
);

export default createAppContainer(TabNavigator);