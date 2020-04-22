import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text,
    Button, Left, Body, ListItem, Right, Input, Item, List, Switch } from 'native-base';

import Modal from 'react-native-modal';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import { Styles, Colors, Urls } from '../../common';

export default class ChangeInfo extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name: this.props.navigation.getParam('changeName'),
            phone: this.props.navigation.getParam('changePhone'),
            address: this.props.navigation.getParam('changeAddress'),
            isModalVisible: false,
        }
    }

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    }

    save = async () =>
    {
        try {
            fetch(Urls.APIUrl+'user/update',{
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": this.props.navigation.getParam('changeEmail'),
                    "name": this.state.name,
                    "phone": this.state.phone,
                    "address": this.state.address
                })
            })
            .then((response) => response.json())
            .then((json)=>{
                if (json.success === true) {
                    AsyncStorage.setItem('userName', this.state.name);
                    AsyncStorage.setItem('userPhone', this.state.phone);
                    AsyncStorage.setItem('userAddress', this.state.address);
    
                    this.props.navigation.navigate('Profile',{
                        saveName: this.state.name,
                        savePhone: this.state.phone,
                        saveAddress: this.state.address,
                    });
                } else {
                    alert('Change information fail');
                }
            })
            .catch((error) => console.error(error));
        } catch (error) {
            alert(error);
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Thumbnail source={{ uri: this.props.navigation.getParam('changeImage') }} />
                        </CardItem>
                        <CardItem style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Text>{this.props.navigation.getParam('changeEmail')}</Text>
                        </CardItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#ffffff" }}>
                                    <FAIcon name="vcard-o" size={20} style={{color: Colors.appColor}}/>
                                </Button>
                            </Left>
                            <Body>
                                <Input defaultValue={this.props.navigation.getParam('changeName')}
                                    onChangeText={(name)=>this.setState({name})} />
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#ffffff" }}>
                                    <FAIcon name="phone" size={20} style={{color: Colors.appColor}}/>
                                </Button>
                            </Left>
                            <Body>
                                <Input defaultValue={this.props.navigation.getParam('changePhone')}
                                    onChangeText={(phone)=>this.setState({phone})} />
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#ffffff" }}>
                                    <FAIcon name="home" size={20} style={{color: Colors.appColor}} />
                                </Button>
                            </Left>
                            <Body>
                                <Input defaultValue={this.props.navigation.getParam('changeAddress')}
                                    onChangeText={(address)=>this.setState({address})} />
                            </Body>
                        </ListItem>
                    </Card>
                    <CardItem style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Button rounded onPress={this.toggleModal}>
                            <Text>Save</Text>
                        </Button>
                    </CardItem>
                </Content>

                {/* Modal Save */}
                <View>
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={{backgroundColor: '#ffffff', padding: 30}}>
                            <Button transparent block>
                                <Text>Do you want to save?</Text>
                            </Button>
                            <CardItem>
                                <Left>
                                    <Button block rounded danger onPress={this.toggleModal}>
                                        <Text>Cancel</Text>
                                    </Button>
                                </Left>
                                <Body>
                                    <Button block rounded onPress={this.save}>
                                        <Text>Save</Text>
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