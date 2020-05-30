import React from 'react';
import {View, Modal, Text, TouchableHighlight, BackHandler} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AndroidOpenSettings from 'react-native-android-open-settings';
import * as Animatable from 'react-native-animatable';

import {Styles, Colors} from '../common';

const NetworkModal = (props) => {
  const {disconnectedNetwork} = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={disconnectedNetwork}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={Styles.networkModal.modalBackground}>
        <View style={Styles.networkModal.activeModal}>
          <View style={[Styles.networkModal.functionView, {width: 300}]}>
            <Animatable.Text
              animation="flash"
              iterationCount="infinite"
              direction="alternate">
              <MCIcon name="wifi-off" size={25} color="red" />
            </Animatable.Text>
            <Text>Disconnected Network</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={[Styles.networkModal.functionView, {width: 180}]}>
              <TouchableHighlight
                onPress={() => AndroidOpenSettings.wifiSettings()}
                underlayColor="white">
                <Text
                  style={{
                    fontWeight: 'bold',
                    textDecorationLine: 'underline',
                    color: Colors.appColor,
                  }}>
                  Go to Wi-Fi settings
                </Text>
              </TouchableHighlight>
            </View>
            <View style={[Styles.networkModal.functionView, {width: 120}]}>
              <TouchableHighlight
                onPress={() => BackHandler.exitApp()}
                underlayColor="white">
                <Text
                  style={{
                    fontWeight: 'bold',
                    textDecorationLine: 'underline',
                    color: Colors.appColor,
                  }}>
                  Exit App
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NetworkModal;
