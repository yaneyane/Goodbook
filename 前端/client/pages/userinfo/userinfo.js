// pages/user2/user2.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {

  }, 
  /**
   * 生命周期函数--监听页面加载
   */

  recipient: function (e) {
    var that = this
    if (e.detail.value.UserName.length == 0 || e.detail.value.PhoneNo.length == 0 || e.detail.value.Address.length == 0) {
      wx.showToast({
        title: '请填写完整个人信息',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
    else {
      //取用户数据
      var that = this; 
      wx.request({
        url: getApp().data.host_debug + '/Recipient/create',
        data: e.detail.value,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          console.log(open),
          console.log('submit success recipient create');
          console.log(res.data);
          console.log('test recipient');

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
  submit: function(){
    wx.navigateTo({
      url: '/pages/submitSuccess/submitSuccess',
    })
  },

  onLoad:function(options)
  {
    var that = this;
    qcloud.login({
      success(result) {
        if (result) {
          that.setData({
            userInfo: result,
            logged: true
          })
          console.log(that.data.userInfo);
          console.log(that.data.userInfo["openId"]);
          wx.request({
            url: getApp().data.host_debug + '/Recipient/create',
            data: {
              "openID": that.data.userInfo["openId"]
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              console.log(open),
                console.log('submit success openid');
              console.log(res.data);
              console.log('test openid');
            }
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              that.setData({
                userInfo: result.data.data,
                logged: true
              })
              console.log(that.data.userInfo);
              console.log("Testsg");
              console.log(that.data.userInfo["openId"]);
              wx.request({
                url: getApp().data.host_debug + '/Recipient/create',
                data: {
                  "openID": that.data.userInfo["openId"]
                },
                method: 'POST',
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                success: function (res) {
                  console.log(open),
                    console.log('submit success openid');
                  console.log(res.data);
                  console.log('test openid');
                }})
            },
            fail(error) {
              console.log('request fail', error)
            }
          })
        }
      },
      fail(error) {
        console.log('登录失败', error)
      }
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
  
  },
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    wx.request({
      url: '',
      data: formData,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.modalTap();
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件');
    this.modalTap2();
  }  
})