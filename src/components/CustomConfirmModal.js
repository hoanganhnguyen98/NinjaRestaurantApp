import React from 'react';
import {View, Modal} from 'react-native';
import {Button, Text, CardItem, Left, Body} from 'native-base';

import {Styles} from '../common';
import I18n from '../i18n/i18n';

const CustomConfirmModal = (props) => {
  const {
    isModalVisible,
    message,
    actionName,
    onPressMainAction,
    onPressToggleModal,
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isModalVisible}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={Styles.actionModal.modalBackground}>
        <View style={Styles.actionModal.activeModal}>
          <Button transparent block>
            <Text>{message}</Text>
          </Button>
          <CardItem>
            <Left>
              <Button block rounded danger onPress={onPressToggleModal}>
                <Text>{I18n.t('cancel')}</Text>
              </Button>
            </Left>
            <Body>
              <Button block rounded onPress={onPressMainAction}>
                <Text>{actionName}</Text>
              </Button>
            </Body>
          </CardItem>
        </View>
      </View>
    </Modal>
  );
};

export default CustomConfirmModal;
