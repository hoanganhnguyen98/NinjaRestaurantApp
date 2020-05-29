import React, {Component} from 'react';
import {View, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {Styles, Urls} from '../common';

export default class StartScreen extends Component {
  componentDidMount = async () => {
    try {
      var userEmail = await AsyncStorage.getItem('userEmail');
      var userPassword = await AsyncStorage.getItem('userPassword');

      if (userEmail !== null && userPassword !== null) {
        fetch(Urls.APIUrl + 'login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userEmail,
            password: userPassword,
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.success === true) {
              // go to Menu screen
              this.props.navigation.navigate('BottomNavigator');
            } else {
              // incorrect email and password, redirect to Login screen
              this.props.navigation.navigate('LoginNav');
            }
          })
          .catch((error) => console.error(error));
      } else {
        // null information, go to Login screen to login
        this.props.navigation.navigate('LoginNav');
      }
    } catch (error) {
      alert(error);
    }
  };
  render() {
    return (
      <View style={Styles.startScreenBg}>
        <Image
          source={require('../assets/img/logo.jpg')}
          style={Styles.startScreen}
        />
      </View>
    );
  }
}
