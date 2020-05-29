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
      showMessage('Null information', 'Please fill all information!');
    } else if (
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)
    ) {
      showMessage('Invalid email', 'Please check your email again!');
    } else if (this.state.phone.length < 10) {
      showMessage('Invalid phone number', 'Phone must be 10 numbers!');
    } else if (this.state.password.length < 6) {
      showMessage(
        'Invalid password',
        'Passwords must be at least 6 characters!',
      );
    } else if (this.state.password !== this.state.repassword) {
      showMessage('Incorrect re-password', 'Re-Password must match Password!');
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
            // success register
            showMessage('Register successfully', 'Login now!');

            //redirect to login
            this.props.navigation.navigate('Home');
          } else {
            // fail
            showMessage(
              'Register fail',
              'Please check your information and try again!',
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
              <Label>Full Name</Label>
              <Input onChangeText={(name) => this.setState({name})} />
            </Item>
            <Item floatingLabel>
              <Label>Phone number</Label>
              <Input
                onChangeText={(phone) => this.setState({phone})}
                maxLength={10}
              />
            </Item>
            <Item floatingLabel>
              <Label>Address</Label>
              <Input onChangeText={(address) => this.setState({address})} />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(email) => this.setState({email})}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
              />
            </Item>
            <Item floatingLabel>
              <Label>Re-Password</Label>
              <Input
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
            <Text>Resigter</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
