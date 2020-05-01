import React, { Component } from 'react';
import { ActivityIndicator, FlatList, View, Image, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import NumberFormat from 'react-number-format';

import { Urls, Styles } from '../../common';

export default class CurrentTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data:'',
            isLoading: true,
            refreshing: true
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
                
            </Right>
        </ListItem>

    render()
    {
        const { data, isLoading } = this.state;

        return (
            <View>
                <List>
                {isLoading ? <ActivityIndicator/> : (
                    <FlatList
                        data={data}
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
            </View>
        );
    }
}