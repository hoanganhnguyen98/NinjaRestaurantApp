import React from 'react';
import {ListItem, Left, Button, Body, Text, Input} from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../common';

const CustomListItemLabel = (props) => {
  const {iconName, label, noBorder, onPress} = props;

  return (
    <ListItem icon noBorder={noBorder} onPress={onPress}>
      <Left>
        <Button style={{backgroundColor: '#ffffff'}}>
          <FAIcon name={iconName} size={20} style={{color: Colors.appColor}} />
        </Button>
      </Left>
      <Body>
        <Text>{label}</Text>
      </Body>
    </ListItem>
  );
};

const CustomListItemInput = (props) => {
  const {
    iconName,
    noBorder,
    secureTextEntry,
    onChangeText,
    keyboardType,
    autoCapitalize,
    editable,
    placeholder,
    defaultValue,
  } = props;
  return (
    <ListItem icon noBorder={noBorder}>
      <Left>
        <Button style={{backgroundColor: '#ffffff'}}>
          <FAIcon name={iconName} size={20} style={{color: Colors.appColor}} />
        </Button>
      </Left>
      <Body>
        <Input
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          editable={editable}
        />
      </Body>
    </ListItem>
  );
};

const CustomListItemHistoryDetail = (props) => {
  const {iconName, label} = props;

  return (
    <ListItem icon>
      <Left>
        <Button style={{backgroundColor: '#ffffff'}}>
          <MCIcon name={iconName} size={20} style={{color: Colors.appColor}} />
        </Button>
      </Left>
      <Body>
        <Text>{label}</Text>
      </Body>
    </ListItem>
  );
};

export {CustomListItemLabel, CustomListItemInput, CustomListItemHistoryDetail};
