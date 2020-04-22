import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text, Content, Body } from 'native-base';

import CustomHeader from './CustomHeader';

export default class SearchNav extends Component
{
    constructor(props)
    {
        super(props);

        this.state={food:''};
    }

    Search=()=>{
        var food = this.state.food;

        alert(food);
    }

    render() {
        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="search" />
                        <Input placeholder="Search" onChangeText={food=>this.setState({food})} />
                        <Button onPress={this.Search}><Icon name="search" /></Button>
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <Body>

                </Body>
            </Container>
        );
    }
}