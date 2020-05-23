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
    };
  }

  reset = () => {
    // hidden Keyboard after click button
    Keyboard.dismiss();

    if (this.state.inputCode !== this.state.checkCode) {
      alert('Incorrect check code!');
    } else if (this.state.newPassword.length < 6) {
      alert('Passwords must be at least 6 characters!');
    } else if (this.state.newPassword !== this.state.rePassword) {
      alert('Repeat new password must match New password!');
    } else {
      try {
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
            if (json.success === true) {
              alert('Reset password successfully!');
              this.props.navigation.navigate('Home');
            } else {
              alert('Reset password fail!');
            }
          })
          .catch((error) => console.error(error));
      } catch (error) {
        alert(error);
      }
    }
  };

  sendRequest = () => {
    // hidden Keyboard after click button
    Keyboard.dismiss();

    try {
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
          if (json.success === true) {
            this.setState({
              checkCode: json.data.checkCode,
              activeResetForm: true,
            });
          } else {
            alert('Incorrect email!');
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <Container>
        <Content>
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
