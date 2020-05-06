import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Button, Body, Tabs, Tab, TabHeading, Left, Right, Title } from 'native-base';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import CurrentTab from './cart_content/CurrentTab';
import History from './cart_content/History';
import { Styles } from '../common';

export default class CartNav extends Component
{
    constructor(props)
    {
        super(props);

        this.state={
            food :''
        };
    }

    Search=()=>{
        var food = this.state.food;

        alert(food);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Image source={require('../assets/img/logo.jpg')} style={Styles.logo} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Ninja Restaurant</Title>
                    </Body>
                    <Right />
                </Header>
                <Tabs>
                    <Tab heading={ <TabHeading><FAIcon name="cart-plus" color='#ffffff' size={20} /></TabHeading>}>
                        <CurrentTab />
                    </Tab>
                    <Tab heading={ <TabHeading><FAIcon name="history" color='#ffffff' size={20} /></TabHeading>}>
                        <History navigation={this.props.navigation} />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}