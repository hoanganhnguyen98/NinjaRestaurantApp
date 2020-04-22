import React, { Component } from 'react';
import { Header, Button, Left, Right, Body, Title, Text} from 'native-base';
import { Image, View } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import { Styles } from '../common';

const options = [
    <Text><FAIcon name='sort-alpha-asc' size={20} /> Name</Text>, 
    <Text><FAIcon name='sort-alpha-desc' size={20} /> Name</Text>,
    <Text><FAIcon name='sort-numeric-asc' size={20} /> Price</Text>,
    <Text><FAIcon name='sort-numeric-desc' size={20} /> Price</Text>,
    <Text style={{color: 'red'}}>Cancel</Text>,
];

export default class CustomHeader extends Component
{
    constructor(props)
    {
        super(props);
    }

    showActionSheet = () =>
    {
        this.ActionSheet.show()
    }

    sortBy = (index) =>
    {
        this.props.parentReference(index);
    }

    render() {
        return (
            <View>
                <Header>
                    <Left>
                        <Button transparent>
                            <Image source={require('../assets/img/logo.jpg')} style={Styles.logo} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Ninja Restaurant</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.showActionSheet}>
                            <FAIcon name="sort-amount-asc" size={20} style={{color: '#ffffff'}} />
                        </Button>
                    </Right>
                </Header>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Sort food by'}
                    options={options}
                    cancelButtonIndex={4}
                    destructiveButtonIndex={1}
                    onPress={(index) => {this.sortBy(index)}}
                />
            </View>
        );
    }
}