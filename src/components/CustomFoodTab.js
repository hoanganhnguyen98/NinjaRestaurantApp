import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Image,
  RefreshControl,
} from 'react-native';
import {List, ListItem, Text, Left, Body} from 'native-base';
import NumberFormat from 'react-number-format';
import {PropTypes} from 'prop-types';

import {Styles, Urls} from '../common';

export default class CustomFoodTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: 0,
      navigation: '',
      source: '',
      data: '',
      isLoading: true,
      refreshing: true,
    };
    this.getFoodListApi();
  }

  getFoodListApi() {
    fetch(Urls.APIUrl + 'food/index/' + this.props.source)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          refreshing: false,
          data: json.data,
        });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  onRefresh = () => {
    //Clear old data of the list
    this.setState({
      data: [],
    });
    //Call the Service to get the latest data
    this.getFoodListApi();
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

  render() {
    const {data, isLoading} = this.state;

    return (
      <View style={Styles.menu.foodList}>
        <List>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={
                this.props.sortBy == 0
                  ? data.sort((after, before) =>
                      after.name.localeCompare(before.name),
                    )
                  : this.props.sortBy == 1
                  ? data.sort((after, before) =>
                      before.name.localeCompare(after.name),
                    )
                  : this.props.sortBy == 2
                  ? data.sort((after, before) =>
                      after.price.localeCompare(before.price),
                    )
                  : this.props.sortBy == 3
                  ? data.sort((after, before) =>
                      before.price.localeCompare(after.price),
                    )
                  : data
              }
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
      </View>
    );
  }
}

// parameter source is require outside
CustomFoodTab.propTypes = {
  source: PropTypes.string.isRequired,
  navigation: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
};
