var activityArray;
var activityJson;
var activityJsonStr;
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  data: {
    adminActivityDone:''
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: getApp().data.host_debug + '/Activity1/index',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data);
        if(!res.data.activity || res.data.flag == 1)
        {
          wx.showModal({
            title: '友情提示',
            content: '当前没有已结束的活动！',
          })
        }
        else 
        {
          var tmp = res.data.activity;
          delete tmp.flag;
          that.setData({
            adminActivityDone: tmp
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
  forbid: function(e){
    var that = this
    var i = e.currentTarget.dataset.index;
    var ID = that.data.adminActivityDone[i].ActivityID;
    //ID为当前选中的活动的ID
    wx.request({
      url: getApp().data.host_debug + '/Activity1/change',
      data:{
        "ActivityID": ID
      },
      method:'POST',
      header:{'content-type': 'application/x-www-form-urlencoded'},
      success: function(res){
        wx.showToast({
          title: '禁止成功!',
          icon: 'success',
          duration: 1500
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
        console.log('submint success!');
      },
      fail: function(res){
        console.log('submit fail too');
      },
      complete: function(res){
        console.log('submit complete too');
      }
    })
  },
  exportXlsx: function(e){
    var that = this
    var i = e.currentTarget.dataset.index;
    wx.request({
      url: getApp().data.host_debug + '/Activity1/index',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var ID = that.data.adminActivityDone[i].ActivityID;
        var url = 'https://590937940.wjqproject.cn/activity/create1/' + ID;
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