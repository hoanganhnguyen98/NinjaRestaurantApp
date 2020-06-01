import React, {Component} from 'react';
import {Content, Card, CardItem, Text, Body, Col} from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Styles, Colors} from '../../common';
import I18n from '../../i18n/i18n';

export default class Intro extends Component {
  render() {
    return (
      <Content>
        <Card>
          <CardItem header>
            <Text style={Styles.aboutus.introTitle}>
              <FAIcon name="history" size={20} />
              {I18n.t('screen.aboutUs.history')}
            </Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{I18n.t('screen.aboutUs.historyContent')}</Text>
            </Body>
          </CardItem>
          <CardItem header>
            <Text style={Styles.aboutus.introTitle}>
              <FAIcon name="user-ninja" size={20} />
              {I18n.t('screen.aboutUs.mission')}
            </Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{I18n.t('screen.aboutUs.missionContent')}</Text>
            </Body>
          </CardItem>
          <CardItem header>
            <Text style={Styles.aboutus.introTitle}>
              <FAIcon name="globe-asia" size={20} />
              {I18n.t('screen.aboutUs.coreValue')}
            </Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{I18n.t('screen.aboutUs.coreValueContent')}</Text>
            </Body>
          </CardItem>
          <CardItem
            style={{
              justifyContent: 'center',
              textAlign: 'center',
            }}>
            <Text style={{color: Colors.appColor}}>
              * * <Ionicons name={'ios-restaurant'} size={25} /> * *
            </Text>
          </CardItem>
        </Card>
      </Content>
    );
  }
}
