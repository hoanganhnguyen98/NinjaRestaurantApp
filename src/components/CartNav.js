import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text, Content, Body, Tabs, Tab, TabHeading } from 'native-base';

import FAIcon from 'react-native-vector-icons/FontAwesome';

export default class SearchNav extends Component
{
    constructor(props)
    {
        super(props);

        this.state={
            food:''
        };
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
                <Tabs>
                    <Tab heading={ <TabHeading><FAIcon name="cart-plus" color='#ffffff' size={20} /></TabHeading>}>
                    </Tab>
                    <Tab heading={ <TabHeading><FAIcon name="history" color='#ffffff' size={20} /></TabHeading>}>
                    </Tab>
                    <Tab heading={ <TabHeading><FAIcon name="heart" color='#ffffff' size={20} /></TabHeading>}>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}