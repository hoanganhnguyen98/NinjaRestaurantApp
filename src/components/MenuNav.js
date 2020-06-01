/* eslint-disable no-alert */
import React, {Component} from 'react';
import {ActivityIndicator, FlatList, View, Image} from 'react-native';
import {
  Container,
  Tab,
  Tabs,
  Header,
  Button,
  Left,
  Right,
  Body,
  Title,
  Text,
  List,
  ListItem,
  Item,
  Input,
} from 'native-base';
import ActionSheet from 'react-native-actionsheet';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import NumberFormat from 'react-number-format';

import {Styles, Colors, Urls} from '../common';
import CustomFoodTab from './CustomFoodTab';
import I18n from '../i18n/i18n';

// const options = [
//   <Text>
//     <FAIcon name="sort-alpha-asc" size={20} />
//     {I18n.t('screen.menu.name')}
//   </Text>,
//   <Text>
//     <FAIcon name="sort-alpha-desc" size={20} />
//     {I18n.t('screen.menu.name')}
//   </Text>,
//   <Text>
//     <FAIcon name="sort-numeric-asc" size={20} />
//     {I18n.t('screen.menu.price')}
//   </Text>,
//   <Text>
//     <FAIcon name="sort-numeric-desc" size={20} />
//     {I18n.t('screen.menu.price')}
//   </Text>,
//   <Text style={{color: 'red'}}>{I18n.t('cancel')}</Text>,
// ];

