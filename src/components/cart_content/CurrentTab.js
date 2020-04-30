import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

export default class ListThumbnailExample extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem thumbnail>
                            <Left />
                            <Body>
                                <Text>Name</Text>
                                <Text note numberOfLines={1}>Price</Text>
                            </Body>
                            <Right>
                                <Button transparent>
                                    <Text>Number</Text>
                                </Button>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}