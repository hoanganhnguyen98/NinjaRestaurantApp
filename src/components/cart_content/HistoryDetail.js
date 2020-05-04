import React, { Component } from 'react';
import { ActivityIndicator, FlatList, View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, List, ListItem,Text, Left, Body, Right} from 'native-base';
import NumberFormat from 'react-number-format';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Urls, Styles, Colors } from '../../common';

export default class HistoryDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data:'',
            isLoading: true,
        };
    }

    componentDidMount = () =>
    {
        fetch(Urls.APIUrl+'cart/history/detail/'+this.props.navigation.getParam('billId'))
        .then((response) => response.json())
        .then((json) => {
            this.setState({
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

    getPrice = (a,b) =>
    {
        return a*b;
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
            <View style={Styles.menu.foodList}>
                <Container>
                    <List>
                        {isLoading ? <ActivityIndicator/> : (
                            <FlatList
                                data={data}
                                keyExtractor={({ id }, index) => id}
                                renderItem={ item=>this.renderItem(item) }
                            />
                        )}
                    </List>
                </Container>
            </View>
        );
    }
}