export default class MenuNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      sortIconType: 'sort-alpha-asc',
      food: '',
      activeSearch: false,
      data: '',
      isLoading: true,
      disconnectedNetwork: false,
    };
    this.arrayholder = [];
  }

  componentDidMount = () => {
    // get food list to display
    fetch(Urls.APIUrl + 'food/index/all')
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          data: json.data,
        });
        this.arrayholder = json.data;
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  SearchFilterFunction = (food) => {
    //passing the inserted text in text input
    const newData = this.arrayholder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.name.toUpperCase();
      const textData = food.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on data source
      //After setting the data it will automatically re-render the view
      data: newData,
      food: food,
    });
  };

  renderItem = (data) => (
    <ListItem
      thumbnail
      noBorder
      onPress={() =>
        this.props.navigation.navigate('FoodDetail', {
          detailId: data.item.id,
          detailImage: data.item.image,
          detailName: data.item.name,
          detailMaterial: data.item.material,
          detailPrice: data.item.price,
        })
      }>
      <Left>
        <Image
          square
          source={{uri: data.item.image}}
          style={Styles.menu.foodImage}
        />
      </Left>
      <Body>
        <Text>{data.item.name}</Text>
        <Text note numberOfLines={1}>
          {data.item.source}
        </Text>
        <Text note numberOfLines={1}>
          {data.item.material}
        </Text>
        <NumberFormat
          value={data.item.price}
          displayType={'text'}
          thousandSeparator="."
          decimalSeparator=","
          suffix={' VND'}
          renderText={(value) => (
            <Text style={{color: 'red'}} note numberOfLines={1}>
              {value}
            </Text>
          )}
        />
      </Body>
    </ListItem>
  );

  toggleSearch = () => {
    this.setState({activeSearch: !this.state.activeSearch});
  };

  sortFood = (index) => {
    switch (index) {
      case 0:
        this.setState({
          index: index,
          sortIconType: 'sort-alpha-asc',
        });
        break;
      case 1:
        this.setState({
          index: index,
          sortIconType: 'sort-alpha-desc',
        });
        break;
      case 2:
        this.setState({
          index: index,
          sortIconType: 'sort-numeric-asc',
        });
        break;
      case 3:
        this.setState({
          index: index,
          sortIconType: 'sort-numeric-desc',
        });
        break;

      default:
        break;
    }
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    const {isLoading} = this.state;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Image
                source={require('../assets/img/logo.jpg')}
                style={Styles.logo}
              />
            </Button>
          </Left>
          <Body>
            <Title>
              {!this.state.activeSearch
                ? I18n.t('screen.menu.headerTitleMenu')
                : I18n.t('screen.menu.headerTitleSearch')}
            </Title>
          </Body>
          <Right>
            <Button transparent onPress={this.toggleSearch}>
              <MCIcon
                name={this.state.activeSearch ? 'filter-remove' : 'filter'}
                size={25}
                style={{color: '#ffffff'}}
              />
            </Button>
            <Button transparent onPress={this.showActionSheet}>
              <FAIcon
                name={this.state.sortIconType}
                size={20}
                style={{color: '#ffffff'}}
              />
            </Button>
          </Right>
        </Header>
        {!this.state.activeSearch ? null : (
          <Header searchBar rounded>
            <Item>
              <FAIcon
                name="filter"
                color={Colors.appColor}
                size={20}
                style={{marginLeft: 10}}
              />
              <Input
                placeholder={I18n.t('screen.menu.enterFoodName')}
                onChangeText={(food) => this.SearchFilterFunction(food)}
              />
            </Item>
          </Header>
        )}
        {!this.state.activeSearch ? (
          <Tabs>
            <Tab heading={I18n.t('screen.menu.branch.vietnam')}>
              <CustomFoodTab
                source="Vietnam"
                sortBy={this.state.index}
                navigation={this.props.navigation}
              />
            </Tab>
            <Tab heading={I18n.t('screen.menu.branch.japan')}>
              <CustomFoodTab
                source="Japan"
                sortBy={this.state.index}
                navigation={this.props.navigation}
              />
            </Tab>
            <Tab heading={I18n.t('screen.menu.branch.korea')}>
              <CustomFoodTab
                source="Korea"
                sortBy={this.state.index}
                navigation={this.props.navigation}
              />
            </Tab>
            <Tab heading={I18n.t('screen.menu.branch.china')}>
              <CustomFoodTab
                source="China"
                sortBy={this.state.index}
                navigation={this.props.navigation}
              />
            </Tab>
          </Tabs>
        ) : (
          <View style={Styles.menu.foodList}>
            <List>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <FlatList
                  data={
                    this.state.index == 0
                      ? this.state.data.sort((after, before) =>
                          after.name.localeCompare(before.name),
                        )
                      : this.state.index == 1
                      ? this.state.data.sort((after, before) =>
                          before.name.localeCompare(after.name),
                        )
                      : this.state.index == 2
                      ? this.state.data.sort((after, before) =>
                          after.price.localeCompare(before.price),
                        )
                      : this.state.index == 3
                      ? this.state.data.sort((after, before) =>
                          before.price.localeCompare(after.price),
                        )
                      : this.state.data
                  }
                  keyExtractor={({id}, index) => id}
                  renderItem={(item) => this.renderItem(item)}
                />
              )}
            </List>
          </View>
        )}
        {/* Select way to display item list */}
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={I18n.t('screen.menu.sortFoodBy')}
          options={[
            <Text>
              <FAIcon name="sort-alpha-asc" size={20} />
              {I18n.t('screen.menu.name')}
            </Text>,
            <Text>
              <FAIcon name="sort-alpha-desc" size={20} />
              {I18n.t('screen.menu.name')}
            </Text>,
            <Text>
              <FAIcon name="sort-numeric-asc" size={20} />
              {I18n.t('screen.menu.price')}
            </Text>,
            <Text>
              <FAIcon name="sort-numeric-desc" size={20} />
              {I18n.t('screen.menu.price')}
            </Text>,
            <Text style={{color: 'red'}}>{I18n.t('cancel')}</Text>,
          ]}
          cancelButtonIndex={4}
          destructiveButtonIndex={1}
          onPress={(index) => {
            this.sortFood(index);
          }}
        />
      </Container>
    );
  }
}
