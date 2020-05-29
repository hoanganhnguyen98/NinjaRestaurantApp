import React, {Component} from 'react';
import {Container, Tab, Tabs, TabHeading, Text} from 'native-base';

import LoginTab from './Login';
import RegisterTab from './Register';
import CustomHeader from '../CustomHeader';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <CustomHeader />
        <Tabs>
          <Tab
            heading={
              <TabHeading>
                <Text>Login</Text>
              </TabHeading>
            }>
            <LoginTab navigation={this.props.navigation} />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Register</Text>
              </TabHeading>
            }>
            <RegisterTab />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
