import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';

import LoadingModal from '../LoadingModal';
import showMessage from '../MessagesAlert';
import {Urls} from '../../common';
import I18n from '../../i18n/i18n';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: '',
      address: '',
      email: '',
      password: '',
      repassword: '',
      requestIsSending: false,
    };
  }

  register = () => {
    // hidden Keyboard after click button
    Keyboard.dismiss();

    // check if input is invalid
    if (
      this.state.name === '' ||
      this.state.phone === '' ||
      this.state.address === '' ||
      this.state.email === '' ||
      this.state.password === '' ||
      this.state.repassword === ''
    ) {
      showMessage(
        I18n.t('errors.register.nullInfo'),
        I18n.t('errors.register.nullInfoMess'),
      );
    } else if (
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)
    ) {
      showMessage('Invalid email', 'Please check your email again!');
    } else if (this.state.phone.length < 10) {
      showMessage(
        I18n.t('errors.register.invalidPhone'),
        I18n.t('errors.register.invalidPhoneMess'),
      );
    } else if (this.state.password.length < 6) {
      showMessage(
        I18n.t('errors.password.password.invalid'),
        I18n.t('errors.password.password.message'),
      );
    } else if (this.state.password !== this.state.repassword) {
      showMessage(
        I18n.t('errors.password.repassword.invalid'),
        I18n.t('errors.password.repassword.message'),
      );
    } else {
      //start loading modal while fetching
      this.setState({
        requestIsSending: true,
      });

      fetch(Urls.APIUrl + 'register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          name: this.state.name,
          phone: this.state.phone,
          address: this.state.address,
          password: this.state.password,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          //end loading modal
          this.setState({
            requestIsSending: false,
          });

          if (json.success === true) {
            this.setState({
              name: '',
              phone: '',
              address: '',
              email: '',
              password: '',
              repassword: '',
            });
            // success register
            showMessage(
              I18n.t('success.register.ok'),
              I18n.t('success.register.message'),
            );

            //redirect to login
            // this.props.navigation.navigate('Home');
          } else {
            // fail
            showMessage(
              I18n.t('errors.register.fail'),
              I18n.t('errors.register.failMess'),
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
              <Label>{I18n.t('screen.home.main.fullName')}</Label>
              <Input
                value={this.state.name}
                onChangeText={(name) => this.setState({name})}
              />
            </Item>
            <Item floatingLabel>
              <Label>{I18n.t('screen.home.main.phoneNumber')}</Label>
              <Input
                value={this.state.phone}
                onChangeText={(phone) => this.setState({phone})}
                maxLength={10}
              />
            </Item>
            <Item floatingLabel>
              <Label>{I18n.t('screen.home.main.address')}</Label>
              <Input
                value={this.state.address}
                onChangeText={(address) => this.setState({address})}
              />
            </Item>
            <Item floatingLabel>
              <Label>{I18n.t('email')}</Label>
              <Input
                value={this.state.email}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(email) => this.setState({email})}
              />
            </Item>
            <Item floatingLabel>
              <Label>{I18n.t('screen.home.main.password')}</Label>
              <Input
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
              />
            </Item>
            <Item floatingLabel>
              <Label>{I18n.t('screen.home.main.repassword')}</Label>
              <Input
                value={this.state.repassword}
                secureTextEntry={true}
                onChangeText={(repassword) => this.setState({repassword})}
              />
            </Item>
          </Form>
          <Button
            rounded
            block
            primary
            onPress={this.register}
            style={{marginTop: 30}}>
            <Text>{I18n.t('screen.home.main.register')}</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
