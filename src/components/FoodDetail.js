import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Content, Text, Button, Icon, Left, Body, Right, Thumbnail, List, ListItem } from 'native-base';
import NumberFormat from 'react-number-format';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import { Styles, Colors, Urls } from '../common';

export default class FoodDetail extends Component
{
    constructor (props)
    {
        super(props);

        this.state = {
            favourite : true,
            number : 1,
        }
    }


    addToCart = async() =>
    {
        try {
            fetch(Urls.APIUrl+'addtocart',{
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user_id": await AsyncStorage.getItem('userId'),
                    "food_id": this.props.navigation.getParam('detailId'),
                    "food_name": this.props.navigation.getParam('detailName'),
                    "image": this.props.navigation.getParam('detailImage'),
                    "number": this.state.number,
                    "price": this.props.navigation.getParam('detailPrice')
                })
            })
            .then((response) => response.json())
            .then((json)=>{
                if (json.success === true) {
                    alert('Add to cart successfully');
                } else {
                    alert('Add to cart fail');
                }
            })
            .catch((error) => console.error(error));
        } catch (error) {
            alert(error);
        }
    }

    changeFavourite = () =>
    {
        this.setState({favourite: !this.state.favourite});
    }

    foodPlus= () =>
    {
        this.setState({number: this.state.number + 1});
    }

    foodMinus = () =>
    {
        if (this.state.number > 1) {
            this.setState({number: this.state.number - 1});
        }
    }

    render() {
        return (
            <Content>
                <List>
                    <View>
                        <ListItem noBorder>
                            <Thumbnail square source={{uri: this.props.navigation.getParam('detailImage')}} style={Styles.foodDetail.image}/>
                        </ListItem>
                        <ListItem noBorder thumbnail>
                            <Body>
                                <Text style={{fontSize: 20, fontWeight: "bold", color: Colors.appColor}}>{this.props.navigation.getParam('detailName')}</Text>            
                            </Body>
                            <Right>
                                <NumberFormat
                                    value={this.props.navigation.getParam('detailPrice')}
                                    displayType={'text'}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    suffix={' VND'}
                                    renderText={value => <Text style={{fontWeight: "bold", color: Colors.appColor}}>{value}</Text>}
                                />
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Body>
                                <Text>{this.props.navigation.getParam('detailMaterial')}</Text>
                            </Body>
                            <Right>
                                <Button transparent onPress={this.changeFavourite}>
                                    <FAIcon name={this.state.favourite ? 'heart' : 'heart-o'} color='red' size={20} />
                                </Button>
                            </Right>
                        </ListItem>
                        <ListItem noBorder style={{justifyContent: 'center', alignContent: 'center'}}>
                                <Button transparent onPress={this.foodMinus}>
                                    <FAIcon name='minus-square' size={35} color={Colors.appColor} />
                                </Button>
                            <Body style={{marginLeft: 50, marginRight: 50}}>
                                <Button rounded block onPress={this.addToCart}>
                                    <Text>Add <Text style={{color: 'red'}}>{this.state.number}</Text> to cart</Text>
                                </Button>
                            </Body>
                                <Button transparent onPress={this.foodPlus}>
                                    <FAIcon name='plus-square' size={35} color={Colors.appColor} />
                                </Button>
                        </ListItem>
                    </View>
                </List>
            </Content>
        );
    }
}