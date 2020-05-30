import React, {Component} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Left,
  Body,
  ListItem,
  Input,
} from 'native-base';
import Modal from 'react-native-modal';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import LoadingModal from '../LoadingModal';
import showMessage from '../MessagesAlert';
import {Colors, Urls} from '../../common';
import I18n from '../../i18n/i18n';

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      newPassword: '',
      rePassword: '',
      isModalVisible: false,
      requestIsSending: false,
    };
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  check = () => {
    if (
      this.state.oldPassword !==
      this.props.navigation.getParam('changePassword')
    ) {
      showMessage('Old password is incorrect!', 'Try again!');
    } else if (this.state.newPassword.length < 6) {
      showMessage('Passwords must be at least 6 characters!', 'Try again!');
    } else if (this.state.newPassword !== this.state.rePassword) {
      showMessage('Repeat new password must match New password!', 'Try again!');
    } else {
      this.toggleModal();
    }
  };

  logout = async () => {
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
      this.props.navigation.navigate('Home');
    } catch (error) {
      alert(error);
    }
  };

  change = async () => {
    this.toggleModal();

    try {
      //start loading modal while fetching
      this.setState({
        requestIsSending: true,
      });

      fetch(Urls.APIUrl + 'user/changepassword', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: this.props.navigation.getParam('changeId'),
          old_password: this.state.oldPassword,
          new_password: this.state.newPassword,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          //end loading modal
          this.setState({
            requestIsSending: false,
          });

          if (json.success === true) {
            showMessage('Change password successfully', 'Login again now!');
            this.logout();
          } else {
            showMessage('Change password fail', 'Try again!');
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <LoadingModal requestIsSending={this.state.requestIsSending} />
          <Card>
            <ListItem icon>
              <Left>
                <Button style={{backgroundColor: '#ffffff'}}>
                  <FAIcon
                    name="envelope-o"
                    size={20}
                    style={{color: Colors.appColor}}
                  />
                </Button>
              </Left>
              <Body>
                <Text>{this.props.navigation.getParam('changeEmail')}</Text>
              </Body>
            </ListItem>
            <ListItem icon noBorder>
              <Left>
                <Button style={{backgroundColor: '#ffffff'}}>
                  <FAIcon
                    name="lock"
                    size={20}
                    style={{color: Colors.appColor}}
                  />
                </Button>
              </Left>
              <Body>
                <Text>{I18n.t('screen.profile.oldPassword')}</Text>
              </Body>
            </ListItem>
            <ListItem icon>
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
                <Input
                  secureTextEntry={true}
                  onChangeText={(oldPassword) => this.setState({oldPassword})}
                />
              </Body>
            </ListItem>
            <ListItem icon noBorder>
              <Left>
                <Button style={{backgroundColor: '#ffffff'}}>
                  <FAIcon
                    name="lock"
                    size={20}
                    style={{color: Colors.appColor}}
                  />
                </Button>
              </Left>
              <Body>
                <Text>{I18n.t('screen.profile.newPassword')}</Text>
              </Body>
            </ListItem>
            <ListItem icon>
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
                <Input
                  secureTextEntry={true}
                  onChangeText={(newPassword) => this.setState({newPassword})}
                />
              </Body>
            </ListItem>
            <ListItem icon noBorder>
              <Left>
                <Button style={{backgroundColor: '#ffffff'}}>
                  <FAIcon
                    name="lock"
                    size={20}
                    style={{color: Colors.appColor}}
                  />
                </Button>
              </Left>
              <Body>
                <Text>{I18n.t('screen.profile.repeatNewPassword')}</Text>
              </Body>
            </ListItem>
            <ListItem icon noBorder>
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
                <Input
                  secureTextEntry={true}
                  onChangeText={(rePassword) => this.setState({rePassword})}
                />
              </Body>
            </ListItem>
          </Card>
          <CardItem style={{alignItems: 'center', justifyContent: 'center'}}>
            <Button rounded onPress={this.check}>
              <Text>{I18n.t('screen.profile.change')}</Text>
            </Button>
          </CardItem>
        </Content>

        {/* Modal Save */}
        <View>
          <Modal isVisible={this.state.isModalVisible}>
            <View style={{backgroundColor: '#ffffff', padding: 10}}>
              <Button transparent block>
                <Text>{I18n.t('screen.profile.wantChange')}</Text>
              </Button>
              <CardItem>
                <Left>
                  <Button block rounded danger onPress={this.toggleModal}>
                    <Text>{I18n.t('cancel')}</Text>
                  </Button>
                </Left>
                <Body>
                  <Button block rounded onPress={this.change}>
                    <Text>{I18n.t('screen.profile.change')}</Text>
                  </Button>
                </Body>
              </CardItem>
            </View>
          </Modal>
        </View>
      </Container>
    );
  }
}
