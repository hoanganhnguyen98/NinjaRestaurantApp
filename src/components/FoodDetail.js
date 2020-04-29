import React, { Component } from 'react';
import { View } from 'react-native';
import { Content, Text, Button, Icon, Left, Body, Right, Thumbnail, List, ListItem, Col } from 'native-base';
import NumberFormat from 'react-number-format';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import { Styles, Colors } from '../common';

export default class FoodDetail extends Component
{
    constructor (props)
    {
        super(props);

        this.state = {
            favourite : true,
        }
    }

    changeFavourite = () =>
    {
        this.setState({favourite: !this.state.favourite});
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
                        <ListItem noBorder style={{justifyContent: 'center'}}>
                            <Left>
                                <FAIcon name='minus' />
                                <Text>Number</Text>
                                <FAIcon name='plus' />
                            </Left>
                            <Body>
                                <Button rounded block>
                                    <Text>Add to cart</Text>
                                </Button>
                            </Body>
                        </ListItem>
                    </View>
                </List>
            </Content>
        );
    }
}