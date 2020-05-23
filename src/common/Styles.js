import Colors from './Colors';

const Styles = {
  logo: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  menu: {
    foodList: {
      flex: 1,
      padding: 5,
    },
    foodImage: {
      width: 100,
      height: 60,
      borderRadius: 3,
    },
  },
  cart: {
    headerCart: {
      backgroundColor: '#ffffff',
      borderBottomWidth: 1,
    },
  },
  aboutus: {
    coverImage: {
      height: 80,
      width: null,
      flex: 1,
      borderRadius: 5,
    },
    addressImage: {
      width: null,
      height: 80,
      borderRadius: 5,
    },
    iconBorder: {
      borderLeftWidth: 2,
      borderLeftColor: Colors.appColor,
      alignItems: 'center',
    },
    branchBorder: {
      borderBottomWidth: 3,
      borderBottomColor: Colors.appColor,
    },
    introTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      color: Colors.appColor,
    },
  },
  foodDetail: {
    image: {
      height: 200,
      width: null,
      flex: 1,
      padding: 10,
      borderRadius: 10,
    },
  },
};

export default Styles;
