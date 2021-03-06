export default {
  restaurantName: 'Ninja Restaurant',
  email: 'Email',
  cancel: 'Cancel',
  networkChecking: {
    message: 'Disconnected Network',
    goTo: 'Go to Wi-Fi settings',
    exit: 'Exit App',
  },
  backButton: {
    message: 'Are you sure you want to exit?',
    exit: 'EXIT',
  },
  navigator: {
    menu: 'Menu',
    cart: 'Cart',
    aboutUs: 'About us',
    profile: 'Profile',
    foodDetail: 'Food detail',
    billDetail: 'Bill detail',
    changePassword: 'Change password',
    changeInformation: 'Change information',
    resetPassword: 'Reset password',
  },
  screen: {
    home: {
      main: {
        login: 'Login',
        register: 'Register',
        fullName: 'Full name',
        phoneNumber: 'Phone number',
        address: 'Address',
        password: 'Password',
        repassword: 'Re-password',
        forgetPassword: 'Forget password ',
      },
      reset: {
        enterYourEmail: 'Enter your email',
        sendRequest: 'Send request',
        checkCode: 'Check code',
        checkCodeFromEmail: 'check code from email',
        newPassword: 'New password',
        repeatNewPassword: 'Repeat new password',
        resetPassword: 'Reset password',
      },
    },
    menu: {
      headerTitleMenu: 'Menu',
      headerTitleSearch: 'Search',
      branch: {
        vietnam: 'Vietnam',
        japan: 'Japan',
        korea: 'Korea',
        china: 'China',
      },
      sortFoodBy: 'Sort food by',
      name: ' Name',
      price: ' Price',
      addToCart: 'add %{number} to cart',
      enterFoodName: '... enter food name',
    },
    cart: {
      headerTitle: 'Cart',
      headerTitleCart: 'Cart',
      headerTitleHistory: 'History',
      orderNow: 'Order now',
      updateCart: 'Update cart',
      cartIsEmpty: 'Cart is empty',
      orderedIn: 'Ordered in ',
      deliveredIn: 'Delivered in ',
      receivedIn: 'Received in ',
      confirmMessage: 'Confirm order information',
      customerName: 'Customer name ',
      phoneNumber: 'Phone number ',
      address: 'Address ',
      total: 'Total: ',
      order: 'Order',
      removeFoodMessage: 'Remove %{removeFoodName} from cart?',
      remove: 'Remove',
    },
    aboutUs: {
      intro: 'Intro',
      branch: 'Branch',
      contact: 'Contact',
      history: ' History',
      mission: ' Mission',
      coreValue: ' Core value',
      map: 'Map',
      call: 'Call',
      historyContent:
        'After 10 years of establishment and development,' +
        ' the restaurant has more branches in Hanoi, Ho Chi Minh and also in Kawasaki province in Japan,' +
        ' while expanding the scale of restaurants,' +
        ' improving the quality of the staff.' +
        ' Ninja Restaurant is pleased to have the famous detective Sherlock Holmes to open at the Kawasaki Japan branch.',
      missionContent:
        'With a passion for creativity and dedication, our mission is to bring customers the most amazing and novel experience in the style of Japanese Ninjas.',
      coreValueContent:
        'Together with our customers,' +
        ' we aim to expand our branches globally,' +
        ' as well as to bring more culinary experiences to regions around the world.',
    },
    profile: {
      headerTitle: 'Profile',
      personalInformation: 'Personal Information',
      settings: 'Settings',
      selectLanguages: 'Select languages',
      selectLanguagesMess: 'Restart to change languages',
      changeInformation: 'Change information',
      changePassword: 'Change password',
      save: 'Save',
      logout: 'Logout',
      change: 'Change',
      restart: 'Restart',
      wantSave: 'Do you want to save?',
      wantLogout: 'Do you want to logout?',
      wantChange: 'Do you want to change?',
      oldPassword: 'Old password',
      newPassword: 'New password',
      repeatNewPassword: 'Repeat new password',
    },
  },
  errors: {
    email: {
      invalid: 'Invalid email',
      message: 'Please check your email again!',
    },
    password: {
      password: {
        invalid: 'Invalid password',
        message: 'Password must be at least 6 characters!',
      },
      repassword: {
        invalid: 'Incorrect repassword',
        message: 'Repassword must match Password!',
      },
      old: {
        invalid: 'Old password is incorrect',
        message: 'Try again!',
      },
      checkCode: {
        invalid: 'Incorrect check code',
        message: 'Check your check code in email again!',
      },
    },
    login: {
      nullInput: 'Null Input',
      nullInputMess: 'Please fill both email and password to login!',
      fail: 'Login fail',
      failMess: 'Please check your email and password again!',
    },
    register: {
      nullInfo: 'Null information',
      nullInfoMess: 'Please fill all information!',
      invalidPhone: 'Invalid phone number',
      invalidPhoneMess: 'Phone must be 10 numbers!',
      fail: 'Register fail',
      failMess: 'Please check your information and try again!',
    },
    reset: {
      incorrectEmail: 'Incorrect email',
      incorrectEmailMess: 'Check your email and try again!',
      fail: 'Reset password fail',
      failMess: 'Check your information and try again!',
    },
    changePassword: {
      fail: 'Change password fail',
      failMess: 'Try again!',
    },
    changeInfo: {
      fail: 'Change information fail',
      failMess: 'Try again!',
    },
    addToCart: {
      fail: 'Add to cart fail',
      failMess: 'Try again!',
    },
    removeFood: {
      fail: 'Remove food fail',
      failMess: 'Try again!',
    },
    orderNow: {
      fail: 'Order food fail',
      failMess: 'Try again!',
    },
  },
  success: {
    register: {
      ok: 'Register successfully',
      message: 'Login now!',
    },
    reset: {
      ok: 'Reset password successfully',
      message: 'Login now!',
    },
    changePassword: {
      ok: 'Change password successfully',
      message: 'Login again now!',
    },
    addToCart: {
      ok: 'Add to cart successfully',
      message: 'Checking your cart for more detail!',
    },
    removeFood: {
      ok: 'Remove food successfully',
      message: 'Check food list again!',
    },
    orderNow: {
      ok: 'Order food successfully',
      message: 'Check order history again!',
    },
  },
};
