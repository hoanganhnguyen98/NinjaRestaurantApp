import React from 'react';
import {Header, Button, Left, Right, Body, Title} from 'native-base';
import {Image, View} from 'react-native';

import {Styles} from '../common';

const CustomHeader = (props) => {
  const {headerTitle} = props;

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
          <Title>{headerTitle}</Title>
        </Body>
        <Right />
      </Header>
    </View>
  );
};

export default CustomHeader;
