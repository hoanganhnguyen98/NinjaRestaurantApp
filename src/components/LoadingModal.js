import React from 'react';
import {View, Modal, ActivityIndicator} from 'react-native';

import {Styles} from '../common';

const LoadingModal = (props) => {
  const {requestIsSending} = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={requestIsSending}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={Styles.loadingModal.modalBackground}>
        <View style={Styles.loadingModal.activityIndicatorWrapper}>
          <ActivityIndicator animating={requestIsSending} />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
