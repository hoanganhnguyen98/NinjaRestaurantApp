import React, { Component } from 'react';
import { Image, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Tab, Tabs, Header, Button, Left, Right, Body, Title, Text } from 'native-base';
import ActionSheet from 'react-native-actionsheet';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import I18n, { switchLanguage }  from '../i18n/i18n';
import { getLanguages } from 'react-native-i18n';
import { Styles } from '../common';

import CustomFoodTab from './CustomFoodTab';

const options = [
    <Text><FAIcon name='sort-alpha-asc' size={20} /> Name</Text>, 
    <Text><FAIcon name='sort-alpha-desc' size={20} /> Name</Text>,
    <Text><FAIcon name='sort-numeric-asc' size={20} /> Price</Text>,
    <Text><FAIcon name='sort-numeric-desc' size={20} /> Price</Text>,
    <Text style={{color: 'red'}}>Cancel</Text>,
];

export default class HomeNav extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            index : 0,
            sortIconType: 'sort-alpha-asc'
        };
    }

    componentDidMount = async() => {
        try {
            var userEmail = await AsyncStorage.getItem('userEmail');
            var userPassword = await AsyncStorage.getItem('userPassword');

            if (userEmail === null || userPassword === null) {
                this.props.navigation.navigate('Home');
            }
            // Get the language set by default from AsyncStorage
            var defaultLanguage = await AsyncStorage.getItem('defaultLanguage');
        
            // if not defaultLanguage, get local device languages
            if (!defaultLanguage) {
                getLanguages().then(languages => {
                    if (languages == 'vi-VN') {
                        switchLanguage('vi');
                    } else {
                        switchLanguage('en');;
                    }
                });
            } else {
                // if exist defaultLanguage, set it for locale in I18n
                switchLanguage(defaultLanguage);
            }
        } catch (error) {
            alert(error);
        }
    }

    sortFood = (index) =>
    {
        switch (index) {
            case 0: this.setState({
                index: index,
                sortIconType: 'sort-alpha-asc'
            });
            break;
            case 1: this.setState({
                index: index,
                sortIconType: 'sort-alpha-desc'
            });
            break;
            case 2: this.setState({
                index: index,
                sortIconType: 'sort-numeric-asc'
            });
            break;
            case 3: this.setState({
                index: index,
                sortIconType: 'sort-numeric-desc'
            });
            break;
        
            default:
            break;
        }
    }

    showActionSheet = () =>
    {
        this.ActionSheet.show();
    }

    render() {
        return (
            <Container>
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
                            <FAIcon name={this.state.sortIconType} size={20} style={{color: '#ffffff'}} />
                        </Button>
                    </Right>
                </Header>
                <Tabs>
                    <Tab heading="Vietnam">
                        <CustomFoodTab source='Vietnam' sortBy={this.state.index} navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading="Japan">
                        <CustomFoodTab source='Japan' sortBy={this.state.index} navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading="Korea">
                        <CustomFoodTab source='Korea' sortBy={this.state.index} navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading="China">
                        <CustomFoodTab source='China' sortBy={this.state.index} navigation={this.props.navigation} />
                    </Tab>
                </Tabs>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Sort food by'}
                    options={options}
                    cancelButtonIndex={4}
                    destructiveButtonIndex={1}
                    onPress={(index) => {this.sortFood(index)}}
                />
            </Container>
        );
    }
}