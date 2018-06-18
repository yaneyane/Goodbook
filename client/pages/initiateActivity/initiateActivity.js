var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  data: {
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    takeSession: false,
    requestResult: '',
    date : util.formatTime(new Date()),
    time: util.formatTime(new Date()),
    dates: '',
    times: ''
  },
  //点击时间组件确定事件  
  bindTimeChange: function (e) {
    var that = this;
    that.setData({
      times: e.detail.value
    })
    var str = that.data.dates + " " + that.data.times;
    var tmp = new Date(str);
    console.log("哇哈哈哈哈哈我要测试时间啦！")
    console.log(tmp);
    var tmp2 = new Date(that.data.date);
    console.log(tmp2);
    if(tmp < tmp2)
    {
      wx.showToast({
        title: '时间非法！',
        icon:'loading',
        duration:1500
      })
    }
  },
  //点击日期组件确定事件  
  bindDateChange: function (e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      dates: e.detail.value
    })
    var tmp = new Date(that.data.date);
    var tmp2 = new Date(that.data.dates);
    var tmp3 = tmp.getDate(tmp);
    var tmp4 = tmp2.getDate(tmp2);
    console.log(tmp3);
    console.log(tmp4);
    if(tmp3 > tmp4)
    {
      wx.showToast({
        title: '日期非法！',
        icon:'loading',
        duration: 1500
      }),

      that.setData({
        dates : ''
      })
      if(that.data.times != '')
      {
        that.setData({
          times : ''
        })
      }
    }
    console.log("当前的时间1！！");
    console.log(tmp);
    console.log(this.data.dates)
  },
  toast1Change: function (e) {
    this.setData({ toast1Hidden: true });
  },
  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
  },
  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  activity: function (e) {
    var that = this
    var flag = false
    var formData = {"ActivityName": e.detail.value.ActivityName, "Date": this.data.dates, "Time": this.data.times}
    e.detail.value = formData;
    if (e.detail.value.ActivityName.length == 0 || e.detail.value.Date.length == 0 || e.detail.value.Time.length == 0) {
      wx.showToast({
        title: '请填写完整信息!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
    else {
      wx.request({
        url: getApp().data.host_debug + '/Activity/create',
        data: e.detail.value,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          flag = true;
          wx.showToast({
            title: '填写成功!',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function () {
            wx.hideToast()
          }, 4000)
          wx.redirectTo({
            url: '/pages/createActivity/createActivity',
          })
        },
        fail: function (res) {
          console.log('submit fail too');
        },
        complete: function (res) {
          console.log('submit complete too');
        }
      })
    }
  },
  formReset: function () {
    console.log('form发生了reset事件');
    //this.modalTap2();
    var that = this;
    that.setData({
      date : '',
      dates: '',
      times: '',
      time : ''
    })
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