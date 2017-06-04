//index.js
//获取应用实例
var app = getApp()
Page({
	data: {
		scale: 15,
		latitude: 0,
		longitude: 0
	},

	// 更新单车位置
	updateMarkers: function(res) {

		console.log(res.longitude);
		console.log(res.latitude);

		var markers = {
			"data": [
				// {
				// 	"id": 0,
				// 	"title": "去这里",
				// 	"iconPath": "/images/markers.png",
				// 	"latitude": 28.714621,
				// 	"longitude": 115.82749,
				// 	"width": 45,
				// 	"height": 50
				// }
			]
		};

		for (var i = 0; i < 10; i++) {
			var mark = {
				"id": i,
				"title": "去这里",
				"iconPath": "/images/markers.png",
				"latitude": res.latitude + (Math.random() - 0.5) / 100,
				"longitude": res.longitude + (Math.random() - 0.5) / 100,
				"width": 45,
				"height": 50
			};

			markers.data.push(mark);
		}


		console.log(markers);

		this.setData({
			markers: markers.data
		});

	},

	onLoad: function () {
		// 1.页面初始化 options为页面跳转所带来的参数

		// 2.调用wx.getLocation系统API,获取并设置当前位置经纬度
			// ...已省略

		wx.getLocation({
			type: "gcj02",
			// 获取经纬度成功回调
			success: (res) => { // es6 箭头函数，可以解绑当前作用域的this指向，使得下面的this可以绑定到Page对象

				console.log(res.longitude);
				console.log(res.latitude);

				// res.longitude = 90;

				// 为data对象里定义的经纬度默认值设置成获取到的真实经纬度，这样就可以在地图上显示我们的真实位置
				this.setData({  
					longitude: res.longitude,
					latitude: res.latitude
				});

				// 产生随机 标记位置
				// console.log(this.data.latitude);


				this.updateMarkers(res);

			}
		});


		// 3.设置地图控件的位置及大小，通过设备宽高定位
		wx.getSystemInfo({ // 系统API,获取系统信息，比如设备宽高
			success: (res) => {
				// 定义控件数组，可以在data对象初始化为[],也可以不初始化，取决于是否需要更好的阅读
				this.setData({
					controls: [{
						id: 1,
						iconPath: "/images/location.png",
						position: { // 控件位置
							left: 20, // 单位px
							top: res.windowHeight - 80, // 根据设备高度设置top值，可以做到在不同设备上效果一致
							width: 50, // 控件宽度/px
							height: 50 // 控件高度/px
						},
						clickable: true // 是否可点击，默认为true,可点击
					}, {
						id: 2,
						iconPath: '/images/use.png',
						position: {
							left: res.windowWidth/2 - 45,
							top: res.windowHeight - 100,
							width: 90,
							height: 90
						},
						clickable: true
					}, {
						id: 3,
						iconPath: '/images/warn.png',
						position: {
							left: res.windowWidth - 70,
							top: res.windowHeight - 80,
							width: 50,
							height: 50
						},
						clickable: true
					}, {
						id: 4,
						iconPath: '/images/marker.png',
						position: {
							left: res.windowWidth/2 - 11,
							top: res.windowHeight/2 - 45,
							width: 22,
							height: 45
						},
						clickable: false
					}, {
						id: 5,
						iconPath: '/images/avatar.png',
						position: {
							left: res.windowWidth - 68,
							top: res.windowHeight - 155,
							width: 45,
							height: 45
						},
						clickable: true
					}]
				});
			}
		});

		// 4. 请求标记数组数据
		// wx.request({
		// 	url: 'https://www.easy-mock.com/mock/59098d007a878d73716e966f/ofodata/biyclePosition',
		// 	data: {},
		// 	method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
		// 	// header: {}, // 设置请求的 header
		// 	success: (res) => {
		// 		this.setData({
		// 			markers: res.data.data
		// 		});
		// 	}
		// });

		
	},

	// 地图控件点击事件
	bindcontroltap: function(e) {
		// 判断点击的是哪个控件 e.controlId代表控件的id，在页面加载时的第3步设置的id

		console.log(e.controlId);

		switch(e.controlId) {
		// 点击定位控件
		case 1:
			this.movetoPosition();
			break;

			// 点击保障控件，跳转到报障页
		case 3:
			wx.navigateTo({
				url: '../warn/index'
			});

			break;
			// 点击头像控件，跳转到个人中心
		case 5:
			wx.navigateTo({
				url: '../my/index'
			});
			break; 

		default:
			break;
			
		}
	},

	// 地图标记点击事件，连接用户位置和点击的单车位置
	bindmarkertap: function(e) {
		let _markers = this.data.markers; // 拿到标记数组

		let markerId = e.markerId; // 获取点击的标记id
		let currMaker = _markers[markerId]; // 通过id,获取当前点击的标记

		console.log(markerId);

		this.setData({
			polyline: [{
				points: [{ // 连线起点
					longitude: this.data.longitude,
					latitude: this.data.latitude
				}, { // 连线终点(当前点击的标记)
					longitude: currMaker.longitude,
					latitude: currMaker.latitude
				}],
				color:"#FF0000DD",
				width: 1,
				dottedLine: true
			}],
			scale: 18
		});
	},

	// 区域改变事件
	bindregionchange: function(e) {
		var that = this;

		console.log(e);

		if (e.type == "begin") {
			
		} else if (e.type == "end") {


			this.mapCtx.getCenterLocation({
				success: function(res) {
					console.log(res.longitude);
					console.log(res.latitude);

					that.updateMarkers(res);
				}
			});

		}
	},


	onReady: function() {
		// 页面渲染完成
	},

	onShow: function() {
		// 页面显示

		console.log("onShow");

		// 1.创建地图上下文，移动当前位置到地图中心
		this.mapCtx = wx.createMapContext("ofoMap"); // 地图组件的id
		this.movetoPosition();
	},

	movetoPosition: function() {
		console.log("movetoPosition");
		this.mapCtx.moveToLocation();
	},

	onHide: function() {
		// 页面隐藏
	},

	onUnload:function() {
		// 页面关闭
	}
	
})
