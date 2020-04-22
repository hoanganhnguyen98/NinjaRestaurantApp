import React from 'react';
import {View, Text} from 'react-native';
import ActionSheet from 'react-native-actionsheet';

export default class Demo extends React.Component {
  showActionSheet = () => {
    this.ActionSheet.show()
  }
  render() {
    return (
      <View>
        <Text onPress={this.showActionSheet}>Open ActionSheet</Text>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Which one do you like ?'}
          options={['Apple', 'Banana', 'cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index) => { /* do something */ }}
        />
      </View>
    )
  }
}