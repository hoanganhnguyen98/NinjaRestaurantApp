import React, {Component} from 'react';
import {Keyboard, Alert} from 'react-native';
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

import LoadingModal from '../../LoadingModal';
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
      isLoading: false,
    };
  }

  showMessage = (notify, message) => {
    Alert.alert(notify, message, [
      {
        text: 'OK',
        onPress: () => null,
        style: 'cancel',
      },
    ]);
  };

  validateInput = () => {
    if (
      this.state.name === '' ||
      this.state.phone === '' ||
      this.state.address === '' ||
      this.state.email === '' ||
      this.state.password === '' ||
      this.state.repassword === ''
    ) {
      this.showMessage('Null information', 'Please fill all information!');
    }
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)) {
      this.showMessage('Invalid email', 'Please check your email again!');
    }
    if (this.state.phone.length < 10) {
      this.showMessage('Invalid phone number', 'Phone must be 10 numbers!');
    }
    if (this.state.password.length < 6) {
      this.showMessage(
        'Invalid password',
        'Passwords must be at least 6 characters!',
      );
    }
    if (this.state.password !== this.state.repassword) {
      this.showMessage(
        'Incorrect re-password',
        'Re-Password must match Password!',
      );
    }
  };

  register = () => {
    // hidden Keyboard after click button
    Keyboard.dismiss();

    //start loading modal while fetching
    this.setState({
      isLoading: true,
    });

    // check if input is invalid
    this.validateInput;

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
          isLoading: true,
        });

        if (json.success === true) {
          // success register
          this.showMessage('Register successfully', 'Login now!');

          //redirect to login
          this.props.navigation.navigate('Home');
        } else {
          // fail
          this.showMessage(
            'Register fail',
            'Please check your information and try again!',
          );
        }
      })
      .catch((error) => console.error(error));
  };

  render() {
    return (
      <Container>
        <Content style={{padding: 10}}>
          <LoadingModal isLoading={this.state.isLoading} />
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
