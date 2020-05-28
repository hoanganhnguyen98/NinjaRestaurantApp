import React, {Component} from 'react';
//import react in our code.

import NetInfo from '@react-native-community/netinfo';
import {AppState, Text} from 'react-native';

import {
  networkChecking,
  handleNetworkState,
} from './src/components/NetworkChecking';

export default class App extends Component {
  // state = {
  //   appState: AppState.currentState,
  // };
  componentDidMount() {
    networkChecking;
    handleNetworkState;
  }

  render() {
    return (
      <Text style={{marginTop: 30, padding: 20}}>
        NetInfo Example. Please open debugger to see the log
      </Text>
    );
  }
}
