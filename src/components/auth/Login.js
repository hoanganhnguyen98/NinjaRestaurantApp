import React, {Component} from 'react';
import {View, Keyboard, Alert} from 'react-native';
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
import Modal from 'react-native-modal';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {PropTypes} from 'prop-types';

import LoadingModal from '../../LoadingModal';
import {Urls} from '../../common';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      navigation: '',
      isLoading: false,
    };
  }

  Login = () => {
    // hidden Keyboard after click button
    Keyboard.dismiss();

    //start loading modal while fetching
    this.setState({
      isLoading: true,
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
        this.setState({
          isLoading: false,
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
          Alert.alert(
            'Login fail',
            'Please check your email and password again!',
            [
              {
                text: 'OK',
                onPress: () => null,
                style: 'cancel',
              },
            ],
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
          </Form>
          <View>
            <Button
              rounded
              block
              primary
              style={{marginTop: 30}}
              onPress={this.Login}>
              <Text>Login</Text>
            </Button>
            <Button
              transparent
              block
              style={{marginTop: 50}}
              onPress={() => this.props.navigation.navigate('ResetPassword')}>
              <Text>
                Forget password <FAIcon name="question" size={20} />
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
