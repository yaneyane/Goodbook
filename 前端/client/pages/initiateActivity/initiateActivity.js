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
  //  点击时间组件确定事件  
  bindTimeChange: function (e) {
    var that = this;
    this.setData({
      times: e.detail.value
    }),
    console.log(this.data.times)
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    var that = this;
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    }),
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
      wx.navigateTo({
        url: '/pages/createActivity/createActivity',
      }),
      wx.request({
        url: getApp().data.host_debug + '/Activity/create',
        data: e.detail.value,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          console.log('submit success activity create');
          console.log(res.data);
          console.log('test');
          flag = true;
          wx.showToast({
            title: '填写成功!',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function () {
            wx.hideToast()
          }, 2000)
          wx.navigateTo({
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
    this.modalTap2();
  } ,
})