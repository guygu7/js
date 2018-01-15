/**
 * @author LC 命名空间  namespace
 */
var LC = {};
/**
 * 定义工具空间
 */
LC.Utils = {};
/**
 * EXTEND method继承方法(子,父)
 * @param {Object} sub 子
 * @param {Object} sup 父
 */
LC.Utils.extend = function(sub, sup) {
	// 目的： 实现只继承父类的原型对象
	var F = new Function();
	// 1 创建一个空函数    目的：空函数进行中转
	new sup();
	//父类初始化
	F.prototype = sup.prototype;
	// 2 实现空函数的原型对象和超类的原型对象转换
	sub.prototype = new F();
	// 3 原型继承
	sub.prototype.constructor = sub;
	// 4还原子类的构造器
	//保存一下父类的原型对象: 一方面方便解耦  另一方面方便获得父类的原型对象
	sub.superClass = sup.prototype;
	//自定义一个子类的静态属性 接受父类的原型对象
	//判断父类的原型对象的构造器 (加保险)
	if (sup.prototype.constructor == Object.prototype.constructor) {
		sup.prototype.constructor = sup;
		//手动欢迎父类原型对象的构造器
	}
};
/**
 * 公共属性字典
 */
LC.CommonProperty = {
	sign : "lcsign" //通用标记属性，替代id
};
/**
 * 定义组件命名空间
 */
LC.Components = {};
/**
 * 组件所用到的公共方法集合
 */
LC.Components.ComponentFunction = {
};
/**
 * 组件空间中装入进度条类
 * @param {Object} progressID 进度条id
 */
LC.Components.ProgressBar = function(progressID) {
	var signID = progressID;
	//进度条自定义ID
	if ( typeof this.getSignID != 'function') {
		/**
		 * 获取进度条自定义ID
		 */
		LC.Components.ProgressBar.prototype.getSignID = function() {
			return signID;
		};
	};
	if ( typeof this.setSignID != 'function') {
		/**
		 * 设置进度条自定义ID
		 */
		LC.Components.ProgressBar.prototype.setSignID = function(ID) {
			signID = ID;
			return this;
		};
	};
	var runningTime = 0;
	//进度条运行时间
	if ( typeof this.getRunningTime != 'function') {
		/**
		 * 获取进度条运行时间
		 */
		LC.Components.ProgressBar.prototype.getRunningTime = function() {
			return time;
		};
	};
	if ( typeof this.setRunningTime != 'function') {
		/**
		 * 设置运行时间，单位s
		 * @param {Object} time 运行时间
		 * @return this
		 */
		LC.Components.ProgressBar.prototype.setRunningTime = function(time) {
			runningTime = time;
			return this;
		};
	};
	var width = 100;
	//进度条长度（百分比）
	if ( typeof this.setWidth != 'function') {
		/**
		 * 设置进度条要运行到的百分比
		 * @param {Object} width 百分比
		 * @return this
		 */
		LC.Components.ProgressBar.prototype.setWidth = function(width) {
			width = width;
			return this;
		};
	};
	//添加条纹效果
	if ( typeof this.addStriped != 'function') {
		/**
		 * 传入需要添加条纹的顺位
		 */
		LC.Components.ProgressBar.prototype.addStriped = function(args){
			console.log(arguments);
			console.log(arguments.length);
			//传参处理
			if (arguments.length == 0) {//未传参，则修改第一个
				args = ["1"];
			} else if (arguments.length == 1) {//传一个参数
				if (args instanceof Array){ //是数组不做处理
				} else if ( "1"!=args && "0"!=args ){ //不是数组,且不为1或0
					args = [args];
				}
			} else {//传多个参数
				
			}
			//获得组件内部div progressBar
			var progressChilds = this.progressDOM.children("div.progress-bar");
			console.log(progressChilds.first().length);
			var className = progressChilds.first().attr("class");
			if (-1==className.search(/progress-bar-striped/)){//校验是否存在条纹效果，没有则添加条纹效果
				progressChilds.first().attr({"class" : className+" progress-bar-striped "});
			};
			//应对多分段的设置
			if (1<progressChilds.first().length){
				for (var i=1; i < Things.length; i++) {
				//  Things[i]
				};
			};
			return this;
		};
	};
	//去除条纹效果
	if ( typeof this.removeStriped != 'function') {
		LC.Components.ProgressBar.prototype.removeStriped = function(){
			//获得组件内部div progressBar
			var progressChilds = this.progressDOM.children("div.progress-bar");
			var className = progressChilds.first().attr("class");
			if (-1!=className.search(/progress-bar-striped/)){//校验是否存在条纹效果，有则删除条纹效果
				progressChilds.first().attr({"class" : className.replace(/progress-bar-striped/,"")});
			};
			return this;
		};
	};
	//添加动画效果
	if ( typeof this.addActive != 'function') {
		LC.Components.ProgressBar.prototype.addActive = function(){
			return this;
		};
	};
	//去除动画效果
	if ( typeof this.removeActive != 'function') {
		LC.Components.ProgressBar.prototype.removeActive = function(){
			return this;
		};
	};
	if ( typeof this.getWidth != 'function') {
		/**
		 * 获取进度条要运行到的百分比
		 * @return this
		 */
		LC.Components.ProgressBar.prototype.getWidth = function() {
			return width;
		};
	};
	if ( typeof this.styleAlter != 'function') {
		/**
		 * 进度条样式修改(子类使用)
		 */
		LC.Components.ProgressBar.prototype.styleAlter = function(progress) {
			return progress;
		};
	};
	if ( typeof this.creatProgressDOM != 'function') {
		/**
		 * 创建进度条的DOM对像
		 * @return progressDOM
		 */
		LC.Components.ProgressBar.prototype.creatProgressDOM = function() {
			var sign = LC.CommonProperty.sign;
			var progress = $("<div></div>").attr({
				sign : signID,
				"class" : "progress"
			}).append($("<div></div>").attr({
				"class" : "progress-bar",
				"role" : "progressbar",
				"aria-valuenow" : "0",
				"aria-valuemin" : "0",
				"aria-valuemax" : "100"
			}));
			LC.Components.ProgressBar.prototype.progressDOM = this.styleAlter(progress);
			return LC.Components.ProgressBar.prototype.progressDOM;
		};
	};
	/**
	 * 获取进度条的DOM对像，通过.append()加入页面
	 */
	LC.Components.ProgressBar.prototype.progressDOM;
	if ( typeof this.listener != 'function') {
		/**
		 * 设置监听，在读条完成后调用函数
		 * @param {function} fn
		 */
		LC.Components.ProgressBar.prototype.listener = function(fn) {
			//获得组件内部div progressBar
			var progressChilds = this.progressDOM.children("div.progress-bar");
			progressChilds.first()[0].addEventListener('transitionend', fn, false);
			return this;
		};
	};
	if ( typeof this.start != 'function') {
		/**
		 * 运行，开始读条到指定百分比
		 * param {Object} widthPercentage 百分比
		 */
		LC.Components.ProgressBar.prototype.start = function(widthPercentage) {
			//获得组件内部div progressBar
			var progressChilds = this.progressDOM.children("div.progress-bar");
			//重新设置运行时间样式（安全设置，防止页面修改）
			progressChilds.first().css({
				"-webkit-transition" : " width " + runningTime + "s linear ",
				"-moz-transition" : " width " + runningTime + "s linear ",
				"-o-transition" : " width " + runningTime + "s linear ",
				"transition" : " width " + runningTime + "s linear "
			});
			progressChilds.first().next().css({
				"-webkit-transition" : " width " + runningTime + "s linear ",
				"-moz-transition" : " width " + runningTime + "s linear ",
				"-o-transition" : " width " + runningTime + "s linear ",
				"transition" : " width " + runningTime + "s linear "
			});
			if (!(null == widthPercentage || "" == widthPercentage)) {
				if ("%" == widthPercentage.substring(widthPercentage.length - 1)) {
					widthPercentage = widthPercentage.substring(0, widthPercentage.length - 1);
				};
				var patt1 = new RegExp(/^[0-1]?\d{1,2}(\.\d+)?$/);
				if (patt1.test(widthPercentage)) {
					this.setWidth(widthPercentage);
				} else {
					throw Error("传入值必须为0-100或0%-100%的数字,可以是小数");
				}
			}
			progressChilds.first().css({
				"width" : widthPercentage + "%"
			});
			progressChilds.first().next().css({
				"width" : 100 - widthPercentage + "%"
			});
			;
			return this;
		};
	}
};
/**
 * 进度条style1样式(条纹动画)
 */
