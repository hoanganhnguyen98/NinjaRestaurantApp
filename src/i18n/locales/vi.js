export default {
  restaurantName: 'Nhà hàng Ninja',
  email: 'Hòm thư',
  cancel: 'Hủy',
  networkChecking: {
    message: 'Mất kết nối mạng',
    goTo: 'Cài đặt Wi-Fi',
    exit: 'Thoát',
  },
  backButton: {
    message: 'Bạn có chắc muốn thoát không?',
    exit: 'THOÁT',
  },
  navigator: {
    menu: 'Thực đơn',
    cart: 'Giỏ hàng',
    aboutUs: 'Về chúng tôi',
    profile: 'Hồ sơ',
    foodDetail: 'Chi tiết món ăn',
    billDetail: 'Chi tiết hóa đơn',
    changePassword: 'Thay đổi mật khẩu',
    changeInformation: 'Thay đổi thông tin',
    resetPassword: 'Tạo mới mật khẩu',
  },
  screen: {
    home: {
      main: {
        login: 'Đăng nhập',
        register: 'Đăng ký',
        fullName: 'Họ và tên',
        phoneNumber: 'Số điện thoại',
        address: 'Địa chỉ',
        password: 'Mật khẩu',
        repassword: 'Nhập lại mật khẩu',
        forgetPassword: 'Quên mật khẩu ',
      },
      reset: {
        enterYourEmail: 'Nhập hòm thư',
        sendRequest: 'Gửi yêu cầu',
        checkCode: 'Mã kiểm tra',
        checkCodeFromEmail: 'mã kiểm tra trong hòm thư',
        newPassword: 'Mật khẩu mới',
        repeatNewPassword: 'Xác nhận mật khẩu',
        resetPassword: 'Tạo mới mật khẩu',
      },
    },
    menu: {
      headerTitleMenu: 'Thực đơn',
      headerTitleSearch: 'Tìm kiếm',
      branch: {
        vietnam: 'Việt Nam',
        japan: 'Nhật Bản',
        korea: 'Hàn Quốc',
        china: 'Trung Hoa',
      },
      sortFoodBy: 'Sắp xếp theo',
      name: ' Tên',
      price: ' Giá',
      addToCart: 'Thêm %{number} vào giỏ',
      enterFoodName: '... nhập tên món ăn',
    },
    cart: {
      headerTitle: 'Giỏ hàng',
      headerTitleCart: 'Giỏ hàng',
      headerTitleHistory: 'Lịch sử',
      orderNow: 'Đặt ngay',
      updateCart: 'Cập nhật',
      cartIsEmpty: 'Giỏ hàng trống',
      orderedIn: 'Đã đặt lúc ',
      deliveredIn: 'Đã giao lúc ',
      receivedIn: 'Đã nhận lúc ',
      confirmMessage: 'Xác nhận thông tin đặt món',
      customerName: 'Tên khách hàng ',
      phoneNumber: 'Số điện thoại ',
      address: 'Địa chỉ ',
      total: 'Tổng: ',
      order: 'Đặt món',
      removeFoodMessage: 'Xóa %{removeFoodName} khỏi giỏ?',
      remove: 'Xóa',
    },
    aboutUs: {
      intro: 'Giới thiệu',
      branch: 'Chi nhánh',
      contact: 'Liên hệ',
      history: ' Lịch sử',
      mission: ' Sứ mệnh',
      coreValue: ' Giá trị cốt lõi',
      map: 'Bản đồ',
      call: 'Gọi',
      historyContent:
        'Sau 10 năm hình thành và phát triển,' +
        ' nhà hàng đã có thêm các chi nhánh ở Hà Nội, Hồ Chí Minh và cả ở tỉnh Kawasaki ở Nhật Bản,' +
        ' đồng thời mở rộng quy mô các nhà hàng,' +
        ' nâng cao chất lượng đội ngũ nhân viên.' +
        ' Nhà hàng Ninja hân hạnh được thám tử lừng danh Sherlock Holmes đến khai trương tại chi nhánh Kawasaki Nhật Bản, đánh dấu sự mở rộng toàn cầu của nhà hàng.',
      missionContent:
        'Với niềm đam mê sáng tạo cùng sự cống hiến, sứ mệnh của chúng tôi là đưa đến cho khách hàng trải nghiệm tuyệt vời nhất, mới lạ nhất theo phong cách của huyền thoại Ninja Nhật Bản.',
      coreValueContent:
        'Cùng sự đồng hành của khách hàng,' +
        ' chúng tôi tiến tới mở rộng các chi nhánh trên toàn cầu,' +
        ' cũng như đem lại nhiều hơn sự trải nghiệm ẩm thực của các vùng miền trên toàn thế giới.',
    },
    profile: {
      headerTitle: 'Hồ sơ',
      personalInformation: 'Thông tin cá nhân',
      settings: 'Cài đặt',
      selectLanguages: 'Chọn ngôn ngữ',
      selectLanguagesMess: 'Khởi động lại để thay đổi',
      changeInformation: 'Thay đổi thông tin',
      changePassword: 'Thay đổi mật khẩu',
      save: 'Lưu',
      logout: 'Đăng xuất',
      change: 'Thay đổi',
      restart: 'Cứ vậy đi',
      wantSave: 'Bạn có muốn lưu?',
      wantLogout: 'Bạn có muốn đăng xuất?',
      wantChange: 'Bạn có muốn thay đổi?',
      oldPassword: 'Mật khẩu cũ',
      newPassword: 'Mật khẩu mới',
      repeatNewPassword: 'Xác nhận mật khẩu',
    },
  },
  errors: {
    email: {
      invalid: 'Hòm thư không hợp lệ',
      message: 'Kiểm tra lại hòm thư!',
    },
    password: {
      password: {
        invalid: 'Mật khẩu không hợp lệ',
        message: 'Mật khẩu phải có ít nhất 6 kí tự!',
      },
      repassword: {
        invalid: 'Xác nhận mật khẩu sai',
        message: 'Xác nhận mật khẩu phải trùng khớp!',
      },
      old: {
        invalid: 'Mật khẩu cũ không đúng',
        message: 'Thử lại!',
      },
      checkCode: {
        invalid: 'Mã kiểm tra không đúng',
        message: 'Kiểm tra lại mã trong hòm thư!',
      },
    },
    login: {
      nullInput: 'Thông tin rỗng',
      nullInputMess: 'Điền hòm thư và mật khẩu để đăng nhập!',
      fail: 'Đăng nhập lỗi',
      failMess: 'Hãy kiểm tra lại hòm thư và mật khẩu!',
    },
    register: {
      nullInfo: 'Thông tin trống',
      nullInfoMess: 'Hãy điền đầy đủ thông tin!',
      invalidPhone: 'Số điện thoại không hợp lệ',
      invalidPhoneMess: 'Số điện thoại phải có 10 số!',
      fail: 'Đăng ký lỗi',
      failMess: 'Hãy kiểm tra thông tin và thử lại!',
    },
    reset: {
      incorrectEmail: 'Hòm thư không đúng',
      incorrectEmailMess: 'Kiểm tra hòm thư và thử lại!',
      fail: 'Tạo mới mật khẩu lỗi',
      failMess: 'Kiểm tra thông tin và thử lại!',
    },
    changePassword: {
      fail: 'Thay đổi mật khẩu lỗi',
      failMess: 'Hãy thử lại!',
    },
    changeInfo: {
      fail: 'Thay đổi thông tin lỗi',
      failMess: 'Hãy thử lại',
    },
    addToCart: {
      fail: 'Thêm vào giỏ lỗi',
      failMess: 'Hãy thử lại',
    },
    removeFood: {
      fail: 'Xóa món ăn lỗi',
      failMess: 'Hãy thử lại',
    },
    orderNow: {
      fail: 'Đặt món lỗi',
      failMess: 'Hãy thử lại',
    },
  },
  success: {
    register: {
      ok: 'Đăng ký thành công',
      message: 'Đăng nhập ngay bây giờ!',
    },
    reset: {
      ok: 'Tạo mới mật khẩu thành công',
      message: 'Đăng nhập ngay bây giờ!',
    },
    changePassword: {
      ok: 'Thay đổi mật khẩu thành công',
      message: 'Hãy đăng nhập lại!',
    },
    addToCart: {
      ok: 'Thêm vào giỏ thành công',
      message: 'Kiểm tra giỏ hàng để thêm chi tiết!',
    },
    removeFood: {
      ok: 'Xóa món ăn thành công',
      message: 'Kiểm tra lại danh sách!',
    },
    orderNow: {
      ok: 'Đặt món thành công',
      message: 'Kiểm tra lại lịch sử!',
    },
  },
};
