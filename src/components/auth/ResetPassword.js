import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Left,
  Body,
  ListItem,
  Input,
} from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import LoadingModal from '../LoadingModal';
import showMessage from '../MessagesAlert';
import {Colors, Urls} from '../../common';

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
        'Incorrect check code!',
        'Check your check code in email again!',
      );
    } else if (this.state.newPassword.length < 6) {
      showMessage(
        'Invalid password!',
        'Passwords must be at least 6 characters!',
      );
    } else if (this.state.newPassword !== this.state.rePassword) {
      showMessage(
        'Incorrect re-password',
        'Repeat new password must match New password!',
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
            showMessage('Reset password successfully', 'Login now!');

            //redirect to login
            this.props.navigation.navigate('Home');
          } else {
            showMessage(
              'Reset password fail',
              'Check your information and try again!',
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
      showMessage('Invalid email', 'Please check your email again!');
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
            showMessage('Incorrect email', 'Check your email and try again!');
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
              <ListItem icon>
                <Left>
                  <Button style={{backgroundColor: '#ffffff'}}>
                    <FAIcon
                      name="envelope-o"
                      size={20}
                      style={{color: Colors.appColor}}
                    />
                  </Button>
                </Left>
                <Body>
                  <Text>Enter your email</Text>
                </Body>
              </ListItem>
              <ListItem icon noBorder>
                <Left>
                  <Button style={{backgroundColor: '#ffffff'}}>
                    <FAIcon
                      name="edit"
                      size={20}
                      style={{color: Colors.appColor}}
                    />
                  </Button>
                </Left>
                <Body>
                  <Input
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(email) => this.setState({email})}
                  />
                </Body>
              </ListItem>
            </Card>
          ) : (
            <Card>
              <ListItem icon noBorder>
                <Left>
                  <Button style={{backgroundColor: '#ffffff'}}>
                    <FAIcon
                      name="barcode"
                      size={20}
                      style={{color: Colors.appColor}}
                    />
                  </Button>
                </Left>
                <Body>
                  <Text>Check code</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button style={{backgroundColor: '#ffffff'}}>
                    <FAIcon
                      name="edit"
                      size={20}
                      style={{color: Colors.appColor}}
                    />
                  </Button>
                </Left>
                <Body>
                  <Input
                    placeholder={'check code from email'}
                    onChangeText={(inputCode) => this.setState({inputCode})}
                  />
                </Body>
              </ListItem>
              <ListItem icon noBorder>
                <Left>
                  <Button style={{backgroundColor: '#ffffff'}}>
                    <FAIcon
                      name="lock"
                      size={20}
                      style={{color: Colors.appColor}}
                    />
                  </Button>
                </Left>
                <Body>
                  <Text>New password</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button style={{backgroundColor: '#ffffff'}}>
                    <FAIcon
                      name="edit"
                      size={20}
                      style={{color: Colors.appColor}}
                    />
                  </Button>
                </Left>
                <Body>
                  <Input
                    secureTextEntry={true}
                    onChangeText={(newPassword) => this.setState({newPassword})}
                  />
                </Body>
              </ListItem>
              <ListItem icon noBorder>
                <Left>
                  <Button style={{backgroundColor: '#ffffff'}}>
                    <FAIcon
                      name="lock"
                      size={20}
                      style={{color: Colors.appColor}}
                    />
                  </Button>
                </Left>
                <Body>
                  <Text>Repeat new password</Text>
                </Body>
              </ListItem>
              <ListItem icon noBorder>
                <Left>
                  <Button style={{backgroundColor: '#ffffff'}}>
                    <FAIcon
                      name="edit"
                      size={20}
                      style={{color: Colors.appColor}}
                    />
                  </Button>
                </Left>
                <Body>
                  <Input
                    secureTextEntry={true}
                    onChangeText={(rePassword) => this.setState({rePassword})}
                  />
                </Body>
              </ListItem>
            </Card>
          )}
          <CardItem style={{alignItems: 'center', justifyContent: 'center'}}>
            {!this.state.activeResetForm ? (
              <Button rounded onPress={this.sendRequest}>
                <Text>Send request</Text>
              </Button>
            ) : (
              <Button rounded onPress={this.reset}>
                <Text>Reset password</Text>
              </Button>
            )}
          </CardItem>
        </Content>
      </Container>
    );
  }
}
