# 好书送送送不停




## 介绍

"好书送送送不停"小程序是本学期软件工程的大作业，是团队合作开发的一个微信小程序。其主要功能如下：

- 管理员登录与验证
- 管理员创建并发布好书抽奖活动
- 管理员查看当前进行的活动，并可以停止抽奖
- 管理员查看当前已结束的活动，并导出获奖用户信息
- 用户查看当前进行的抽奖
- 用户查看已获奖信息
- 已获奖用户填写个人信息

出于创新形式等角度，本项目的前端部分并没有直接使用微信原生的框架WeUI，而是前端团队自行设计出了一套手绘风格的界面。前端使用wxml和js进行开发，后端使用PHP进行开发，服务器端使用腾讯云一键解决方案。

## 前端

前端分为12个页面，分别为首页(index)、管理员登录页面（adminLogin），管理员导航界面（adminIndex），管理员设置活动页面（initiateActivity），管理员设置活动奖品页面（createActivity），管理员查看活动导航（adminActivityList），管理员查看正在进行活动页面（adminActivityDoing），管理员查看已结束活动页面（adminAcivityDone），用户参与抽奖页面（userActivityDoing），用户查看情况页面（awardSituation），用户填写信息页面（userinfo），用户授权登录页面（tologin）。

###以下是我们设计的背景图
![主界面](https://wafer-1256477980.cos.ap-guangzhou.myqcloud.com/background/tree1.png)
####以上背景用于主界面和管理员登录，以及用户查看当前活动信息
![管理员登录](https://wafer-1256477980.cos.ap-guangzhou.myqcloud.com/background/tree2.png)
####以上背景用于管理员创建活动和查看活动的导航
![管理员登录](https://wafer-1256477980.cos.ap-guangzhou.myqcloud.com/background/tree3.png)
####以上背景用于管理员查看活动信息以及用户查看当前已获奖信息
![](/Users/apple/Downloads/填写活动信息背景.jpg)
####以上背景用于管理员创建活动，填写奖品信息，获奖用户填写个人信息

###界面展示
####首页（index）
![首页](/Users/apple/Desktop/项目截图/0首页.jpg)
####管理员登录页面（adminLogin）
![管理员登录页面](/Users/apple/Desktop/项目截图/管理员/1.0.0管理员登录界面.jpg)
####管理员导航页面（adminIndex）
![管理员导航页面](/Users/apple/Desktop/项目截图/管理员/1.0.1管理员登录成功之后进入的导航界面.jpg)
####管理员设置活动页面（initiateActivity）
![管理员设置活动页面](/Users/apple/Desktop/项目截图/管理员/1.2.0管理员填写活动信息界面.jpg)
####管理员设置活动奖品页面（createActivity）
![管理员设置活动奖品页面](/Users/apple/Desktop/项目截图/管理员/1.2.2.1管理员填写奖品界面.jpg)
####管理员查看活动导航（adminActivityList）
![管理员查看活动导航](/Users/apple/Desktop/项目截图/管理员/1.1.0管理员查看抽奖活动导航界面.jpg)
####管理员查看正在进行活动页面（adminActivityDoing）
![管理员查看正在进行活动页面](/Users/apple/Desktop/项目截图/管理员/1.1.2.1管理员查看正在进行的活动.jpg)
####管理员查看已结束活动页面（adminAcivityDone）
![管理员查看已结束活动页面](/Users/apple/Desktop/项目截图/管理员/1.1.1.1管理员查看已结束活动界面.jpg)
####用户参与抽奖页面（userActivityDoing）
![用户参与抽奖页面](/Users/apple/Desktop/项目截图/用户/2.0.1用户查看当前进行的活动.jpg)
####用户查看情况页面（awardSituation）
![用户查看情况页面](/Users/apple/Desktop/项目截图/用户/2.1.0获奖用户查看已情况界面.jpg)
####用户填写信息页面（userinfo）
![用户填写信息页面](/Users/apple/Desktop/项目截图/用户/2.1.1.1.0获奖用户填写个人信息界面.jpg)
####用户授权登录页面（tologin）
![用户授权登录页面](/Users/apple/Downloads/授权登录.jpg)

###前端部分难点
####下拉框展示
为了提高用户的体验，使用下拉框的形式显示活动信息以及奖品信息，对于管理员创建奖品信息的表单也使用下拉框的设计。界面因此简洁、便捷。
使用wx:for结构，动态绑定js中从后端传输过来的data，实现对于下拉框中每一部分的动态展示。
	
示例代码如下

	js文件中代码

```
//js中data域，adminActivityDone：管理员查看已结束的活动信息
data: {
    adminActivityDone:''
},

//js动态绑定从后端接收的数据，通过setData()来实现。
wx.request({
      url: ‘’,//此处请填写自己服务器相应功能对应的URL
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
  }
```
	wxml文件中代码
	
```
<block wx:for="{{adminActivityDone}}" wx:key="id">
      <view class="kind-list__item">
        <view class='content weui-flex kind-list__item-hd kind-list__item-hd_show' style="height: 70px;flex-direction:row;">
          <view style="width:50px;">
            <text class='con_num' style="height: 80px;flex-direction:row;">{{index}}</text>
          </view>
          <view class="part weui-flex__item">
            <text class='con_big'>{{item.ActivityName}}</text>
            <text class='con_small'>开始：{{item.StartTime}}</text>
            <text class='con_small'>结束：{{item.EndTime}}</text>
            <text class='con_small'>参与人数：{{item.number}}</text>
          </view>
        </view>
      <view style="width: 100%;flex-direction:row;">
        <button class='forbidBtn' bindtap="forbid" data-index="{{index}}">禁止用户填写信息</button>
        <button class='exportBtn' bindtap="exportXlsx" data-index="{{index}}">导出xlsx文件</button>
      </view>
    </view>
</block>
```






## LICENSE

[MIT](LICENSE)

