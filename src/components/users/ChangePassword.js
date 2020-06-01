import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Container, Content, Card, CardItem, Text, Button} from 'native-base';

import LoadingModal from '../LoadingModal';
import showMessage from '../MessagesAlert';
import {Urls} from '../../common';
import I18n from '../../i18n/i18n';
import CustomConfirmModal from '../CustomConfirmModal';
import {CustomListItemLabel, CustomListItemInput} from '../CustomListItem';

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
      showMessage(
        I18n.t('errors.password.old.invalid'),
        I18n.t('errors.password.old.message'),
      );
    } else if (this.state.newPassword.length < 6) {
      showMessage(
        I18n.t('errors.password.password.invalid'),
        I18n.t('errors.password.password.message'),
      );
    } else if (this.state.newPassword !== this.state.rePassword) {
      showMessage(
        I18n.t('errors.password.repassword.invalid'),
        I18n.t('errors.password.repassword.message'),
      );
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
            showMessage(
              I18n.t('success.changePassword.ok'),
              I18n.t('success.changePassword.message'),
            );
            this.logout();
          } else {
            showMessage(
              I18n.t('errors.changePassword.fail'),
              I18n.t('errors.changePassword.failMess'),
            );
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
            {/* show user email */}
            <CustomListItemLabel
              iconName="envelope-o"
              label={this.props.navigation.getParam('changeEmail')}
            />

            {/* get passwords to check and change */}
            <CustomListItemLabel
              noBorder={true}
              iconName="lock"
              label={I18n.t('screen.profile.oldPassword')}
            />
            <CustomListItemInput
              iconName="edit"
              secureTextEntry={true}
              onChangeText={(oldPassword) => this.setState({oldPassword})}
            />
            <CustomListItemLabel
              noBorder={true}
              iconName="lock"
              label={I18n.t('screen.profile.newPassword')}
            />
            <CustomListItemInput
              iconName="edit"
              secureTextEntry={true}
              onChangeText={(newPassword) => this.setState({newPassword})}
            />
            <CustomListItemLabel
              noBorder={true}
              iconName="lock"
              label={I18n.t('screen.profile.repeatNewPassword')}
            />
            <CustomListItemInput
              noBorder={true}
              iconName="edit"
              secureTextEntry={true}
              onChangeText={(rePassword) => this.setState({rePassword})}
            />
          </Card>

          {/* Button */}
          <CardItem style={{alignItems: 'center', justifyContent: 'center'}}>
            <Button rounded onPress={this.check}>
              <Text>{I18n.t('screen.profile.change')}</Text>
            </Button>
          </CardItem>
        </Content>

        {/* Modal Save */}
        <CustomConfirmModal
          isModalVisible={this.state.isModalVisible}
          message={I18n.t('screen.profile.wantChange')}
          actionName={I18n.t('screen.profile.change')}
          onPressMainAction={this.change}
          onPressToggleModal={this.toggleModal}
        />
      </Container>
    );
  }
}
