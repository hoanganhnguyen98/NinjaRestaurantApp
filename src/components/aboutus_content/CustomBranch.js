import React, {Component} from 'react';
import {View} from 'react-native';
import {ListItem, Thumbnail, Text, Right, Body} from 'native-base';
import {PropTypes} from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as OpenAnything from 'react-native-openanything';
import * as Animatable from 'react-native-animatable';

import {Styles} from '../../common';
import I18n from '../../i18n/i18n';

export default class CustomBranch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
      address: '',
      phone: '',
    };
  }

  render() {
    return (
      <View>
        <ListItem>
          <Body>
            <Thumbnail
              square
              source={{
                uri:
                  'https://res.cloudinary.com/ninjahh/image/upload/' +
                  this.props.image,
              }}
              style={Styles.aboutus.addressImage}
            />
          </Body>
        </ListItem>
        <ListItem onPress={() => OpenAnything.Map(this.props.address)}>
          <Body>
            <Text>{this.props.address}</Text>
          </Body>
          <Right style={Styles.aboutus.iconBorder}>
            <Animatable.Text
              animation="rotate"
              iterationCount="infinite"
              direction="alternate">
              <Ionicons name="ios-navigate" size={25} style={{color: 'red'}} />
            </Animatable.Text>
            <Text note>{I18n.t('screen.aboutUs.map')}</Text>
          </Right>
        </ListItem>
        <ListItem
          style={Styles.aboutus.branchBorder}
          onPress={() => OpenAnything.Call(this.props.phone)}>
          <Body>
            <Text>{this.props.phone}</Text>
          </Body>
          <Right style={Styles.aboutus.iconBorder}>
            <Animatable.Text
              animation="flash"
              iterationCount="infinite"
              direction="alternate">
              <Ionicons name="md-call" size={25} style={{color: 'green'}} />
            </Animatable.Text>
            <Text note>{I18n.t('screen.aboutUs.call')}</Text>
          </Right>
        </ListItem>
      </View>
    );
  }
}

// parameter is require outside
CustomBranch.propTypes = {
  image: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
