import React, { Component } from 'react';

export default class APICall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      isLoading: true
    };
  }

  getFoodListApi(source) {
    fetch('https://ninja-restaurant.herokuapp.com/api/food/index/'+source)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.data });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
    return {data, isLoading};
  }
};

export const getFoodListApi = (source) => {
  var data, isLoading = true;

  fetch('https://ninja-restaurant.herokuapp.com/api/food/index/'+source)
      .then((response) => response.json())
      .then((json) => {
        data = json.data;
      })
      .catch((error) => console.error(error))
      .finally(() => {
        isLoading = false;
      });
      console.log(isLoading);
  return {data, isLoading};
};