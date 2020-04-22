import React, { Component } from 'react';
import { View } from 'react-native';
import {Content, Card, CardItem, Text, Body } from 'native-base';
export default class Intro extends Component {
  render() {
    return (
      <Content>
        <Card>
          <CardItem header>
            <Text>History</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                After 10 years of establishment and development, the restaurant has more branches in Hanoi, Ho Chi Minh and also in Kawasaki province in Japan, while expanding the scale of restaurants, improving the quality of the staff. Ninja Restaurant is pleased to have the famous detective Sherlock Holmes to open at the Kawasaki Japan branch.
              </Text>
            </Body>
          </CardItem>
          <CardItem header>
            <Text>Mission</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
              With a passion for creativity and dedication, our mission is to bring customers the most amazing and novel experience in the style of Japanese Ninjas.
              </Text>
            </Body>
          </CardItem>
          <CardItem header>
            <Text>Core Value</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                Together with our customers, we aim to expand our branches globally, as well as to bring more culinary experiences to regions around the world.
              </Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    );
  }
}