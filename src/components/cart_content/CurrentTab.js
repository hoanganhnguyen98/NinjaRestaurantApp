import React, { Component } from 'react';
import { ActivityIndicator, FlatList, View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import NumberFormat from 'react-number-format';

import { Urls, Styles } from '../../common';

export default class CurrentTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data:'',
            isLoading: true
        };
    }

    getPrice = (a,b) =>
    {
        return a*b;
    }

    componentDidMount = async() =>
    {
        var userId = await AsyncStorage.getItem('userId');

        fetch(Urls.APIUrl+'cart/currentcart/'+userId)
        .then((response) => response.json())
        .then((json) => {
            this.setState({ data: json.data });
        })
        .catch((error) => console.error(error))
        .finally(() => {
            this.setState({ isLoading: false });
        });
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
                    />
                )}
                </List>
            </View>
        );
    }
}