import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Card, CardItem, Text, Tab, Tabs, TabHeading, Header, Left, Button, Body, Right, Title } from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import Intro from './aboutus_content/Intro';
import Branch from './aboutus_content/Branch';
import Contact from './aboutus_content/Contact';

import { Styles, Urls } from '../common';

export default class AboutUsNav extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Image
                                source={require('../assets/img/logo.jpg')}
                                style={Styles.logo} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Ninja Restaurant</Title>
                    </Body>
                    <Right />
                </Header>
                <Card>
                    <CardItem cardBody>
                        <Image
                            source={{uri: Urls.ImgUrl+'v1575386543/ninja_restaurant/slide/ifkqebzevigjn76kyllw.jpg'}}
                            style={Styles.aboutus.coverImage}
                        />
                    </CardItem>
                </Card>
                <Tabs>
                    <Tab heading={ <TabHeading><Text>Intro</Text></TabHeading>}>
                        <Intro />
                    </Tab>
                    <Tab heading={ <TabHeading><Text>Branch</Text></TabHeading>}>
                        <Branch />
                    </Tab>
                    <Tab heading={ <TabHeading><Text>Contact</Text></TabHeading>}>
                        <Contact />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}