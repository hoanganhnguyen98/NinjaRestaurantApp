import React, {Component} from 'react';
import {Container, Tab, Tabs, TabHeading, Text} from 'native-base';

import LoginTab from './Login';
import RegisterTab from './Register';
import CustomHeader from '../CustomHeader';
import I18n from '../../i18n/i18n';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <CustomHeader headerTitle={I18n.t('restaurantName')} />
        <Tabs>
          <Tab
            heading={
              <TabHeading>
                <Text>{I18n.t('screen.home.main.login')}</Text>
              </TabHeading>
            }>
            <LoginTab navigation={this.props.navigation} />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>{I18n.t('screen.home.main.register')}</Text>
              </TabHeading>
            }>
            <RegisterTab />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
