import React, { Component } from 'react';
import { Container, Icon, Content, Text, Button, Form, Item, Input, Label } from 'native-base';

import { Urls } from '../../common';

export default class Register extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            name: '',
            phone: '',
            address: '',
            email: '',
            password: '',
            repassword: '',
        };

    }

    register = () =>
    {
        if (this.state.name === '' || this.state.phone === '' || this.state.address === ''
        || this.state.email === '' || this.state.password === '' || this.state.repassword === '') {
            alert('Please fill all information!');
        }
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)) {
            alert('Invalid email!');
        }
        if (this.state.phone.length < 10) {
            alert('Phone must be 10 numbers!');
        }
        if (this.state.password.length < 6) {
            alert('Passwords must be at least 6 characters!');
        }
        if (this.state.password !== this.state.repassword) {
            alert('Re-Password must match Password!');
        }
        fetch(Urls.APIUrl+'register',{
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.email,
                "name": this.state.name,
                "phone": this.state.phone,
                "address": this.state.address,
                "password": this.state.password
            })
        })
        .then((response) => response.json())
        .then((json)=>{
            if (json.success === true) {
                alert('Register successfully, login now');
                this.props.navigation.navigate('Home');
            } else {
                alert('Register fail! Please try again!');
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
                            <Label>Full Name</Label>
                            <Input onChangeText={name=>this.setState({name})} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Phone number</Label>
                            <Input onChangeText={phone=>this.setState({phone})} maxLength={10} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Address</Label>
                            <Input onChangeText={address=>this.setState({address})} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input keyboardType='email-address' onChangeText={email=>this.setState({email})} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input secureTextEntry={true} onChangeText={password=>this.setState({password})} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Re-Password</Label>
                            <Input secureTextEntry={true} onChangeText={repassword=>this.setState({repassword})} />
                        </Item>
                    </Form>
                    <Button rounded block primary onPress={this.register} style={{marginTop: 30}}>
                        <Text>Resigter</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}