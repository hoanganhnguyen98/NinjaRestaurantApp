import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Body, Content, Form, Item, Input, Button, Label, Text } from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import { PropTypes } from 'prop-types';

import { Urls } from '../../common';

export default class Login extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            email: '',
            password: '',
            navigation: ''
        }
    }

    componentDidMount = async() =>
    {
        try {
            var userEmail = await AsyncStorage.getItem('userEmail');
            var userPassword = await AsyncStorage.getItem('userPassword');

            if (userEmail !== null && userPassword !== null) {
                this.props.navigation.navigate('BottomNavigator');
            }
        } catch (error) {
            alert(error);
        }
    }
            
    

    Login = () =>
    {
        fetch(Urls.APIUrl+'login',{
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password
            })
        })
        .then((response) => response.json())
        .then((json)=>{
            if (json.success === true) {
                AsyncStorage.setItem('userId', json.data.user_id);
                AsyncStorage.setItem('userEmail', this.state.email);
                AsyncStorage.setItem('userPassword', this.state.password);
                AsyncStorage.setItem('userName', json.data.name);
                AsyncStorage.setItem('userImage', json.data.image);
                AsyncStorage.setItem('userPhone', json.data.phone);
                AsyncStorage.setItem('userAddress', json.data.address);
                this.props.navigation.navigate('BottomNavigator');
            } else {
                alert('Login fail');
            }
        })
        .catch((error) => console.error(error));
    }

    render() {
        return (
            <Container>
                <Content style={{padding: 10}}>
                    <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input keyboardType='email-address' onChangeText={email=>this.setState({email})} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input secureTextEntry={true} onChangeText={password=>this.setState({password})} />
                    </Item>
                    </Form>
                    <View>
                        <Button rounded block primary style={{marginTop: 30}} onPress={this.Login}>
                            <Text>Login</Text>
                        </Button>
                        <Button rounded block primary style={{marginTop: 50}} onPress={this.Login}>
                            <Text><FAIcon name='facebook-official' size={20} />  Login with facebook</Text>
                        </Button>
                        <Button transparent block style={{marginTop: 50}} onPress={()=>this.props.navigation.navigate('ResetPassword')}>
                            <Text>Forget password <FAIcon name='question' size={20} /></Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

Login.propTypes = {
    navigation: PropTypes.string.isRequired
  };