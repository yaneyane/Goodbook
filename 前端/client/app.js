//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },
    data:{
      host_debug:"http://kpveyqkv.qcloud.la",
      host:""
    },
    getUserInfo: function (cb) {
      var that = this
      if (this.globalData.personInfo) {
        typeof cb == "function" && cb(this.globalData.personInfo)
      } else {
        //调用登录接口
        wx.login({
          success: function () {
            wx.getUserInfo({
              success: function (res) {
                that.globalData.personInfo = res.userInfo
                typeof cb == "function" && cb(that.globalData.personInfo)
              }
            })
          }
        })
      }
    }
})
