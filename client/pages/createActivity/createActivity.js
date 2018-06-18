var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var imgUrl;
var imgUrl2;

Page({
  data: {
    list: [
      {id: 'special',name: '特等奖',open: false,awardtype:[{'id':'BookName11','name':'书名','input':''},{'id':'BookInfo11','name':'书籍信息','input':''},{'id':'AwardQuantity11','name':'奖品数量','input':''}],qrcodeUrl:'',bookUrl:'',
      },
      {
        id: 'first', name: '一等奖', open: false, awardtype: [{ id: 'BookName22', name: '书名', input: '' }, { id: 'BookInfo22', name: '书籍信息', input: '' }, { id: 'AwardQuantity22', name: '奖品数量', input: '' }], qrcodeUrl: '', bookUrl: '',
      },
      {
        id: 'second', name: '二等奖', open: false, awardtype: [{ id: 'BookName33', name: '书名', input: '' }, { id: 'BookInfo33', name: '书籍信息', input: '' }, { id: 'AwardQuantity33', name: '奖品数量', input: '' }], qrcodeUrl: '', bookUrl: '',
      },
      {
        id: 'third', name: '三等奖', open: false, awardtype: [{ id: 'BookName44', name: '书名', input: '' }, { id: 'BookInfo44', name: '书籍信息', input: '' }, { id: 'AwardQuantity44', name: '奖品数量', input: '' }], qrcodeUrl: '', bookUrl: '',
      }
    ],
    id: ''
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      }
    }
    this.setData({
      id : id, 
      list: list
    });
    console.log(this.data.list[0].name);
  },
  toast1Change: function (e) {
    this.setData({ toast1Hidden: true });
  },
  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
  },
  bindPageName: function (e) {
    var that = this;
    var list = that.data.list;
    var id = that.data.id
    var realid = 0;

    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        realid = i;
      }
    }
    var i = e.currentTarget.dataset.index;

    var input = "list[" + realid + "].awardtype[" + i + "].input";
    that.setData({
      [input]: e.detail.value
    })
    if(i == 2)
    {
      var str = that.data.list[realid].awardtype[i].input; 
      var tmp = "list[" + realid + "].awardtype[" + i + "].input";
      var reg = /^\+?[1-9][0-9]*$/;
      if(!reg.test(str) && str.length != 0)
      {
        wx.showToast({
          title: '奖品数量非法！',
          icon : 'loading',
          duration : 500
        }),
        that.setData({
          [input]: ''
        })
      } 
    }
  },
  doUpload: function (e) {
    var that = this
    var i = e.currentTarget.dataset.index;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        util.showBusy('正在上传')
        var filePath = res.tempFilePaths[0]
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: filePath,
          name: 'file',
          success: function (res) {
            util.showSuccess('上传图片成功')
            res = JSON.parse(res.data)
            imgUrl = res.data.imgUrl
            var input = "list[" + i + "].qrcodeUrl";
            that.setData({
              [input]: imgUrl
            })
          },
          fail: function (e) {
            util.showModel('上传图片失败')
          }
        })
      },
      fail: function (e) {
        console.error(e)
      }
    })
  },
  previewImg: function (e) {
    var that = this
    var i = e.currentTarget.dataset.index;
    console.log(that.data.list[i].qrcodeUrl);
    wx.previewImage({
      current: that.data.list[i].qrcodeUrl,
      urls: [that.data.list[i].qrcodeUrl]
    })
  },
  doUpload2: function (e) {
    var that = this
    var i = e.currentTarget.dataset.index;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        util.showBusy('正在上传')
        console.log("wwwww");
        console.log(res);
        var filePath = res.tempFilePaths[0]
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: filePath,
          name: 'file',
          success: function (res) {
            util.showSuccess('上传图片成功')
            res = JSON.parse(res.data)
            console.log(res.data);
            imgUrl2 = res.data.imgUrl
            var input = "list[" + i + "].bookUrl";
            that.setData({
              [input]: imgUrl2
            })
          },
          fail: function (e) {
            util.showModel('上传图片失败')
          }
        })
      },
      fail: function (e) {
        console.error(e)
      }
    })
  },
  award: function (e) {
    var that=this;
    var list = this.data.list
    e.detail.value = list;
    var newEvent = { "BookName11": e.detail.value[0].awardtype[0].input, "BookInfo11": e.detail.value[0].awardtype[1].input, "BookPhoto11": e.detail.value[0].bookUrl, "QRCode11": e.detail.value[0].qrcodeUrl, "AwardQuantity11": e.detail.value[0].awardtype[2].input, "BookName22": e.detail.value[1].awardtype[0].input, "BookInfo22": e.detail.value[1].awardtype[1].input, "BookPhoto22": e.detail.value[1].bookUrl, "QRCode22": e.detail.value[1].qrcodeUrl, "AwardQuantity22": e.detail.value[1].awardtype[2].input, "BookName33": e.detail.value[2].awardtype[0].input, "BookInfo33": e.detail.value[2].awardtype[1].input, "BookPhoto33": e.detail.value[2].bookUrl, "QRCode33": e.detail.value[2].qrcodeUrl, "AwardQuantity33": e.detail.value[2].awardtype[2].input, "BookName44": e.detail.value[3].awardtype[0].input, "BookInfo44": e.detail.value[3].awardtype[1].input, "BookPhoto44": e.detail.value[3].bookUrl, "QRCode44": e.detail.value[3].qrcodeUrl, "AwardQuantity44": e.detail.value[3].awardtype[2].input}
    e.detail.value = newEvent;
    console.log(e.detail.value.BookName11.length);
    console.log(e.detail.value.BookName11.length);
    if (e.detail.value.BookName11.length == 0 || e.detail.value.BookInfo11.length == 0 || e.detail.value.BookPhoto11.length == 0 || e.detail.value.QRCode11.length == 0 || e.detail.value.AwardQuantity11.length == 0) {
      wx.showToast({
        title: '请完善特等奖信息',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
    else if (e.detail.value.BookName22.length == 0 || e.detail.value.BookInfo22.length == 0 || e.detail.value.BookPhoto22.length == 0 || e.detail.value.QRCode22.length == 0 || e.detail.value.AwardQuantity22.length == 0) {
      wx.showToast({
        title: '请完善一等奖信息',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
    else if (e.detail.value.BookName33.length == 0 || e.detail.value.BookInfo33.length == 0 || e.detail.value.BookPhoto33.length == 0 || e.detail.value.QRCode33.length == 0 || e.detail.value.AwardQuantity33.length == 0) {
      wx.showToast({
        title: '请完善二等奖信息',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
    else if (e.detail.value.BookName44.length == 0 || e.detail.value.BookInfo44.length == 0 || e.detail.value.BookPhoto44.length == 0 || e.detail.value.QRCode44.length == 0 || e.detail.value.AwardQuantity44.length == 0) {
      wx.showToast({
        title: '请完善三等奖信息',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
    else {
      wx.showToast({
        title: '填写成功!',
        icon: 'success',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
      wx.request({
        url: getApp().data.host_debug + '/Award/create',
        data: e.detail.value,
        method: 'POST',
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
          console.log('submit success award create');
          wx.showToast({
            title: '填写成功!',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function () {
            wx.hideToast()
          }, 2000),
          wx.redirectTo({
            url: '../../pages/adminIndex/adminIndex',
          }),
          console.log(res.data);
        },
        fail: function (res) {
          console.log(res.data);
          console.log('submit fail too');
        },
        complete: function (res) {
          console.log(res.data);
          console.log('submit complete too');
        }
      })
    }
  },
  awardreset: function (e) {
    var that = this
    console.log('form发生了reset事件');
    for(let i = 0; i < that.data.list.length; i++)
    {
      for(let j = 0; j < that.data.list[i].awardtype.length; j++)
      {
        var tmp = "list[" + i + "].awardtype[" + j + "].input";
        that.setData({
          [tmp] : ''
        })
      }
      var tmp1 = "list[" + i + "].qrcodeUrl";
      var tmp2 = "list[" + i + "].bookUrl";
      that.setData({
          [tmp1] : '',
          [tmp2] : ''
      })
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

  },
});
