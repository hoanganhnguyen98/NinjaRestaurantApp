import Colors from './Colors';

const Styles = {
  // logo in custom Header
  logo: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },

  // wait screen when check if email and pass stored
  startScreen: {
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  startScreenBg: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
  },

  // modal loading while fetching api
  loadingModal: {
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 100,
      width: 100,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
  },

  networkModal: {
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040',
    },
    activeModal: {
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      height: 120,
      width: 300,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    functionView: {
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    functionText: {
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },

  // styles in bottom tab
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
