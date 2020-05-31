import React, {Component} from 'react';
import {View, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  ListItem,
} from 'native-base';
import Modal from 'react-native-modal';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PropTypes} from 'prop-types';
import ActionSheet from 'react-native-actionsheet';
import RNRestart from 'react-native-restart';

import CustomHeader from './CustomHeader';
import {Colors} from '../common';
import I18n, {setLanguage} from '../i18n/i18n';

const options = [
  <Image
    source={require('../assets/img/vi.png')}
    style={{height: 30, width: 60}}
  />,
  <Image
    source={require('../assets/img/en.png')}
    style={{height: 30, width: 60}}
  />,
  <Text style={{color: 'red'}}>{I18n.t('cancel')}</Text>,
];

export default class ProfileNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      email: '',
      image: '',
      phone: '',
      address: '',
      password: '',
      locale: '',
      isModalVisible: false,
    };
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  logout = async () => {
    // this.toggleModal;

    try {
      let keys = [
        'userName',
        'userEmail',
        'userPassword',
        'userImage',
        'UserPhone',
        'userAddress',
      ];
      await AsyncStorage.multiRemove(keys);

      // back to Login screen
      this.props.navigation.navigate('Home');
    } catch (error) {
      alert(error);
    }
  };

  selectLanguage = (index) => {
    if (index === 0) {
      AsyncStorage.setItem('defaultLanguage', 'vi');
      setLanguage('vi');

      // restart app
      RNRestart.Restart();
    } else if (index === 1) {
      AsyncStorage.setItem('defaultLanguage', 'en');
      setLanguage('en');

      // restart app
      RNRestart.Restart();
    }
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  componentDidMount = async () => {
    try {
      this.setState({
        id: await AsyncStorage.getItem('userId'),
        name: await AsyncStorage.getItem('userName'),
        email: await AsyncStorage.getItem('userEmail'),
        image: await AsyncStorage.getItem('userImage'),
        phone: await AsyncStorage.getItem('userPhone'),
        address: await AsyncStorage.getItem('userAddress'),
        password: await AsyncStorage.getItem('userPassword'),
        locale: await AsyncStorage.getItem('defaultLanguage'),
      });
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <Container>
        <CustomHeader headerTitle={I18n.t('screen.profile.headerTitle')} />
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: this.state.image}} />
              <Body>
                <Text>
                  {this.props.navigation.getParam('saveName') === undefined
                    ? this.state.name
                    : this.props.navigation.getParam('saveName')}
                </Text>
                <Text note>{this.state.email}</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
        <Content>
          <ListItem icon itemDivider noBorder>
            <Left />
            <Body>
              <Text>{I18n.t('screen.profile.personalInformation')}</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{backgroundColor: '#ffffff'}}>
                <FAIcon
                  name="phone"
                  size={20}
                  style={{color: Colors.appColor}}
                />
              </Button>
            </Left>
            <Body>
              <Text>
                {this.props.navigation.getParam('savePhone') === undefined
                  ? this.state.phone
                  : this.props.navigation.getParam('savePhone')}
              </Text>
            </Body>
          </ListItem>
          <ListItem icon noBorder>
            <Left>
              <Button style={{backgroundColor: '#ffffff'}}>
                <FAIcon
                  name="home"
                  size={20}
                  style={{color: Colors.appColor}}
                />
              </Button>
            </Left>
            <Body>
              <Text>
                {this.props.navigation.getParam('saveAddress') === undefined
                  ? this.state.address
                  : this.props.navigation.getParam('saveAddress')}
              </Text>
            </Body>
          </ListItem>

          {/* End of information */}
          {/* Start of function */}

          <ListItem icon itemDivider noBorder>
            <Left />
            <Body>
              <Text>{I18n.t('screen.profile.settings')}</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={() => this.showActionSheet()}>
            <Left>
              <Button style={{backgroundColor: '#ffffff'}}>
                <FAIcon
                  name="language"
                  size={20}
                  style={{color: Colors.appColor}}
                />
              </Button>
            </Left>
            <Body>
              <Text>{I18n.t('screen.profile.selectLanguages')}</Text>
            </Body>
          </ListItem>
          <ListItem
            icon
            onPress={() =>
              this.props.navigation.navigate('ChangeInfo', {
                changeImage: this.state.image,
                changeName: this.state.name,
                changeEmail: this.state.email,
                changePhone: this.state.phone,
                changeAddress: this.state.address,
              })
            }>
            <Left>
              <Button style={{backgroundColor: '#ffffff'}}>
                <FAIcon
                  name="edit"
                  size={20}
                  style={{color: Colors.appColor}}
                />
              </Button>
            </Left>
            <Body>
              <Text>{I18n.t('screen.profile.changeInformation')}</Text>
            </Body>
          </ListItem>
          <ListItem
            icon
            noBorder
            onPress={() =>
              this.props.navigation.navigate('ChangePassword', {
                changeId: this.state.id,
                changePassword: this.state.password,
                changeEmail: this.state.email,
              })
            }>
            <Left>
              <Button style={{backgroundColor: '#ffffff'}}>
                <Ionicons
                  name="md-key"
                  size={20}
                  style={{color: Colors.appColor}}
                />
              </Button>
            </Left>
            <Body>
              <Text>{I18n.t('screen.profile.changePassword')}</Text>
            </Body>
          </ListItem>

          {/* Logout */}
          <ListItem icon itemDivider noBorder />
          <ListItem icon noBorder onPress={() => this.toggleModal()}>
            <Left>
              <Button style={{backgroundColor: '#ffffff'}}>
                <FAIcon
                  name="sign-out"
                  size={20}
                  style={{color: Colors.appColor}}
                />
              </Button>
            </Left>
            <Body>
              <Text>{I18n.t('screen.profile.logout')}</Text>
            </Body>
          </ListItem>
        </Content>

        {/* Modal Logout */}
        <View>
          <Modal isVisible={this.state.isModalVisible}>
            <View style={{backgroundColor: '#ffffff', padding: 30}}>
              <Button transparent block>
                <Text>{I18n.t('screen.profile.wantLogout')}</Text>
              </Button>
              <CardItem>
                <Left>
                  <Button block rounded danger onPress={this.toggleModal}>
                    <Text>{I18n.t('cancel')}</Text>
                  </Button>
                </Left>
                <Body>
                  <Button block rounded onPress={this.logout}>
                    <Text>{I18n.t('screen.profile.logout')}</Text>
                  </Button>
                </Body>
              </CardItem>
            </View>
          </Modal>
        </View>

        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={I18n.t('screen.profile.selectLanguages')}
          options={options}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index) => {
            this.selectLanguage(index);
          }}
        />
      </Container>
    );
  }
}

ProfileNav.propTypes = {
  saveName: PropTypes.string,
  savePhone: PropTypes.string,
  saveAddress: PropTypes.string,
};
