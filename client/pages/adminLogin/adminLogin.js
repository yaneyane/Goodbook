Page({data: {originalphone: 'wjq',originalPassword: '123123',phone: '',password: ''
  },
  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  //登录
  login: function () {
    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } 
    else {
      if (this.data.phone == this.data.originalphone && this.data.originalPassword == this.data.password) {
        wx.showToast({
          title: '登录成功!',
          icon: 'success',
          duration: 1500
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
          wx.redirectTo({
            url: '/pages/adminIndex/adminIndex',
          })
      }
      else {
        wx.showToast({
          title: '信息错误!',
          icon: 'loading',
          duration: 1500
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})