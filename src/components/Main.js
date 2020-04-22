import React, { Component } from 'react';
import {Container, Body} from 'native-base';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import CustomHeader from './CustomHeader';
import CustomFooter from './CustomFooter';

import Menu from './MenuNav';
import SearchNav from './SearchNav';

export default class Main extends Component {
  render() {
    return (
      <Container>
        <CustomHeader title='Menu' />
        <Body>

        </Body>
        <CustomFooter />
      </Container>
    );
  }
}