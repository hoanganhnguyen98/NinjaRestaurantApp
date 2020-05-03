import React, { Component } from 'react';
import { ActivityIndicator, FlatList, View, Image, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, CardItem, Item, Input, Label } from 'native-base';
import NumberFormat from 'react-number-format';
import Modal from 'react-native-modal';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Urls, Styles, Colors } from '../../common';

export default class CurrentTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data:'',
            isLoading: true,
            refreshing: true,
            totalPrice: 0,
            email: '',
            name: '',
            phone: '',
            address: '',
            id: ''
        };

        this.GetData();
    }

    getPrice = (a,b) =>
    {
        return a*b;
    }

    GetData = async() =>
    {
        var userId = await AsyncStorage.getItem('userId');

        fetch(Urls.APIUrl+'cart/currentcart/'+userId)
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                refreshing: false,
                data: json.data
            });

            for (const iterator of this.state.data) {
                this.setState({
                    totalPrice: this.state.totalPrice + iterator.number*iterator.price
                })
            }
        })
        .catch((error) => console.error(error))
        .finally(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    removeCart = (id) =>
    {
        fetch(Urls.APIUrl+'cart/currentcart/remove/'+id)
        .then((response) => response.json())
        .then((json) => {
            if (json.success === true) {
                alert('Remove food successfully!')
            }
        })
        .catch((error) => console.error(error))
        .finally(() => {});
        this.onRefresh();
    }

    toggleModal = async() => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    }

    confirmOrder = async() =>
    {
        var orderId = await AsyncStorage.getItem('userId');
        var orderEmail = await AsyncStorage.getItem('userEmail');
        var orderName = await AsyncStorage.getItem('userName');
        var orderPhone = await AsyncStorage.getItem('userPhone');
        var orderAddress = await AsyncStorage.getItem('userAddress');
        this.setState({
            id: orderId,
            email: orderEmail,
            name: orderName,
            phone: orderPhone,
            address: orderAddress
        })
        this.setState({isModalVisible: !this.state.isModalVisible});
    }

    orderNow = () =>
    {
        try {
            fetch(Urls.APIUrl+'cart/currentcart/order',{
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user_id": this.state.id,
                    "email": this.state.email,
                    "name": this.state.name,
                    "phone": this.state.phone,
                    "address": this.state.address,
                    "total_price": this.state.totalPrice
                })
            })
            .then((response) => response.json())
            .then((json)=>{
                if (json.success === true) {
                    alert('Order successfully');
                    this.onRefresh();
                } else {
                    alert('Order fail');
                }
            })
            .catch((error) => console.error(error));
        } catch (error) {
            alert(error);
        }
    }

    onRefresh = () =>
    {
        //Clear old data of the list
        this.setState({
            data: [],
            totalPrice: 0
        });
        //Call the Service to get the latest data
        this.GetData();
    }

    renderItem=(data)=>
        <ListItem thumbnail noBorder>
            <Left>
                <Image square source={{ uri: data.item.image }} style={Styles.menu.foodImage} />
            </Left>
            <Body>
                <Text>{data.item.food_name}</Text>
                <NumberFormat
                    value={data.item.price}
                    displayType={'text'}
                    thousandSeparator="."
                    decimalSeparator=","
                    suffix={''}
                    renderText={value => <Text note numberOfLines={1}>{value} * {data.item.number}</Text>}
                />
                <NumberFormat
                    value={this.getPrice(data.item.number,data.item.price)}
                    displayType={'text'}
                    thousandSeparator="."
                    decimalSeparator=","
                    suffix={' VND'}
                    renderText={value => <Text
                    style={{color: 'red'}} note numberOfLines={1}>= {value}</Text>}
                />
            </Body>
            <Right>
                <Button transparent onPress={() => this.removeCart(data.item.id)}>
                    <MCIcon name='cart-remove' color='red' size={25} />
                </Button>
            </Right>
        </ListItem>

    render()
    {
        const { data, isLoading } = this.state;

        return (
            <View style={Styles.menu.foodList}>
                <Header style={{backgroundColor: "#ffffff"}}>
                    <Body style={{marginLeft: 20}}>
                        {this.state.totalPrice === 0 ? null :
                        <NumberFormat
                            value={this.state.totalPrice}
                            displayType={'text'}
                            thousandSeparator="."
                            decimalSeparator=","
                            suffix={' VND'}
                            renderText={value => <Text
                            style={{color: 'red', fontWeight: "bold", fontSize: 18}} note numberOfLines={1}>{value}</Text>}
                        />}
                    </Body>
                    <Right>
                        <Button block rounded onPress={() =>this.confirmOrder()}>
                            <Text>Order Now</Text>
                        </Button>
                    </Right>
                </Header>
                <Container>
                    <List>
                        {isLoading ? <ActivityIndicator/> : (
                            <FlatList
                                data={data.sort((after, before) => after.created_at.localeCompare(before.created_at))}
                                keyExtractor={({ id }, index) => id}
                                renderItem={ item=>this.renderItem(item) }
                                refreshControl={
                                    <RefreshControl
                                    //refresh control used for the Pull to Refresh
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh.bind(this)}
                                    />
                                }
                            />
                        )}
                    </List>
                </Container>
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{backgroundColor: '#ffffff', padding: 30}}>
                        <Button transparent block>
                            <Text>Comfirm order information</Text>
                        </Button>
                        <CardItem>
                            <Item stackedLabel>
                                <Label>Customer Name <MCIcon name='pencil' /></Label>
                                <Input defaultValue={this.state.name} onChangeText={(name)=>this.setState({name})} />
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item stackedLabel>
                                <Label>Phone number <MCIcon name='pencil' /></Label>
                                <Input defaultValue={this.state.phone} onChangeText={(phone)=>this.setState({phone})} />
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item stackedLabel>
                                <Label>Address <MCIcon name='pencil' /></Label>
                                <Input defaultValue={this.state.address} onChangeText={(address)=>this.setState({address})} />
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Text>Total: <NumberFormat
                                value={this.state.totalPrice}
                                displayType={'text'}
                                thousandSeparator="."
                                decimalSeparator=","
                                suffix={' VND'}
                                renderText={value => <Text
                                style={{color: 'red', fontWeight: "bold", fontSize: 18}} note numberOfLines={1}>{value}</Text>}
                            /></Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button block rounded danger onPress={this.toggleModal}>
                                    <Text>Cancel</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Button block rounded onPress={this.orderNow}>
                                    <Text>Order</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </View>
                </Modal>
            </View>
        );
    }
}