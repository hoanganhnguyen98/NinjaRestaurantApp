import React, { Component } from 'react';
import { ActivityIndicator, FlatList, View, Image, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, List, ListItem, Text, Left, Body, Right, Button } from 'native-base';
import NumberFormat from 'react-number-format';
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
        <ListItem thumbnail onPress={() =>this.props.navigation.navigate('HistoryDetail',{
            historyId: data.item.id,
            updateTime: data.item.updated_at,
            status: data.item.status,
            detailName: data.item.customer_name,
            detailPhone: data.item.phone,
            detailAddress: data.item.address
        })}>
            <Left>
            {data.item.status === 'new' ?
                    <Button success rounded bordered>
                        <Text><MCIcon name="pot-mix" size={20} /></Text>
                    </Button>
                : data.item.status === 'done' ?
                    <Button danger rounded bordered>
                        <Text><MCIcon name="account-check" size={20} /></Text>
                    </Button>
                :
                    <Button warning rounded bordered>
                        <Text><MCIcon name="truck-delivery" size={20} /></Text>
                    </Button>
                }
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
            </Right>
        </ListItem>

    render()
    {
        const { data, isLoading } = this.state;

        return (
            <View style={Styles.menu.foodList}>
                <Header style={{backgroundColor: "#ffffff"}}>
                    <Button transparent>
                        <Button transparent>
                            <Text><MCIcon name="cart-arrow-up" size={20} /></Text>
                        </Button>
                        <Button light transparent>
                            <Text><MCIcon name="arrow-right-bold" size={15} /></Text>
                        </Button>
                        <Button success transparent>
                            <Text><MCIcon name="pot-mix" size={20} /></Text>
                        </Button>
                        <Button light transparent>
                            <Text><MCIcon name="arrow-right-bold" size={15} /></Text>
                        </Button>
                        <Button warning transparent>
                            <Text><MCIcon name="truck-delivery" size={20} /></Text>
                        </Button>
                        <Button light transparent>
                            <Text><MCIcon name="arrow-right-bold" size={15} /></Text>
                        </Button>
                        <Button danger transparent>
                            <Text><MCIcon name="account-check" size={20} /></Text>
                        </Button>
                    </Button>
                </Header>
                <Container>
                    <List>
                        {isLoading ? <ActivityIndicator/> : (
                            <FlatList
                                data={data.sort((after, before) => before.created_at.localeCompare(after.created_at))}
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