LC.Components.ProgressBarStyle1 = function() {
};
LC.Utils.extend(LC.Components.ProgressBarStyle1, LC.Components.ProgressBar);
LC.Components.ProgressBarStyle1.prototype.styleAlter = function(progress) {
	//获得组件内部div progressBar
	progress.children("div.progress-bar").first().attr({
		"class" : "progress-bar progress-bar-striped active"
	});
	return progress;
};
/**
 * 进度条style2样式(带背景色)
 */
LC.Components.ProgressBarStyle2 = function() {
};
LC.Utils.extend(LC.Components.ProgressBarStyle2, LC.Components.ProgressBar);
LC.Components.ProgressBarStyle2.prototype.styleAlter = function(progress) {
	progress.append($("<div></div>").attr({
		"class" : "progress-bar progress-bar-striped",
		"role" : "progressbar",
		"aria-valuenow" : "0",
		"aria-valuemin" : "0",
		"aria-valuemax" : "100"
	}).css({
		"width" : "100%"
	}));
	//获得组件内部div progressBar
	progress.children("div.progress-bar").first().attr({
		"class" : "progress-bar progress-bar-striped active"
	});
	return progress;
};
/**
 * 组件空间中加入进度条工厂
 */
LC.Components.ProgressBarFactory = {
	/**
	 * 创建并返回一个标识为传入name样式为style1的进度条html对象progress，请调用.append()加入页面中显示
	 * @param {Object} progressID 进度条id
	 */
	createProgressBar : function(progressID) {
		var returnProgress = new LC.Components.ProgressBar(progressID);
		returnProgress.creatProgressDOM();
		return returnProgress;
	},
	createProgressBarStyle1 : function(progressID) {
		var returnProgress = new LC.Components.ProgressBarStyle1(progressID);
		returnProgress.creatProgressDOM();
		return returnProgress;
	},
	createProgressBarStyle2 : function(progressID) {
		var returnProgress = new LC.Components.ProgressBarStyle2(progressID);
		returnProgress.creatProgressDOM();
		return returnProgress;
	}
};
