import React, { Component } from 'react';
import { View } from 'react-native';
import { Content, Text, Button, Icon, Left, Body, Right, Thumbnail, List, ListItem } from 'native-base';
import NumberFormat from 'react-number-format';

import { Styles } from '../common';

export default class FoodDetail extends Component
{
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
                                <Text style={{fontSize: 20, fontWeight: "bold", color: '#3F51B5'}}>{this.props.navigation.getParam('detailName')}</Text>            
                            </Body>
                            <Right>
                                <NumberFormat
                                    value={this.props.navigation.getParam('detailPrice')}
                                    displayType={'text'}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    suffix={' VND'}
                                    renderText={value => <Text style={{fontWeight: "bold"}}>{value}</Text>}
                                />
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Body>
                                <Text>{this.props.navigation.getParam('detailMaterial')}</Text>
                            </Body>
                        </ListItem>
                        <ListItem noBorder style={{justifyContent: 'center'}}>
                            <Button rounded>
                                <Text>Add to cart</Text>
                            </Button>
                        </ListItem>
                    </View>
                </List>
            </Content>
        );
    }
}