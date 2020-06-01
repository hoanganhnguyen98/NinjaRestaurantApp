import React, {Component} from 'react';
import {Content, Text, List, ListItem, Left, Body, Right} from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';

import * as OpenAnything from 'react-native-openanything';

export default class Contact extends Component {
  render() {
    return (
      <Content>
        <List>
          <ListItem
            avatar
            onPress={() =>
              OpenAnything.Web('https://ninja-restaurant.herokuapp.com/index')
            }>
            <Left>
              <Ionicons
                name="logo-chrome"
                size={25}
                style={{color: '#34A853', paddingRight: 10}}
              />
            </Left>
            <Body>
              <Text>ninja-restaurant.com</Text>
            </Body>
            <Right>
              <Ionicons
                name="md-arrow-round-forward"
                size={20}
                style={{color: '#3F51B5', paddingRight: 10}}
              />
            </Right>
          </ListItem>
          <ListItem
            avatar
            onPress={() => OpenAnything.Email('hoanghuynh1998@gmail.com')}>
            <Left>
              <Ionicons
                name="ios-mail"
                size={25}
                style={{color: '#db4d40', paddingRight: 10}}
              />
            </Left>
            <Body>
              <Text>hoanghuynh1998@gmail.com</Text>
            </Body>
            <Right>
              <Ionicons
                name="md-arrow-round-forward"
                size={20}
                style={{color: '#3F51B5', paddingRight: 10}}
              />
            </Right>
          </ListItem>
          <ListItem avatar onPress={() => OpenAnything.Facebook('thoisuvtv/')}>
            <Left>
              <Ionicons
                name="logo-facebook"
                size={25}
                style={{color: '#4267b2', paddingRight: 10}}
              />
            </Left>
            <Body>
              <Text>Ninja Restaurant</Text>
            </Body>
            <Right>
              <Ionicons
                name="md-arrow-round-forward"
                size={20}
                style={{color: '#3F51B5', paddingRight: 10}}
              />
            </Right>
          </ListItem>
          <ListItem
            avatar
            noBorder
            onPress={() => OpenAnything.Youtube('cjPyidkLC3s')}>
            <Left>
              <Ionicons
                name="logo-youtube"
                size={25}
                style={{color: '#ff0000', paddingRight: 10}}
              />
            </Left>
            <Body>
              <Text>Ninja Restaurant Official</Text>
            </Body>
            <Right>
              <Ionicons
                name="md-arrow-round-forward"
                size={20}
                style={{color: '#3F51B5', paddingRight: 10}}
              />
            </Right>
          </ListItem>
        </List>
      </Content>
    );
  }
}
