import React, {Component} from 'react';
import {Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  ListItem,
} from 'native-base';
import {PropTypes} from 'prop-types';
import ActionSheet from 'react-native-actionsheet';
import RNRestart from 'react-native-restart';

import CustomHeader from './CustomHeader';
import I18n, {setLanguage} from '../i18n/i18n';
import CustomConfirmModal from './CustomConfirmModal';
import {CustomListItemLabel} from '../components/CustomListItem';

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
      isChangeLanguage: false,
      selectedLanguage: null,
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
      this.setState({
        selectedLanguage: 'vi',
        isChangeLanguage: !this.state.isChangeLanguage,
      });
    } else if (index === 1) {
      this.setState({
        selectedLanguage: 'en',
        isChangeLanguage: !this.state.isChangeLanguage,
      });
    }
  };

  changeLanguage = () => {
    AsyncStorage.setItem('defaultLanguage', this.state.selectedLanguage);
    setLanguage(this.state.selectedLanguage);

    // restart app
    RNRestart.Restart();
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
          {/* Image and email */}
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

        {/* Main content */}
        <Content>
          <ListItem icon itemDivider noBorder>
            <Left />
            <Body>
              <Text>{I18n.t('screen.profile.personalInformation')}</Text>
            </Body>
          </ListItem>
          <CustomListItemLabel
            iconName="phone"
            label={
              this.props.navigation.getParam('savePhone') === undefined
                ? this.state.phone
                : this.props.navigation.getParam('savePhone')
            }
          />
          <CustomListItemLabel
            noBorder={true}
            iconName="home"
            label={
              this.props.navigation.getParam('saveAddress') === undefined
                ? this.state.address
                : this.props.navigation.getParam('saveAddress')
            }
          />

          {/* End of information */}
          {/* Start of function */}

          <ListItem icon itemDivider noBorder>
            <Left />
            <Body>
              <Text>{I18n.t('screen.profile.settings')}</Text>
            </Body>
          </ListItem>
          <CustomListItemLabel
            onPress={() => this.showActionSheet()}
            iconName="language"
            label={I18n.t('screen.profile.selectLanguages')}
          />
          <CustomListItemLabel
            onPress={() =>
              this.props.navigation.navigate('ChangeInfo', {
                changeImage: this.state.image,
                changeName: this.state.name,
                changeEmail: this.state.email,
                changePhone: this.state.phone,
                changeAddress: this.state.address,
              })
            }
            iconName="edit"
            label={I18n.t('screen.profile.changeInformation')}
          />
          <CustomListItemLabel
            onPress={() =>
              this.props.navigation.navigate('ChangePassword', {
                changeId: this.state.id,
                changePassword: this.state.password,
                changeEmail: this.state.email,
              })
            }
            iconName="lock"
            label={I18n.t('screen.profile.changePassword')}
          />

          {/* Logout */}
          <ListItem icon itemDivider noBorder />
          <CustomListItemLabel
            noBorder={true}
            onPress={() => this.toggleModal()}
            iconName="sign-out"
            label={I18n.t('screen.profile.logout')}
          />
        </Content>

        {/* Modal Logout */}
        <CustomConfirmModal
          isModalVisible={this.state.isModalVisible}
          message={I18n.t('screen.profile.wantLogout')}
          actionName={I18n.t('screen.profile.logout')}
          onPressMainAction={this.logout}
          onPressToggleModal={this.toggleModal}
        />

        {/* Modal select language */}
        <CustomConfirmModal
          isModalVisible={this.state.isChangeLanguage}
          message={I18n.t('screen.profile.selectLanguagesMess')}
          actionName={I18n.t('screen.profile.restart')}
          onPressMainAction={this.changeLanguage}
          onPressToggleModal={() =>
            this.setState({isChangeLanguage: !this.state.isChangeLanguage})
          }
        />

        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={I18n.t('screen.profile.selectLanguages')}
          options={[
            <Image
              source={require('../assets/img/vi.png')}
              style={{height: 30, width: 60}}
            />,
            <Image
              source={require('../assets/img/en.png')}
              style={{height: 30, width: 60}}
            />,
            <Text style={{color: 'red'}}>{I18n.t('cancel')}</Text>,
          ]}
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
