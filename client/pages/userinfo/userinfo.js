var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  data: {

  },
  recipient: function (e) {
      var that = this; 
      var username=e.detail.value.UserName;
      var PhoneNo=e.detail.value.PhoneNo;
      var Address = e.detail.value.Address;
      var regUser = /^[a-zA-Z0-9_\u4e00-\u9fa5\uf900 - \ufa2d·s]+$/;//判断是否包括字母数字下划线中文
      if(username.length == 0)
      {
        wx.showToast({
          title: '请填写姓名！',
          icon:'loading',
          duration:1500
        })
      }
      else if(!regUser.test(username))
      {
        wx.showToast({
          title: '姓名格式错误！',
          icon:'loading',
          duration:1500
        })
      }
      else if(PhoneNo.length == 0)
      {
        wx.showToast({
          title: '请填写电话！',
          icon: 'loading',
          duration:1500
        })
      }
      else 
      {
        var reg = /^[0-9]+.?[0-9]*$/;
        if (!reg.test(PhoneNo)) {
          wx.showToast({
            title: '电话格式错误！',
            icon: 'loading',
            duration: 1500
          })
        }
        else if (PhoneNo.length != 11) {
          wx.showToast({
            title: '电话号码错误！',
            icon: 'loading',
            duration: 1500
          })
        } 
        else if (Address.length == 0) {
          wx.showToast({
            title: '请填写地址！',
            icon: 'loading',
            duration: 1500
          })
        }
        else 
        {
          qcloud.login({
            success(result) {
              if (result) {
                that.setData({
                  userInfo: result,
                  logged: true
                })
                var tmp = that.data.userInfo["openId"];
                console.log("WAWAWA");
                console.log(tmp);
                wx.request({
                  url: getApp().data.host_debug + '/Recipient/create',
                  data: {
                    "UserName": e.detail.value.UserName,
                    "PhoneNo": e.detail.value.PhoneNo,
                    "Address": e.detail.value.Address,
                    "ActivityID": getApp().globalData.UserAcID,
                    "openID": tmp
                  },
                  method: 'POST',
                  header: { 'content-type': 'application/x-www-form-urlencoded' },
                  success: function (res) {
                    console.log('submit success recipient create');
                    wx.showToast({
                      title: '填写成功!',
                      icon: 'success',
                      duration: 1500
                    })
                    setTimeout(function () {
                      wx.hideToast()
                    }, 2000)
                    wx.redirectTo({
                      url: '../../pages/awardSituation/awardSituation',
                    })
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
                    var tmp = that.data.userInfo["openId"];
                    wx.request({
                      url: getApp().data.host_debug + '/Recipient/create',
                      data: {
                        "UserName": e.detail.value.UserName,
                        "PhoneNo": e.detail.value.PhoneNo,
                        "Address": e.detail.value.Address,
                        "ActivityID": getApp().globalData.UserAcID,
                        "openID": tmp
                      },
                      method: 'POST',
                      header: { 'content-type': 'application/x-www-form-urlencoded' },
                      success: function (res) {
                        console.log('submit success recipient create');
                        wx.showToast({
                          title: '填写成功!',
                          icon: 'success',
                          duration: 1500
                        })
                        setTimeout(function () {
                          wx.hideToast()
                        }, 2000)
                        wx.redirectTo({
                          url: '../../pages/awardSituation/awardSituation',
                        })
                      }
                    })
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
        }    
      }
  },
  submit: function(){
    wx.navigateTo({
      url: '/pages/submitSuccess/submitSuccess',
    })
  },
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

  onLoad:function(options)
  {
    var that = this;
    
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
      data: 
      {
        formData,
        
      },
      
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