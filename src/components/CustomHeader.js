import React, {Component} from 'react';
import {Header, Button, Left, Right, Body, Title} from 'native-base';
import {Image, View} from 'react-native';

import {Styles} from '../common';

export default class CustomHeader extends Component {
  render() {
    return (
      <View>
        <Header>
          <Left>
            <Button transparent>
              <Image
                source={require('../assets/img/logo.jpg')}
                style={Styles.logo}
              />
            </Button>
          </Left>
          <Body>
            <Title>Ninja Restaurant</Title>
          </Body>
          <Right />
        </Header>
      </View>
    );
  }
}
