var activityArray;
var activityJson;
var activityJsonStr;
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  data: {
    userActivitydoing:'',
    awards:''
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: getApp().data.host_debug + '/Activity00/index',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res);
        if(res.data.activity.flag == 1)
        {
          var tmp = res.data.activity;
          delete tmp.flag;
          that.setData({
            userActivitydoing: tmp
          });
          console.log('加载成功！哼我要开始测试分享了，当前信息为：');
          console.log(res.data);
          console.log(that.data.userActivitydoing);
        }
        else 
        {
          wx.showModal({
            title: '友情提示',
            content: '当前暂无活动！',
          })
        }
      },
      fail: function (res) {
        console.log("加载失败，错误信息为：");
        console.log(res.data);
      },
      complete: function (res) {
        console.log("加载页面结束，信息为：");
        console.log(res.data);
      }
    })
  },
  kindToggle: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    var data = that.data.userActivitydoing[id].ActivityID;
    console.log(data);
    wx.request({
      url: getApp().data.host_debug + '/Award/index',
      data: {
        "ActivityID": data,
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function(res) {
        var tmp = that.data.userActivitydoing[id];
        tmp["awards"] = res.data;
        console.log("嘤嘤嘤");
        console.log(res.data);
        var s = "userActivitydoing[" + id + "]";
        that.setData({
          s : tmp
        })
        console.log("我昨天测还好好的");
        console.log(that.data.userActivitydoing[id]);
        console.log(that.data.userActivitydoing[id].awards);
        console.log('submit success');
      },
      fail: function (res) {
        console.log('submit fail too');
      },
      complete: function (res) {
        console.log('submit complete too');
      }
    })
    var open = that.data.userActivitydoing;
    open[id].open = !open[id].open
      that.setData({
        userActivitydoing: open
      });
    console.log(open[id].open);
  },
  info : function(e) {
    var that = this;
    var i = e.target.dataset.index;
    var ActivityId = that.data.userActivitydoing[i].ActivityID;
    qcloud.login({
      success(result) {
        if (result) {
          that.setData({
            userInfo: result,
            logged: true
          })
          var tmp = that.data.userInfo["openId"];
          console.log(that.data.userInfo["openId"]);
          wx.request({
            url: getApp().data.host_debug + '/RecordUser/addUsers',
            data: {
              "ActivityID": ActivityId,
              "openID": tmp
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
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
              var i = e.target.dataset.index;
              var ActivityId = that.data.userActivitydoing[i].ActivityID;
              var tmp = that.data.userInfo["openId"];
              wx.request({
                url: getApp().data.host_debug + '/RecordUser/addUsers',
                data: {
                  "ActivityID": ActivityId,
                  "openID": tmp
                },
                method: 'POST',
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                success: function (res) {
                  console.log(res.data);
                  console.log('submit success openid');
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
    wx.showToast({
      title: '参加成功！',
    })
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
  onShareAppMessage: function (e) {
    var that = this
    var i = e.target.dataset.index;
    var ActivityId = that.data.userActivitydoing[i].ActivityID;
    qcloud.login({
      success(result) {
        if (result) {
          that.setData({
            userInfo: result,
            logged: true
          })
          var tmp = that.data.userInfo["openId"];
          wx.request({
            url: getApp().data.host_debug + '/RecordUser/insertqual',
            data: {
              "ActivityID": ActivityId,
              "openID": tmp
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              console.log('submit success openid');
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
              var tmp = that.data.userInfo["openId"];
              wx.request({
                url: getApp().data.host_debug + '/RecordUser/addQualiUsers',
                data: {
                  "ActivityID": ActivityId,
                  "openID": tmp
                },
                method: 'POST',
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                success: function (res) {
                  console.log('submit success openid');
                  console.log(res.data);
                  console.log('test openid');
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
    return {
      title: '好书送送送不停',
      desc: '好书送不停 幸运大抽奖',
      path: '/pages/index/index?url=',
      success: function (res) {
        console.info(res + '成功');
        // 转发成功  
      }, 
      fail: function (res) {
        console.log(res + '失败');
        // 转发失败  
      },
      complete: function (res) {
        // 不管成功失败都会执行  
      }  
    }
    wx.showToast({
      title: '分享成功！',
    })
  },
})