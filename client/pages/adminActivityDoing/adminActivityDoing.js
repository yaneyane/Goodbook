var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var activityArray;
var activityJson;
var activityJsonStr;
var doingActivity;
var list;
Page({
  data: {
    doingActivity: '',
    index:''
  },
  onLoad: function (options) {
    activityArray = new Array();
    var that = this
    wx.request({
      url: getApp().data.host_debug + '/Activity0/index',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if(!res.data.activity)
        {
          wx.showModal({
            title: '友情提示',
            content: '当前没有正在进行的活动！',
          })
        }
        else 
        {
          var tmp = res.data.activity
          delete tmp.flag
          that.setData({
            doingActivity: res.data.activity
          });
        }
      },
      fail: function (res) {
        console.log('submit fail too');
      },
      complete: function (res) {
        console.log('submit complete too');
      }
    })
  },
  finish: function (e) {
    var that = this;
    var i = e.currentTarget.dataset.index;
    console.log(that.data.doingActivity);
    var data = that.data.doingActivity[i].ActivityID;
    wx.request({
      url: getApp().data.host_debug + '/Lottery/get_lottery',
      data:
      {
        "ActivityID": data,
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        wx.showToast({
          title: '结束成功!',
          icon: 'success',
          duration: 1500
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      },
      fail: function (res) {
        console.log('submit fail too');
      },
      complete: function (res) {
        console.log('submit complete too');
      }
    })
    
  },
  checkinfo: function (e) {
    var that = this
    var i = e.currentTarget.dataset.index;
    wx.request({
      url: getApp().data.host_debug + '/Activity0/index',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var endTime = res.data.activity[i].EndTime;
        var tmp = new Date(endTime);
        var time = util.formatTime(new Date());  //获取当前时间
        var dd;
        if (time) {
          dd = new Date(time);
        } else {
          dd = new Date();
        }
        dd.setDate(dd.getDate() + 3);//获取AddDayCount天后的日期 
        if (dd > tmp) {
          wx.showToast({
            title: '活动结束三天后方可查看用户信息！',
            icon: 'loading',
            duration: 1500
          })
        }
        else {
          var ID = that.data.doingActivity[i].ActivityID;
          var url = 'http://kpveyqkv.qcloud.la/activity/create1/' + ID;
          wx.setClipboardData({
            data: url,
            success: function (res) {
              wx.showModal({
                title: '提示',
                content: '复制成功,请在浏览器端打开！',
                success: function (res) {
                  if (res.confirm) {
                    console.log('确定')
                  } else if (res.cancel) {
                    console.log('取消')
                  }
                }
              })
            }
          })
        }
      },
      fail: function (res) {
        console.log(res);
        console.log('submit fail too');
      },
      complete: function (res) {
        console.log('submit complete too');
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

  }
})
