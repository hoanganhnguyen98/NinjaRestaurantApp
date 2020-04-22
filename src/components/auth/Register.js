import React, { Component } from 'react';
import { Container, Header, Title, Left, Body, Right, Content, Text, Button, Form, Item, Input, Label } from 'native-base';

export default class Register extends Component {
    constructor(props)
    {
        super(props);
        this.state={email:'',password:'',repassword:''};

    }

    getLogin=()=>
    {
        var email =  this.state.email;
        var password = this.state.password;

        alert(email+password);
    }

    render() {
        return (
            <Container>
                <Content style={{padding: 10}}>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input onChangeText={Email=>this.setState({Email})} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input secureTextEntry={true} onChangeText={password=>this.setState({password})} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Re-Password</Label>
                            <Input secureTextEntry={true} onChangeText={password=>this.setState({repassword})} />
                        </Item>
                    </Form>
                    <Button rounded block primary onPress={this.getLogin} style={{marginTop: 30}}>
                        <Text>Resigter</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}