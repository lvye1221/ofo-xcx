//page()表示当前页，{}中配置页面信息（数据，方法）
var num = 10;//定义小黄车数量
var mywidth;//定义屏幕宽度
var myheight;//定义屏幕高度
var yellow;//定义小黄车原始属性
var blue;//定义蓝色标记原始属性
var controls;//定义控件
var markers;//定义标记
var tip = 0;//定义tip控件的状态
var hide = 0;//定义隐藏控件的状态
Page({

  //data:{}是固定格式，在{}中对数据进行修改
  //data:{}中数据除数字外都要用双引号
  data: {
   
    a: 17,
   
  },

  //onReady代表整个程序加载完成后执行里面的function
  onReady: function () {
    //页面加载完成后，运行这里
    //this代表当前页面，定义self获取当前页面
    var self = this;
    
    //获取当前手机信息
    wx.getSystemInfo({
      success: function (res) {
        mywidth = res.windowWidth;
        myheight = res.windowHeight;
        //controls:[{},{},...]---在地图上显示控件，控件不随着地图移动
        controls = [{
          id: 1,
          iconPath: "/ofo_img/tip_icon.png",
          position: {
            left: mywidth - 48,
            top: 60,
            width: 250,
            height: 50,
          },
          clickable: true,
        }, {
          id: 2,
          iconPath: "/ofo_img/Alarm_icon.png",
          position: {
            left: mywidth - 34,
            top: 68,
            width: 30,
            height: 30,
          },
          clickable: true,
        }, {
          id: 3,
          iconPath: "/ofo_img/yuanpan.png",
          position: {
            left: 0,
            top: myheight * 0.65,
            width: mywidth,
            height: myheight * 0.35,
          },
          clickable: true,
        }, {
          id: 4,
          iconPath: "/ofo_img/hide_icon.png",
          position: {
            left: mywidth * 0.45,
            top: myheight * 0.7,
            width: mywidth * 0.1,
            height: 20,
          },
          clickable: true,
        }, {
          id: 5,
          iconPath: "/ofo_img/personal_icon.png",
          position: {
            left: mywidth * 0.1,
            top: myheight * 0.85,
            width: 30,
            height: 30,
          },
          clickable: true,
        }, {
          id: 6,
          iconPath: "/ofo_img/Ride_icon.png",
          position: {
            left: mywidth * 0.35,
            top: myheight * 0.75,
            width: mywidth * 0.3,
            height: mywidth * 0.3,
          },
          clickable: true,
        }, {
          id: 7,
          iconPath: "/ofo_img/activity_icon.png",
          position: {
            left: mywidth * 0.8,
            top: myheight * 0.85,
            width: 30,
            height: 30
          },
          clickable: true,
        }, {
          id: 8,
          iconPath: "/ofo_img/Positioning_icon02.png",
          position: {
            left: mywidth * 0.85,
            top: myheight * 0.5,
            width: mywidth * 0.12,
            height: mywidth * 0.12,
          },
          clickable: true,
        }, {
          id: 9,
          iconPath: "/ofo_img/service_icon.png",
          position: {
            left: mywidth * 0.85,
            top: myheight * 0.58,
            width: mywidth * 0.12,
            height: mywidth * 0.12,
          },
          clickable: true,
        }]
        self.setData({
          controls: controls,
        })
      },
    })
    //微信获取地理位置
    wx.getLocation({
      //获取当前页面成功，执行该function，res代表结果集
      success: function (res) {
        //定义一个小蓝点
        blue = {
          id: 0,
          iconPath: "/ofo_img/position_icon_blue.png",
          latitude: res.latitude,
          longitude: res.longitude,
          width: 35,
          height: 40,
          callout: {
            content: "我在这",
            color: "#1A1A1A",
            fontSize: 14,
            borderRadius: 10,
            bgColor: "#FFFFFF",
            padding: 10,
            display: 'BYCLICK',
          }
        }
        
        markers=[blue];
        for (var i=0 ; i < num; i++) {
          //定义一个小黄点
          yellow = {
            id: 10,
            iconPath: "/ofo_img/position_icon.png",
            latitude: res.latitude-0.001 + 0.002 * Math.random(),
            longitude: res.longitude-0.001 + 0.002 * Math.random(),
            width: 35,
            height: 40,
            callout: {
              content: "点我！！",
              color: "#FFFF00",
              fontSize: 14,
              borderRadius: 0,
              bgcolor: "#FFFFFF",
              padding: 10,
              display: "BYCLICK",
            }
          }
          markers.push(yellow);
        }
          //改变当前页面self的数据
          self.setData({
            //更改坐标
            la: res.latitude,
            lo: res.longitude,
            //弄出一个圆
            // circles: [{
            //   latitude: res.latitude,
            //   longitude: res.longitude,
            //   color: "#1C86EEFF",
            //   fillColor: "#7cb5ec44",
            //   radius: 150,
            //   strokeWidth: 0.1,
            // }],

            //改变markers的位置
            markers: markers,
          })
        },
    })
  },
  //bindcontroltap表示点击控件触发事件
  controltap: function (e) {
    
    if (e.controlId == 1) {//点击alerm警告框
      if(tip==0){
        this.showtip();
        tip=1;
      }else if(tip==1){
        this.hidetip();
        tip=0;
      }
    } else if (e.controlId == 2) {//点击tip提示框
      if (tip == 0) {
        this.showtip();
        tip = 1;
      } else if (tip == 1) {
        this.hidetip();
        tip = 0;
      }
    } else if (e.controlId == 3) {//点击圆盘，无效果
    } else if (e.controlId == 4) {//点击隐藏、显示下面的功能框
      if(hide==0){
        this.hide();
        hide=1;
      }else{
        this.show();
        hide=0;
      }
    } else if (e.controlId == 5) {//点击用户图标
      this.user();
    } else if (e.controlId == 6) {//点击免费骑车图标
      this.freeride();
    } else if (e.controlId == 7) {//点击礼物图标
      this.gift();
    } else if (e.controlId == 8) {//点击定位图标
      this.relocate();
    } else if (e.controlId == 9) {//点击维修图标
      wx.navigateTo({
        url: '/pages/weixiu/weixiu',
      })
    }
  },
  //showtip出现提示框事件
  showtip:function(){
    //定义controls的新位置 
    var control = [{
      id: 1,
      iconPath: "/ofo_img/tip_icon.png",
      position: {
        left: mywidth-208,
        top: 60,
        width: 250,
        height: 50,
      },
      clickable: true,
    }, {
      id: 2,
      iconPath: "/ofo_img/Alarm_icon.png",
      position: {
        left: mywidth-194,
        top: 68,
        width: 30,
        height: 30,
      },
      clickable: true,
    }, {
      id: 3,
      iconPath: "/ofo_img/yuanpan.png",
      position: {
        left: 0,
        top: myheight * 0.65,
        width: mywidth,
        height: myheight * 0.35,
      },
      clickable: true,
    }, {
      id: 4,
      iconPath: "/ofo_img/hide_icon.png",
      position: {
        left: mywidth * 0.45,
        top: myheight * 0.7,
        width: mywidth * 0.1,
        height: 20,
      },
      clickable: true,
    }, {
      id: 5,
      iconPath: "/ofo_img/personal_icon.png",
      position: {
        left: mywidth * 0.1,
        top: myheight * 0.85,
        width: 30,
        height: 30,
      },
      clickable: true,
    }, {
      id: 6,
      iconPath: "/ofo_img/Ride_icon.png",
      position: {
        left: mywidth * 0.35,
        top: myheight * 0.75,
        width: mywidth * 0.3,
        height: mywidth * 0.3,
      },
      clickable: true,
    }, {
      id: 7,
      iconPath: "/ofo_img/activity_icon.png",
      position: {
        left: mywidth * 0.8,
        top: myheight * 0.85,
        width: 30,
        height: 30
      },
      clickable: true,
    }, {
      id: 8,
      iconPath: "/ofo_img/Positioning_icon02.png",
      position: {
        left: mywidth * 0.85,
        top: myheight * 0.5,
        width: mywidth * 0.12,
        height: mywidth * 0.12,
      },
      clickable: true,
    }, {
      id: 9,
      iconPath: "/ofo_img/service_icon.png",
      position: {
        left: mywidth * 0.85,
        top: myheight * 0.58,
        width: mywidth * 0.12,
        height: mywidth * 0.12,
      },
      clickable: true,
    }];
    this.setData({
      controls:control
    })
  },
  //hidetip隐藏提示框事件
  hidetip: function () {
    // var animation=wx.createAnimation({
    //   duration:1000,
    //   timingFunction:'ease',

    // })
    // this.controls=animation;
    // animation.scale(2,2).rotate(45).step();
    this.setData({
      // controls:animation.export(),
       controls: controls
    })
  },
  //hide隐藏下面的功能框
  hide:function(){
    var control = [{
      id: 1,
      iconPath: "/ofo_img/tip_icon.png",
      position: {
        left: mywidth - 48,
        top: 60,
        width: 250,
        height: 50,
      },
      clickable: true,
    }, {
      id: 2,
      iconPath: "/ofo_img/Alarm_icon.png",
      position: {
        left: mywidth - 34,
        top: 68,
        width: 30,
        height: 30,
      },
      clickable: true,
    }, {
      id: 3,
      iconPath: "/ofo_img/yuanpan.png",
      position: {
        left: 0,
        top: myheight * 0.9,
        width: mywidth,
        height: myheight * 0.35,
      },
      clickable: true,
    }, {
      id: 4,
      iconPath: "/ofo_img/show_icon.png",
      position: {
        left: mywidth * 0.45,
        top: myheight * 0.93,
        width: mywidth * 0.1,
        height: 20,
      },
      clickable: true,
    }, {
      id: 8,
      iconPath: "/ofo_img/Positioning_icon02.png",
      position: {
        left: mywidth * 0.85,
        top: myheight * 0.5,
        width: mywidth * 0.12,
        height: mywidth * 0.12,
      },
      clickable: true,
    }, {
      id: 9,
      iconPath: "/ofo_img/service_icon.png",
      position: {
        left: mywidth * 0.85,
        top: myheight * 0.58,
        width: mywidth * 0.12,
        height: mywidth * 0.12,
      },
      clickable: true,
    }]
    this.setData({
      controls:control
    })
  },
  //show出现下面的功能框
  show:function(){
    this.setData({
      controls:controls
    })
  },
  //user用户菜单栏
  user:function(){
    wx.showActionSheet({
      itemList: ["我的收藏","我的余额","我要投诉","我的记录","我要加入","我想不出来了"],
      success:function(res){
        wx.showModal({
          title: '我最帅',
          content: '不用看其他的了，都一样。',
        })
      }
    })
  },
  //freeride免费骑车事件
  freeride:function(){
    wx.scanCode({
      success:(res)=>{
        wx.showToast({
          title: res.result,
        })
      },
      fail:(res)=>{
        wx.showToast({
          title: '抱歉，扫码失败',
        })
      }
    })
  },
  //gift礼物的点击事件
  gift:function(){
    wx.showModal({
      title: '没写',
      content: '也没打算写！',
    })
  },
  //relocate方法重新定位
  relocate: function () {
    //微信获取地理位置
    var self = this;
    wx.getLocation({
      //获取当前页面成功，执行该function，res代表结果集
      success: function (res) {
        //定义一个小蓝点
        blue = {
          id: 0,
          iconPath: "/ofo_img/position_icon_blue.png",
          latitude: res.latitude,
          longitude: res.longitude,
          width: 35,
          height: 40,
          callout: {
            content: "我在这",
            color: "#1A1A1A",
            fontSize: 14,
            borderRadius: 10,
            bgColor: "#FFFFFF",
            padding: 10,
            display: 'BYCLICK',
          }
        }
        //给markers一个初值，既blue对象
        markers = [blue];
        for (var i = 0; i < num; i++) {
          //定义一个小黄点
          yellow = {
            id: 10,
            iconPath: "/ofo_img/position_icon.png",
            latitude: res.latitude - 0.001 + 0.002 * Math.random(),
            longitude: res.longitude - 0.001 + 0.002 * Math.random(),
            width: 35,
            height: 40,
            callout: {
              content: "点我！！",
              color: "#FFFF00",
              fontSize: 14,
              borderRadius: 0,
              bgcolor: "#FFFFFF",
              padding: 10,
              display: "BYCLICK",
            }
          }
          markers.push(yellow);//把小黄点添加到markers中
        }
        //改变当前页面self的数据
        self.setData({
          //更改坐标
          la: res.latitude,
          lo: res.longitude,
          //改变markers的位置
          markers: markers,
        })
      },
    })
  },
  //service维修弹出模态框事件
  service:function(){
    wx.showModal({
      title: '啊哈',
      content: '我只能弹出一个模态框，很尴尬',
    // }, {
    //   title:'车损坏',
    //   content:'bbbb',
    // }, {
    //     title: '没车用',
    //     content: 'cccc',
    // }, {
    //   title: '乱停车',
    //   content: 'dddd',
    })
  }
})
