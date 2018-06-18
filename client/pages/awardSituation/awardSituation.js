var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var activityArray;
var activityJson;
var activityJsonStr;
var doingActivity;
Page({
  data: {
    award:''
  },
  fillUserInfo: function (e){
    var that=this;
    var app=getApp();
    var i=e.currentTarget.dataset.index;
    console.log(that.data.award[i]);
    var ID = that.data.award[i].ActivityID;
    app.globalData.UserAcID = ID;
    qcloud.login({
      success(result) {
        if (result) {
          that.setData({
            userInfo: result,
            logged: true
          })
          var tmp = that.data.userInfo["openId"];
          wx.request({
            url: getApp().data.host_debug + '/Recipient/awardme',
            data: {
              "openID": tmp
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              console.log(res.data[i].status);
              if(res.data[i].status == 1)
              {
                wx.navigateTo({
                  url: '../../pages/userinfo/userinfo',
                })
              }
              else if(res.data[i].status == 2)
              {
                wx.showModal({
                  title: '友情提示',
                  content: '活动已截止！',
                })
              }
              console.log(that.data.award);
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
                url: getApp().data.host_debug + '/Recipient/awardme',
                data: {
                  "openID": tmp
                },
                method: 'POST',
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                success: function (res) {
                  console.log('已登陆用户再次登录成功');
                  console.log("哇真的是");
                  console.log(res.data[i].status);
                  if (res.data[i].status == 1) {
                      wx.navigateTo({
                        url: '../../pages/userinfo/userinfo',
                      })
                  }
                  else if(res.data[i].status == 2){
                    wx.showModal({
                      title: '友情提示',
                      content: '活动已截止！',
                    })
                  }
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
    /*var date = new Date();
    var EndTime1 = new Date(that.data.award[i].EndTime);
    var EndTime = new Date(that.data.award[i].EndTime);//这是即将要更改的时间

    var date=new Date(EndTime);
    var y=date.getFullYear();
    var m=date.getMonth()+1;
    m=m<10?('0'+m):m;
    var d=date.getDate();
    d=d<10?('0'+d):d;
    var h=date.getHours();
    var minute=date.getMinutes();
    minute=minute<10?('0'+minute):minute;
    var str=y+"-"+m+"-"+d+" "+h+":"+minute;
    var days = 3;
    EndTime.setDate(EndTime.getDate() + 3);
    console.log("结束时间");
    console.log(EndTime);
    console.log(date);
    wx.request({
      url: getApp().data.host_debug + '/Activity/compare',
      data: {
        "EndTime": str,
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log("嘤嘤嘤");
        console.log(res.data);
        console.log("我昨天测还好好的");
        console.log('submit success');
        if(res.data == 0)
        {
          wx.redirectTo({
            url: '../../pages/userinfo/userinfo',
          })
        }
        else 
        {
          wx.showModal({
            title: '友情提示',
            content: '活动已截止，您不能再填写信息了！',
          })
        }
      },
      fail: function (res) {
        console.log('submit fail too');
      },
      complete: function (res) {
        console.log('submit complete too');
      }
    })*/
  },
  kindToggle: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    console.log("wawawa" + id);
    var open = that.data.award;
    open[id].open = !open[id].open
    var data = that.data.award[id].ActivityID;
    console.log(data);
    that.setData({
      award: open
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    qcloud.login({
      success(result) {
        if (result) {
          that.setData({
            userInfo: result,
            logged: true
          })
          var tmp = that.data.userInfo["openId"];
          wx.request({
            url: getApp().data.host_debug + '/Recipient/awardme',
            data: {
              "openID": tmp
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              var tmp = res.data;
              console.log(res.data);
              if(res.data.flag == 1)
              {
                that.setData({
                  award: tmp
                })
              }
              else {
                wx.showModal({
                  title: '友情提示',
                  content: '您没有中奖的活动！',
                })
              }
              console.log(that.data.award);
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
                url: getApp().data.host_debug + '/Recipient/awardme',
                data: {
                  "openID": tmp
                },
                method: 'POST',
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                success: function (res) {
                  console.log('已登陆用户再次登录成功');
                  console.log("哇真的是");
                  console.log(res.data.flag);
                  if(res.data.flag == 1)
                  {
                    var tmp = res.data;
                    delete tmp.flag;
                    console.log(tmp);
                    that.setData({
                      award: tmp
                    })
                    /*var i = 0;
                    for(let a in res.data)
                    {
                      i++;
                    }
                    console.log(i);
                    for (let id = 0; id < i; id++) {
                      console.log("哎呀我改了哦");
                        var str = 'award[' + id + ']'
                        if (that.data.award[id].Type == "0") {
                          var tmp = that.data.award[id];
                          tmp["Type"] = "特等奖";
                          that.setData({
                            [str]: tmp
                          })
                        }
                        else if (that.data.award[id].Type == "1") {
                          var tmp = that.data.award[id];
                          tmp["Type"] = "一等奖";
                          that.setData({
                            [str]: tmp
                          })
                          console.log(that.data.award[id].Type);
                        }
                        else if (that.data.award[id].Type == "2") {
                          var tmp = that.data.award[id];
                          tmp["Type"] = "二等奖";
                          that.setData({
                            [str]: tmp
                          })
                        }
                        else if (that.data.award[id].Type == "3") {
                          var tmp = that.data.award[id];
                          tmp["Type"] = "三等奖";
                          that.setData({
                            [str]: tmp
                          })
                        }
                      }
                      console.log("aaaaa");
                      console.log(that.data.award);
                      */
                  }
                  else 
                  {
                    wx.showModal({
                      title: '友情提示',
                      content: '您没有中奖的活动！',
                    })
                  }
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