import React, { Component } from 'react';
import { Container, Header, Footer, Tab, Tabs, TabHeading, Icon, Text, Content } from 'native-base';

import LoginTab from './Login';
import RegisterTab from './Register';

export default class Home extends Component {
    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header />
                <Tabs>
                    <Tab heading={<TabHeading><Text>Login</Text></TabHeading>}>
                        <LoginTab navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading={<TabHeading><Text>Register</Text></TabHeading>}>
                        <RegisterTab />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}