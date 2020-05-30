import React, {Component} from 'react';
import {Container, Tabs, Tab, TabHeading, Text} from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import CurrentTab from './cart_content/CurrentTab';
import History from './cart_content/History';
import CustomHeader from './CustomHeader';
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
        <CustomHeader headerTitle="Cart" />
        <Tabs>
          <Tab
            heading={
              <TabHeading>
                <FAIcon name="cart-plus" color="#ffffff" size={20} />
                <Text>Cart</Text>
              </TabHeading>
            }>
            <CurrentTab />
          </Tab>

          <Tab
            heading={
              <TabHeading>
                <FAIcon name="history" color="#ffffff" size={20} />
                <Text>History</Text>
              </TabHeading>
            }>
            <History navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
