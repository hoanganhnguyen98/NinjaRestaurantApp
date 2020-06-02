import React, {Component} from 'react';
import {View, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Label,
  Text,
} from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {PropTypes} from 'prop-types';

import LoadingModal from '../LoadingModal';
import showMessage from '../MessagesAlert';
import {Urls} from '../../common';
import I18n from '../../i18n/i18n';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      navigation: '',
      requestIsSending: false,
    };
  }

  Login = () => {
    // hidden Keyboard after click button
    Keyboard.dismiss();

    // check if input is invalid
    if (this.state.email === '' || this.state.password === '') {
      showMessage(
        I18n.t('errors.login.nullInput'),
        I18n.t('errors.login.nullInputMess'),
      );
    } else if (
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)
    ) {
      showMessage(
        I18n.t('errors.email.invalid'),
        I18n.t('errors.email.message'),
      );
    } else {
      //start loading modal while fetching
      this.setState({
        requestIsSending: true,
      });

      fetch(Urls.APIUrl + 'login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          //end loading modal
          console.log('Tracking ...');
          this.setState({
            requestIsSending: false,
          });

          if (json.success === true) {
            //store user data to local mobile
            AsyncStorage.setItem('userId', json.data.user_id);
            AsyncStorage.setItem('userEmail', this.state.email);
            AsyncStorage.setItem('userPassword', this.state.password);
            AsyncStorage.setItem('userName', json.data.name);
            AsyncStorage.setItem('userImage', json.data.image);
            AsyncStorage.setItem('userPhone', json.data.phone);
            AsyncStorage.setItem('userAddress', json.data.address);

            //redirect to Menu tab
            this.props.navigation.navigate('BottomNavigator');
          } else {
            showMessage(
              I18n.t('errors.login.fail'),
              I18n.t('errors.login.failMess'),
            );
          }
        })
        .catch((error) => console.error(error));
    }
  };

  render() {
    return (
      <Container>
        <Content style={{padding: 10}}>
          <LoadingModal requestIsSending={this.state.requestIsSending} />
          <Form>
            <Item floatingLabel>
              <Label>{I18n.t('email')}</Label>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(email) => this.setState({email})}
              />
            </Item>
            <Item floatingLabel>
              <Label>{I18n.t('screen.home.main.password')}</Label>
              <Input
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
              />
            </Item>
          </Form>
          <View>
            <Button
              rounded
              block
              primary
              style={{marginTop: 30}}
              onPress={this.Login}>
              <Text>{I18n.t('screen.home.main.login')}</Text>
            </Button>
            <Button
              transparent
              bordered
              rounded
              block
              style={{
                marginTop: 80,
              }}
              onPress={() => this.props.navigation.navigate('ResetPassword')}>
              <Text>
                {I18n.t('screen.home.main.forgetPassword')}
                <FAIcon name="question" size={20} />
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.string.isRequired,
};
