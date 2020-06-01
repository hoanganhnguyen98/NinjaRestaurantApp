import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {Container, Content, Card, CardItem, Text, Button} from 'native-base';

import LoadingModal from '../LoadingModal';
import showMessage from '../MessagesAlert';
import {Urls} from '../../common';
import I18n from '../../i18n/i18n';
import {CustomListItemLabel, CustomListItemInput} from '../CustomListItem';

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      newPassword: '',
      rePassword: '',
      inputCode: '',
      checkCode: '',
      activeResetForm: false,
      requestIsSending: false,
    };
  }

  reset = () => {
    // hidden Keyboard after click button
    Keyboard.dismiss();

    // check if input is invalid
    if (this.state.inputCode !== this.state.checkCode) {
      showMessage(
        I18n.t('errors.password.checkCode.invalid'),
        I18n.t('errors.password.checkCode.message'),
      );
    } else if (this.state.newPassword.length < 6) {
      showMessage(
        I18n.t('errors.password.password.invalid'),
        I18n.t('errors.password.password.message'),
      );
    } else if (this.state.newPassword !== this.state.rePassword) {
      showMessage(
        I18n.t('errors.password.repassword.invalid'),
        I18n.t('errors.password.repassword.message'),
      );
    } else {
      //start loading modal while fetching
      this.setState({
        requestIsSending: true,
      });

      fetch(Urls.APIUrl + 'user/resetpassword', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          check_code: this.state.checkCode,
          new_password: this.state.newPassword,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          //end loading modal
          this.setState({
            requestIsSending: false,
          });

          if (json.success === true) {
            showMessage(
              I18n.t('success.reset.ok'),
              I18n.t('success.reset.message'),
            );

            //redirect to login
            this.props.navigation.navigate('Home');
          } else {
            showMessage(
              I18n.t('errors.reset.fail'),
              I18n.t('errors.reset.failMess'),
            );
          }
        })
        .catch((error) => console.error(error));
    }
  };

  sendRequest = () => {
    // hidden Keyboard after click button
    Keyboard.dismiss();

    // check if email is invalid
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)) {
      showMessage(
        I18n.t('errors.email.invalid'),
        I18n.t('errors.email.message'),
      );
    } else {
      //start loading modal while fetching
      this.setState({
        requestIsSending: true,
      });

      fetch(Urls.APIUrl + 'user/forgetpassword', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
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
              checkCode: json.data.checkCode,
              activeResetForm: true,
            });
          } else {
            showMessage(
              I18n.t('errors.reset.incorrectEmail'),
              I18n.t('errors.reset.incorrectEmailMess'),
            );
          }
        })
        .catch((error) => console.error(error));
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <LoadingModal requestIsSending={this.state.requestIsSending} />
          {!this.state.activeResetForm ? (
            <Card style={{marginTop: 100}}>
              <CustomListItemLabel
                iconName="envelope-o"
                label={I18n.t('screen.home.reset.enterYourEmail')}
              />
              <CustomListItemInput
                noBorder={true}
                iconName="edit"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(email) => this.setState({email})}
              />
            </Card>
          ) : (
            <Card>
              <CustomListItemLabel
                iconName="barcode"
                noBorder={true}
                label={I18n.t('screen.home.reset.checkCode')}
              />
              <CustomListItemInput
                iconName="edit"
                placeholder={I18n.t('screen.home.reset.checkCodeFromEmail')}
                onChangeText={(inputCode) => this.setState({inputCode})}
              />
              <CustomListItemLabel
                iconName="lock"
                noBorder={true}
                label={I18n.t('screen.home.reset.newPassword')}
              />
              <CustomListItemInput
                iconName="edit"
                secureTextEntry={true}
                onChangeText={(newPassword) => this.setState({newPassword})}
              />
              <CustomListItemLabel
                iconName="lock"
                noBorder={true}
                label={I18n.t('screen.home.reset.repeatNewPassword')}
              />
              <CustomListItemInput
                iconName="edit"
                noBorder={true}
                secureTextEntry={true}
                onChangeText={(rePassword) => this.setState({rePassword})}
              />
            </Card>
          )}
          <CardItem style={{alignItems: 'center', justifyContent: 'center'}}>
            {!this.state.activeResetForm ? (
              <Button rounded onPress={this.sendRequest}>
                <Text>{I18n.t('screen.home.reset.sendRequest')}</Text>
              </Button>
            ) : (
              <Button rounded onPress={this.reset}>
                <Text>{I18n.t('screen.home.reset.resetPassword')}</Text>
              </Button>
            )}
          </CardItem>
        </Content>
      </Container>
    );
  }
}
