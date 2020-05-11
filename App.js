import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import * as actions from './src/redux/action/index';
import I18n from './src/i18n/i18n';
import store from './src/components/store';
class HomeScreen extends Component {
  setLanguage = (language) => {
    this.setState({language});
    this.props.setLanguage(language);
  };

  render() {
    const {language} = this.props;
    const isVNLang = language === 'vi' ? true : false;
    return (
      <Provider store={store}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>{I18n.t('greeting')}</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => this.setLanguage('vi')}
              style={{marginLeft: 20}}>
              <Text style={{color: isVNLang ? 'blue' : 'grey'}}>Việt Nam</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setLanguage('en')}
              style={{marginLeft: 5}}>
              <Text style={{color: !isVNLang ? 'blue' : 'grey'}}>England</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.languageReducer.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (language) => {
      dispatch(actions.changeLanguage(language));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
