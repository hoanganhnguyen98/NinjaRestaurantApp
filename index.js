/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/navigators/AppNavigator';
import {name as appName} from './app.json';

//remove warning yellow box
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
