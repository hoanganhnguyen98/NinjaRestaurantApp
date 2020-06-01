import React, {Component} from 'react';
import {ActivityIndicator, FlatList, View, Image} from 'react-native';
import {
  Container,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Header,
} from 'native-base';
import NumberFormat from 'react-number-format';

import {Urls, Styles} from '../../common';
import I18n from '../../i18n/i18n';
import {CustomListItemHistoryDetail} from '../CustomListItem';

export default class HistoryDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      isLoading: true,
      totalPrice: 0,
      status: this.props.navigation.getParam('status'),
    };

    this.getData();
  }

  getData = () => {
    fetch(
      Urls.APIUrl +
        'cart/history/detail/' +
        this.props.navigation.getParam('historyId'),
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          data: json.data,
        });

        for (const iterator of this.state.data) {
          this.setState({
            totalPrice:
              this.state.totalPrice + iterator.number * iterator.price,
          });
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  getPrice = (a, b) => {
    return a * b;
  };

  renderItem = (data) => (
    <ListItem thumbnail noBorder>
      <Left>
        <Image
          square
          source={{uri: data.item.image}}
          style={Styles.menu.foodImage}
        />
      </Left>
      <Body>
        <Text>{data.item.food_name}</Text>
        <NumberFormat
          value={data.item.price}
          displayType={'text'}
          thousandSeparator="."
          decimalSeparator=","
          suffix={''}
          renderText={(value) => (
            <Text note numberOfLines={1}>
              {value} * {data.item.number}
            </Text>
          )}
        />
        <NumberFormat
          value={this.getPrice(data.item.number, data.item.price)}
          displayType={'text'}
          thousandSeparator="."
          decimalSeparator=","
          suffix={' VND'}
          renderText={(value) => (
            <Text style={{color: 'red'}} note numberOfLines={1}>
              = {value}
            </Text>
          )}
        />
      </Body>
      <Right />
    </ListItem>
  );

  render() {
    const {data, isLoading} = this.state;

    return (
      <View style={Styles.menu.foodList}>
        <Header style={{backgroundColor: '#ffffff'}}>
          <Body style={{marginLeft: 20}}>
            {this.state.totalPrice === 0 ? null : (
              <NumberFormat
                value={this.state.totalPrice}
                displayType={'text'}
                thousandSeparator="."
                decimalSeparator=","
                suffix={' VND'}
                renderText={(value) => (
                  <Text
                    style={{color: 'red', fontWeight: 'bold', fontSize: 18}}
                    note
                    numberOfLines={1}>
                    {value}
                  </Text>
                )}
              />
            )}
          </Body>
          <Right>
            {this.state.status === 'new' ? (
              <Text>
                {I18n.t('screen.cart.orderedIn')}
                {this.props.navigation.getParam('updateTime')}
              </Text>
            ) : this.state.status === 'done' ? (
              <Text>
                {I18n.t('screen.cart.receivedIn')}
                {this.props.navigation.getParam('updateTime')}
              </Text>
            ) : (
              <Text>
                {I18n.t('screen.cart.deliveredIn')}
                {this.props.navigation.getParam('updateTime')}
              </Text>
            )}
          </Right>
        </Header>
        <List style={{backgroundColor: '#ffffff'}}>
          <CustomListItemHistoryDetail
            iconName="account-check"
            label={this.props.navigation.getParam('detailName')}
          />
          <CustomListItemHistoryDetail
            iconName="phone"
            label={this.props.navigation.getParam('detailPhone')}
          />
          <CustomListItemHistoryDetail
            iconName="truck-delivery"
            label={this.props.navigation.getParam('detailAddress')}
          />
        </List>
        <Container>
          <List>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                data={data.sort((after, before) =>
                  after.food_name.localeCompare(before.food_name),
                )}
                keyExtractor={({id}, index) => id}
                renderItem={(item) => this.renderItem(item)}
              />
            )}
          </List>
        </Container>
      </View>
    );
  }
}
