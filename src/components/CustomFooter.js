import React, { Component } from 'react';
import { Footer, FooterTab, Text, Button, Icon} from 'native-base';

export default class CustomFooter extends Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button vertical>
            <Icon name="menu" />
            <Text>Menu</Text>
          </Button>
          <Button vertical>
            <Icon name="search" />
            <Text>Search</Text>
          </Button>
          <Button vertical>
            <Icon name="paper" />
            <Text>News</Text>
          </Button>
          <Button vertical>
            <Icon name="restaurant" />
            <Text>About us</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
