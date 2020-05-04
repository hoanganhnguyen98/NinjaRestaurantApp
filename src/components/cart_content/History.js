import React, { Component } from 'react';
import { ActivityIndicator, FlatList, View, Image, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, CardItem, Item, Input, Label } from 'native-base';
import NumberFormat from 'react-number-format';
import Modal from 'react-native-modal';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PropTypes } from 'prop-types';

import { Urls, Styles, Colors } from '../../common';

export default class History extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data:'',
            isLoading: true,
            refreshing: true,
            navigation: ''
        };

        this.GetData();
    }

    GetData = async() =>
    {
        var userId = await AsyncStorage.getItem('userId');

        fetch(Urls.APIUrl+'cart/history/'+userId)
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                refreshing: false,
                data: json.data
            });
        })
        .catch((error) => console.error(error))
        .finally(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    onRefresh = () =>
    {
        //Clear old data of the list
        this.setState({
            data: []
        });
        //Call the Service to get the latest data
        this.GetData();
    }

    renderItem=(data)=>
        <ListItem thumbnail noBorder onPress={() =>this.props.navigation.navigate('HistoryDetail',{
            billId: data.item.id,
        })}>
            <Left>
                <Text>{data.item.status}</Text>
            </Left>
            <Body>
                <NumberFormat
                    value={data.item.total_price}
                    displayType={'text'}
                    thousandSeparator="."
                    decimalSeparator=","
                    suffix={' VND'}
                    renderText={value => <Text style={{color: 'red'}}>{value}</Text>}
                />
                <Text note numberOfLines={1}>{data.item.created_at}</Text>
            </Body>
            <Right>
                <Button transparent>
                    <MCIcon name='cart-arrow-right' color={Colors.appColor} size={25} />
                </Button>
            </Right>
        </ListItem>

    render()
    {
        const { data, isLoading } = this.state;

        return (
            <View style={Styles.menu.foodList}>
                <Header style={{backgroundColor: "#ffffff"}}>
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
            </View>
        );
    }
}

History.propTypes = {
    navigation: PropTypes.string.isRequired,
  };