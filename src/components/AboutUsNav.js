import React, {Component} from 'react';
import {Image} from 'react-native';
import {
  Container,
  Card,
  CardItem,
  Text,
  Tab,
  Tabs,
  TabHeading,
} from 'native-base';

import Intro from './aboutus_content/Intro';
import Branch from './aboutus_content/Branch';
import Contact from './aboutus_content/Contact';
import CustomHeader from './CustomHeader';
import {Styles, Urls} from '../common';
import I18n from '../i18n/i18n';

export default class AboutUsNav extends Component {
  render() {
    return (
      <Container>
        <CustomHeader headerTitle={I18n.t('restaurantName')} />
        <Card>
          <CardItem cardBody>
            <Image
              source={{
                uri:
                  Urls.ImgUrl +
                  'v1575386543/ninja_restaurant/slide/ifkqebzevigjn76kyllw.jpg',
              }}
              style={Styles.aboutus.coverImage}
            />
          </CardItem>
        </Card>
        <Tabs>
          <Tab
            heading={
              <TabHeading>
                <Text>{I18n.t('screen.aboutUs.intro')}</Text>
              </TabHeading>
            }>
            <Intro />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>{I18n.t('screen.aboutUs.branch')}</Text>
              </TabHeading>
            }>
            <Branch />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>{I18n.t('screen.aboutUs.contact')}</Text>
              </TabHeading>
            }>
            <Contact />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
