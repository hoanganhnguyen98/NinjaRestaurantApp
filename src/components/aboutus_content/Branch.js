import React, {Component} from 'react';
import {List, Content} from 'native-base';

import CustomBranch from './CustomBranch';

export default class Branch extends Component {
  render() {
    return (
      <Content>
        <List>
          <CustomBranch
            image="v1586859974/ninja_restaurant/res-image/bxqzkpo1zxf55dxi0ap2.jpg"
            address="n, Hoang Dieu, Ba Dinh, Ha Noi City"
            phone="0123456789"
          />
          <CustomBranch
            image="v1586859975/ninja_restaurant/res-image/nz5vxylg55fecwfzhafu.jpg"
            address="x, Truong Chinh, Thanh Xuan, Ha Noi City"
            phone="0123456789"
          />
          <CustomBranch
            image="v1586859974/ninja_restaurant/res-image/brucbhk2laop5e8pjwuk.jpg"
            address="h, Dai Co Viet, Hai Ba Trung, Ha Noi City"
            phone="0123456789"
          />
          <CustomBranch
            image="v1586860270/ninja_restaurant/res-image/kecg5vh0w4rcxh3a7igq.jpg"
            address="51 floor, Bitexco Buidling, 2, Hai Trieu, Ben Nghe, 1 District, Ho Chi Minh City"
            phone="0123456789"
          />
          <CustomBranch
            image="v1586859974/ninja_restaurant/res-image/lhva452uvjqfrjytiyap.jpg"
            address="13 floor, Vincom Landmark 81 Buidling, Tan Cang, Binh Thanh District, Ho Chi Minh City"
            phone="0123456789"
          />
          <CustomBranch
            image="v1586859974/ninja_restaurant/res-image/njgouvlbnr2lkhncg9id.jpg"
            address="Tho Nghiep, Xuan Truong, Nam Dinh"
            phone="0123456789"
          />
          <CustomBranch
            image="v1586859975/ninja_restaurant/res-image/xnseub6mrhq2ytdtjdam.jpg"
            address="2-8-1, Nagao, Tama-ku, Kawasaki 214-0023, Kanagawa"
            phone="0123456789"
          />
        </List>
      </Content>
    );
  }
}
