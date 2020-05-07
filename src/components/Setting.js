import React, {Component} from 'react';
import {Image, AsyncStorage, View} from 'react-native';
import {Text, List, ListItem, Left, Body, Right} from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import I18n, {switchLanguage} from '../i18n/i18n';

export default class ProfileNav extends Component {
  constructor(props) {
    super(props);

    this.state = {isVi: false};
  }

  componentDidMount() {
    this.getLanguage();
  }

  getLanguage = async () => {
    try {
      // Get the language set by default from AsyncStorage
      var defaultLanguage = await AsyncStorage.getItem('defaultLanguage');

      if (defaultLanguage == 'vi') {
        this.setState({isVi: true});
      } else {
        this.setState({isVi: false});
      }
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <View>
        <Text>{I18n.t('greeting')}</Text>
        <List>
          <ListItem thumbnail noBorder>
            <Left>
              <FAIcon name="language" size={25} style={{color: '#3986ea'}} />
            </Left>
            <Body>
              <List>
                <ListItem
                  thumbnail
                  noBorder
                  onPress={() => {
                    switchLanguage('vi');
                    this.getLanguage();
                  }}>
                  <Left>
                    <Image
                      source={require('../assets/img/languages/vi.png')}
                      style={{width: 50, height: 25, borderRadius: 5}}></Image>
                  </Left>
                  <Body>
                    <Text>Tiếng Việt</Text>
                  </Body>
                  <Right>
                    {this.state.isVi ? (
                      <FAIcon
                        name="check"
                        size={20}
                        style={{color: 'green'}}></FAIcon>
                    ) : null}
                  </Right>
                </ListItem>
                <ListItem
                  thumbnail
                  noBorder
                  onPress={() => {
                    switchLanguage('en');
                    this.getLanguage();
                  }}>
                  <Left>
                    <Image
                      source={require('../assets/img/languages/en.png')}
                      style={{width: 50, height: 25, borderRadius: 5}}></Image>
                  </Left>
                  <Body>
                    <Text>English</Text>
                  </Body>
                  <Right>
                    {this.state.isVi ? null : (
                      <FAIcon
                        name="check"
                        size={20}
                        style={{color: 'green'}}></FAIcon>
                    )}
                  </Right>
                </ListItem>
              </List>
            </Body>
          </ListItem>
        </List>
      </View>
    );
  }
}
