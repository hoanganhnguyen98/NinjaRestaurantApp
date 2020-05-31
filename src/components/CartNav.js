import React, {Component} from 'react';
import {Container, Tabs, Tab, TabHeading, Text} from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import CurrentTab from './cart_content/CurrentTab';
import History from './cart_content/History';
import CustomHeader from './CustomHeader';
import I18n from '../i18n/i18n';

export default class CartNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      food: '',
    };
  }

  render() {
    return (
      <Container>
        <CustomHeader headerTitle={I18n.t('screen.cart.headerTitle')} />
        <Tabs>
          <Tab
            heading={
              <TabHeading>
                <FAIcon name="cart-plus" color="#ffffff" size={20} />
                <Text>{I18n.t('screen.cart.headerTitleCart')}</Text>
              </TabHeading>
            }>
            <CurrentTab />
          </Tab>

          <Tab
            heading={
              <TabHeading>
                <FAIcon name="history" color="#ffffff" size={20} />
                <Text>{I18n.t('screen.cart.headerTitleHistory')}</Text>
              </TabHeading>
            }>
            <History navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
