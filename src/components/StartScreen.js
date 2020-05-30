import React, {Component} from 'react';
import {View, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {getLanguages} from 'react-native-i18n';

import {Styles, Urls} from '../common';
import NetworkModal from './NetworkModal';
import {backButton, handleAndroidBackButton} from './BackButton';
import {setLanguage} from '../i18n/i18n';

export default class StartScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disconnectedNetwork: false,
    };
  }

  componentDidMount = async () => {
    // handle if user click mobile Back button
    handleAndroidBackButton(backButton);

    // Get exist language if it had stored
    var defaultLanguage = await AsyncStorage.getItem('defaultLanguage');

    // if exist defaultLanguage, set it for locale in I18n
    // if not defaultLanguage, get local device languages
    if (defaultLanguage !== null) {
      console.log(defaultLanguage);
      setLanguage(defaultLanguage);
    } else {
      getLanguages().then((languages) => {
        if (languages == 'vi-VN') {
          console.log('vn');
          AsyncStorage.setItem('defaultLanguage', 'vi');
          setLanguage('vn');
        } else {
          console.log('en');
          AsyncStorage.setItem('defaultLanguage', 'en');
          setLanguage('en');
        }
      });
    }

    var userEmail = await AsyncStorage.getItem('userEmail');
    var userPassword = await AsyncStorage.getItem('userPassword');

    NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        // display modal to notify disconnected network
        this.setState({disconnectedNetwork: true});
      } else {
        // hidden modal when network is connected again
        this.setState({disconnectedNetwork: false});

        // check to direct
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
      }
    });
  };

  render() {
    return (
      <View style={Styles.startScreenBg}>
        <NetworkModal disconnectedNetwork={this.state.disconnectedNetwork} />
        <Image
          source={require('../assets/img/logo.jpg')}
          style={Styles.startScreen}
        />
      </View>
    );
  }
}
