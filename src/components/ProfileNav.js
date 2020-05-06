import React, { Component } from 'react';
import { View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, ListItem, Right, Title } from 'native-base';
import Modal from 'react-native-modal';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PropTypes } from 'prop-types';

import CustomHeader from './CustomHeader';
import { Styles, Colors } from '../common';

export default class ProfileNav extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            id: '',
            name: '',
            email: '',
            image: '',
            phone: '',
            address: '',
            password: '',
            isModalVisible: false,
        }
    }

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    };

    logout = async () =>
    {
        try {
            let keys = ['userName', 'userEmail', 'userPassword', 'userImage', 'UserPhone', 'userAddress'];
            await AsyncStorage.multiRemove(keys);
            this.props.navigation.navigate('Home');
        } catch (error) {
            alert(error);
        }
    }

    componentDidMount = async() =>
    {
        try {
            this.setState({
                id: await AsyncStorage.getItem('userId'),
                name: await AsyncStorage.getItem('userName'),
                email: await AsyncStorage.getItem('userEmail'),
                image: await AsyncStorage.getItem('userImage'),
                phone: await AsyncStorage.getItem('userPhone'),
                address: await AsyncStorage.getItem('userAddress'),
                password: await AsyncStorage.getItem('userPassword'),
            });
        } catch (error) {
            alert(error);
        }
    }

    render() {
        return (
            <Container>
                <CustomHeader />
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{ uri: this.state.image }} />
                            <Body>
                                <Text>
                                    {(this.props.navigation.getParam('saveName') === undefined) ?
                                    this.state.name : this.props.navigation.getParam('saveName')}
                                </Text>
                                <Text note>{this.state.email}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
                <Content>
                    <ListItem icon itemDivider noBorder>
                        <Left />
                        <Body>
                            <Text>Personal information</Text>
                        </Body>
                        <Left>
                            <Button transparent onPress={() =>this.props.navigation.navigate('ChangeInfo',{
                                changeImage: this.state.image,
                                changeName: this.state.name,
                                changeEmail: this.state.email,
                                changePhone: this.state.phone,
                                changeAddress: this.state.address,
                            })}>
                                <FAIcon name="edit" size={20} style={{color: Colors.appColor}} />
                            </Button>
                        </Left>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#ffffff" }}>
                                <FAIcon name="phone" size={20} style={{color: Colors.appColor}}/>
                            </Button>
                        </Left>
                        <Body>
                            <Text>
                                {(this.props.navigation.getParam('savePhone') === undefined) ?
                                this.state.phone : this.props.navigation.getParam('savePhone')}
                            </Text>
                        </Body>
                    </ListItem>
                    <ListItem icon noBorder>
                        <Left>
                            <Button style={{ backgroundColor: "#ffffff" }}>
                                <FAIcon name="home" size={20} style={{color: Colors.appColor}} />
                            </Button>
                        </Left>
                        <Body>
                            <Text>
                                {(this.props.navigation.getParam('saveAddress') === undefined) ?
                                this.state.address : this.props.navigation.getParam('saveAddress')}
                            </Text>
                        </Body>
                    </ListItem>

                    {/* End of information */}
                    {/* Start of function */}

                    <ListItem icon itemDivider noBorder>
                        <Left />
                        <Body>
                            <Text>Setting</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon onPress={() =>this.props.navigation.navigate('ChangePassword',{
                        changeId: this.state.id,
                        changePassword: this.state.password,
                        changeEmail: this.state.email,
                    })}>
                        <Left>
                            <Button style={{ backgroundColor: "#ffffff" }}>
                                <Ionicons name="md-key" size={20} style={{color: Colors.appColor}} />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Change password</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon noBorder>
                        <Left>
                            <Button style={{ backgroundColor: "#ffffff" }}>
                                <FAIcon name="language" size={20} style={{color: Colors.appColor}}/>
                            </Button>
                        </Left>
                        <Body>
                            <Text>Select language</Text>
                        </Body>
                    </ListItem>

                    {/* Logout */}
                    <ListItem icon itemDivider noBorder />
                    <ListItem icon noBorder onPress={() =>this.toggleModal()}>
                        <Left>
                            <Button style={{ backgroundColor: "#ffffff" }}>
                                <FAIcon name="sign-out" size={20} style={{color: Colors.appColor}} />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Logout</Text>
                        </Body>
                    </ListItem>
                </Content>

                {/* Modal Logout */}
                <View>
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={{backgroundColor: '#ffffff', padding: 30}}>
                            <Button transparent block>
                                <Text>Do you want to logout?</Text>
                            </Button>
                            <CardItem>
                                <Left>
                                    <Button block rounded danger onPress={this.toggleModal}>
                                        <Text>Cancel</Text>
                                    </Button>
                                </Left>
                                <Body>
                                    <Button block rounded onPress={this.logout}>
                                        <Text>Logout</Text>
                                    </Button>
                                </Body>
                            </CardItem>
                        </View>
                    </Modal>
                </View>
            </Container>
        );
    }
}

ProfileNav.propTypes = {
    saveName: PropTypes.string,
    savePhone: PropTypes.string,
    saveAddress: PropTypes.string
};
