# ofo-xcx
用微信小程序实现的OFO共享单车界面




# 资源 #


## 参考文章 ##

http://www.jianshu.com/p/3f9b78c68887?utm_campaign=hugo&utm_medium=reader_share&utm_content=note&utm_source=weixin-friends#

## 微信接口文档 ##

地理位置
https://mp.weixin.qq.com/debug/wxadoc/dev/api/location.html



# 地图功能实现 #

## 1. 创建新的空白项目 ##

在创建的默认程序中，出现如下错误信息:
```
编译 .wxml 文件错误，错误信息：未找到页面 pages/index/index 对应的wxml文件

```

注意要选择文件目录，确保此文件目录为空



## 2. 获取地图位置 ##

getLocation: 

类型： gcj02 返回可用于wx.openLocation的坐标


```
this.setData({  
	longitude: res.longitude,
	latitude: res.latitude
});

```

## 3. 绑定事件 ##

控件的点击事件：
```
wxml:

	   bindcontroltap="bindcontroltap"
	   markers="{{markers}}"


js:

	// 地图控件点击事件
	bindcontroltap: function(e) {
		// 判断点击的是哪个控件 e.controlId代表控件的id，在页面加载时的第3步设置的id

		console.log(e.controlId);



```

详细说明，请参考：
https://mp.weixin.qq.com/debug/wxadoc/dev/component/map.html#map


## 4. 添加单车标记 ##

```
this.setData({
	markers: markers.data
});

```


## 5. 用户拖动地图事件 ##

```
this.mapCtx.getCenterLocation({
	success: function(res) {
		console.log(res.longitude);
		console.log(res.latitude);
	}
});

```



# 个人信息的页面 #


## onLoad ##

```
		// 设置本页导航标题
		wx.setNavigationBarTitle({
			title: '个人中心'
		});

		// 获取本地数据-用户信息
		wx.getStorage({
			key: 'userInfo',
			// 能获取到则显示用户信息，并保持登录状态，不能就什么也不做

```




【注意】 markers 的数据为 数组

# 知识点 #


---------
rpx 是什么意思？

【答】rpx单位是微信小程序中css的尺寸单位，rpx可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。

---------
vh 是什么意思？

【答】CSS中相对长度单位，表示相对视口高度（Viewport Height），1vh = 1% * 视口高度。


---------
CSS3 display: flex;

【答】 弹性盒模型（多栏多列）布局

flex-flow:   row  / column


1. display:flex 多栏多列布局
http://www.360doc.com/content/14/0811/01/2633_400926000.shtml


2. 浅谈CSS3中display属性
http://www.cnblogs.com/xuyuntao/articles/6391728.html

```
 

justify-content

 1 .box { 2 justify-content: flex-start | flex-end | center | space-between | space-around; 3 } 

项目在主轴上的对齐方式(主轴究竟是哪个轴要看属性flex-direction的设置了)

flex-start：在主轴上由左或者上开始排列

flex-end：在主轴上由右或者下开始排列

center：在主轴上居中排列

space-between：在主轴上左右两端或者上下两端开始排列

space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

```


---------

运行时出现
```
WAService.js:4 navigateTo:fail url "pages/warn/index" is not in app.json
```

此问题是因为没有定义个人页面所以找不到

---------
block wx:if
因为 wx:if 是一个控制属性，需要将它添加到一个标签上。但是如果我们想一次性判断多个组件标签，我们可以使用一个 <block/> 标签将多个组件包装起来，并在上边使用 wx:if 控制属性。

```
<block wx:if="{{true}}">
  <view> view1 </view>
  <view> view2 </view>
</block>

```

注意： <block/> 并不是一个组件，它仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性。
