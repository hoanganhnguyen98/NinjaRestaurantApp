import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
} from 'native-base';

import LoadingModal from '../LoadingModal';
import showMessage from '../MessagesAlert';
import {Urls} from '../../common';
import I18n from '../../i18n/i18n';
import CustomConfirmModal from '../CustomConfirmModal';
import {CustomListItemInput} from '../CustomListItem';

export default class ChangeInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.navigation.getParam('changeName'),
      phone: this.props.navigation.getParam('changePhone'),
      address: this.props.navigation.getParam('changeAddress'),
      isModalVisible: false,
      requestIsSending: false,
    };
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  save = async () => {
    this.toggleModal;

    try {
      //start loading modal while fetching
      this.setState({
        requestIsSending: true,
      });

      fetch(Urls.APIUrl + 'user/update', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.props.navigation.getParam('changeEmail'),
          name: this.state.name,
          phone: this.state.phone,
          address: this.state.address,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          //end loading modal
          this.setState({
            requestIsSending: false,
          });

          if (json.success === true) {
            AsyncStorage.setItem('userName', this.state.name);
            AsyncStorage.setItem('userPhone', this.state.phone);
            AsyncStorage.setItem('userAddress', this.state.address);

            this.props.navigation.navigate('Profile', {
              saveName: this.state.name,
              savePhone: this.state.phone,
              saveAddress: this.state.address,
            });
          } else {
            showMessage(
              I18n.t('errors.changeInfo.fail'),
              I18n.t('errors.changeInfo.failMess'),
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
            {/* Image and email address */}
            <CardItem style={{alignItems: 'center', justifyContent: 'center'}}>
              <Thumbnail
                source={{uri: this.props.navigation.getParam('changeImage')}}
              />
            </CardItem>
            <CardItem style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text>{this.props.navigation.getParam('changeEmail')}</Text>
            </CardItem>

            {/* Information to edit */}
            <CustomListItemInput
              iconName="vcard-o"
              defaultValue={this.props.navigation.getParam('changeName')}
              onChangeText={(name) => this.setState({name})}
            />
            <CustomListItemInput
              iconName="phone"
              defaultValue={this.props.navigation.getParam('changePhone')}
              onChangeText={(phone) => this.setState({phone})}
            />
            <CustomListItemInput
              iconName="home"
              defaultValue={this.props.navigation.getParam('changeAddress')}
              onChangeText={(address) => this.setState({address})}
            />
          </Card>

          {/* Button */}
          <CardItem style={{alignItems: 'center', justifyContent: 'center'}}>
            <Button rounded onPress={this.toggleModal}>
              <Text>{I18n.t('screen.profile.save')}</Text>
            </Button>
          </CardItem>
        </Content>

        {/* Modal Save */}
        <CustomConfirmModal
          isModalVisible={this.state.isModalVisible}
          message={I18n.t('screen.profile.wantSave')}
          actionName={I18n.t('screen.profile.save')}
          onPressMainAction={this.save}
          onPressToggleModal={this.toggleModal}
        />
      </Container>
    );
  }
}
