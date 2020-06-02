import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Image,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Header,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Button,
  CardItem,
  Item,
  Input,
  Label,
} from 'native-base';
import NumberFormat from 'react-number-format';
import Modal from 'react-native-modal';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import LoadingModal from '../LoadingModal';
import showMessage from '../MessagesAlert';
import {Urls, Styles} from '../../common';
import I18n from '../../i18n/i18n';
import CustomConfirmModal from '../CustomConfirmModal';

export default class CurrentTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      isLoading: true,
      refreshing: true,
      totalPrice: 0,
      email: '',
      name: '',
      phone: '',
      address: '',
      id: '',
      requestIsSending: false,
      isModalVisible: false,
      isRemoveFood: false,
      removeFoodId: null,
      removeFoodName: null,
    };

    this.GetData();
    this.onRefresh = this.onRefresh.bind(this);
  }

  getPrice = (a, b) => {
    return a * b;
  };

  GetData = async () => {
    this.setState({isLoading: true});
    var userId = await AsyncStorage.getItem('userId');

    fetch(Urls.APIUrl + 'cart/currentcart/' + userId)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          refreshing: false,
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

  removeCart = (id) => {
    //start loading modal while fetching
    this.setState({
      isRemoveFood: !this.state.isRemoveFood,
      requestIsSending: true,
    });

    fetch(Urls.APIUrl + 'cart/currentcart/remove/' + id)
      .then((response) => response.json())
      .then((json) => {
        //end loading modal
        this.setState({
          requestIsSending: false,
        });

        if (json.success === true) {
          showMessage(
            I18n.t('success.removeFood.ok'),
            I18n.t('success.removeFood.message'),
          );
        } else {
          showMessage(
            I18n.t('errors.removeFood.fail'),
            I18n.t('errors.removeFood.failMess'),
          );
        }
      })
      .catch((error) => console.error(error));
    this.onRefresh();
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  confirmOrder = async () => {
    if (this.state.totalPrice === 0) {
      showMessage('No item to order', '');
    } else {
      this.setState({
        id: await AsyncStorage.getItem('userId'),
        email: await AsyncStorage.getItem('userEmail'),
        name: await AsyncStorage.getItem('userName'),
        phone: await AsyncStorage.getItem('userPhone'),
        address: await AsyncStorage.getItem('userAddress'),
        isModalVisible: !this.state.isModalVisible,
      });
    }
  };

  orderNow = () => {
    //start loading modal while fetching
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      requestIsSending: true,
    });

    fetch(Urls.APIUrl + 'cart/currentcart/order', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.state.id,
        email: this.state.email,
        name: this.state.name,
        phone: this.state.phone,
        address: this.state.address,
        total_price: this.state.totalPrice,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        //end loading modal
        this.setState({
          requestIsSending: false,
        });

        if (json.success === true) {
          showMessage(
            I18n.t('success.orderNow.ok'),
            I18n.t('success.orderNow.message'),
          );
          this.onRefresh();
        } else {
          showMessage(
            I18n.t('errors.orderNow.fail'),
            I18n.t('errors.orderNow.failMess'),
          );
        }
      })
      .catch((error) => console.error(error));
  };

  onRefresh = () => {
    //Clear old data of the list
    this.setState({
      data: [],
      totalPrice: 0,
    });
    //Call the Service to get the latest data
    this.GetData();
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
      <Right>
        <Button
          transparent
          onPress={() =>
            this.setState({
              removeFoodId: data.item.id,
              removeFoodName: data.item.food_name,
              isRemoveFood: !this.state.isRemoveFood,
            })
          }>
          <MCIcon name="cart-remove" color="red" size={25} />
        </Button>
      </Right>
    </ListItem>
  );

  render() {
    const {data, isLoading} = this.state;

    return (
      <View style={Styles.menu.foodList}>
        <LoadingModal requestIsSending={this.state.requestIsSending} />
        <Header style={Styles.cart.headerCart}>
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
            {this.state.totalPrice === 0 ? (
              <Button danger block rounded onPress={() => this.onRefresh()}>
                <Text>{I18n.t('screen.cart.updateCart')}</Text>
              </Button>
            ) : (
              <Button block rounded onPress={() => this.confirmOrder()}>
                <Text>{I18n.t('screen.cart.orderNow')}</Text>
              </Button>
            )}
          </Right>
        </Header>
        <Container>
          <List>
            {isLoading ? (
              <ActivityIndicator />
            ) : this.state.totalPrice === 0 ? (
              <Button danger block transparent style={{marginTop: 100}}>
                <Text>{I18n.t('screen.cart.cartIsEmpty')}</Text>
              </Button>
            ) : (
              <FlatList
                data={data.sort((after, before) =>
                  before.created_at.localeCompare(after.created_at),
                )}
                keyExtractor={({id}, index) => id}
                renderItem={(item) => this.renderItem(item)}
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

        {/* Modal to confirm to remove food */}
        <CustomConfirmModal
          isModalVisible={this.state.isRemoveFood}
          message={I18n.t('screen.cart.removeFoodMessage', {
            removeFoodName: this.state.removeFoodName,
          })}
          actionName={I18n.t('screen.cart.remove')}
          onPressMainAction={() => this.removeCart(this.state.removeFoodId)}
          onPressToggleModal={() =>
            this.setState({
              removeFoodId: null,
              removeFoodName: null,
              isRemoveFood: !this.state.isRemoveFood,
            })
          }
        />

        {/* Modal to confirm to order */}
        <Modal isVisible={this.state.isModalVisible}>
          <View
            style={{backgroundColor: '#ffffff', padding: 30, borderRadius: 10}}>
            <Button transparent block>
              <Text>{I18n.t('screen.cart.confirmMessage')}</Text>
            </Button>
            <CardItem>
              <Item stackedLabel>
                <Label>
                  {I18n.t('screen.cart.customerName')}
                  <MCIcon name="pencil" />
                </Label>
                <Input
                  defaultValue={this.state.name}
                  onChangeText={(name) => this.setState({name})}
                />
              </Item>
            </CardItem>
            <CardItem>
              <Item stackedLabel>
                <Label>
                  {I18n.t('screen.cart.phoneNumber')}
                  <MCIcon name="pencil" />
                </Label>
                <Input
                  defaultValue={this.state.phone}
                  onChangeText={(phone) => this.setState({phone})}
                />
              </Item>
            </CardItem>
            <CardItem>
              <Item stackedLabel>
                <Label>
                  {I18n.t('screen.cart.address')}
                  <MCIcon name="pencil" />
                </Label>
                <Input
                  defaultValue={this.state.address}
                  onChangeText={(address) => this.setState({address})}
                />
              </Item>
            </CardItem>
            <CardItem>
              <Text>
                {I18n.t('screen.cart.total')}
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
              </Text>
            </CardItem>
            <CardItem>
              <Left>
                <Button
                  block
                  rounded
                  danger
                  onPress={() =>
                    this.setState({
                      isModalVisible: !this.state.isModalVisible,
                    })
                  }>
                  <Text>{I18n.t('cancel')}</Text>
                </Button>
              </Left>
              <Body>
                <Button block rounded onPress={this.orderNow}>
                  <Text>{I18n.t('screen.cart.order')}</Text>
                </Button>
              </Body>
            </CardItem>
          </View>
        </Modal>
      </View>
    );
  }
}
