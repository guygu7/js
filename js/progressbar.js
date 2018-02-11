/**
 * 组件空间中加入按钮类
 */
LC.Components.ProgressBar = function() {
};
LC.Utils.extend(LC.Components.ProgressBar, LC.Components.BasicComponent);
//获取进度条长度过渡效果运行时间Map
LC.Components.ProgressBar.prototype.getRunningTime = function() {
	if (!this._runningTimeMap) {
		this._runningTimeMap = new LC.Utils.Map();
	}
	return this._runningTimeMap;
};
//(time, num) 设置进度条长度过渡效果运行时间，单位s（一次只能设置一个子进度条）
LC.Components.ProgressBar.prototype.setRunningTime = function(time, num) {
	if (!this._runningTimeMap) {
		this._runningTimeMap = new LC.Utils.Map();
	}
	if (null != time) {
		if ( typeof time == "string" || typeof time == "number") {//类型校验通过则进行正浮点数数校验
			if (!new RegExp(/^[0-9]+(\.\d)?[0-9]*(s?|S?)$/).test(time)) {
				LC.warning("设置进度条过渡效果运行时长方法setRunningTime参数错误,必须是正浮点数。");
				time = 0;
				//校验到错误则设为0，提高容错率
			} else {//校验通过,如果尾部有"S"，则去掉
				time = time.toString().replace("s", "").replace("S", "");
			};
		} else {
			LC.warning("设置进度条过渡效果运行时长方法setRunningTime参数错误,必须是正浮点数。");
			time = 0;
			//校验到错误则设为0，提高容错率
		};
	} else {//未传参数默认0S
		time = 0;
	}
	num = LC.Components.ComponentFunction.checkNumInt(num, "设置进度条过渡效果运行时长方法setRunningTime");
	this._runningTimeMap.put(num.toString(), time.toString());
	return this;
};
//获取进度条要运行到的百分比Map
LC.Components.ProgressBar.prototype.getRunWidth = function() {
	if (!this._runWidthMap) {
		this._runWidthMap = new LC.Utils.Map();
	}
	return this._runWidthMap;
};
//(width, num) 设置进度条要运行到的百分比（一次只能设置一个子进度条）
LC.Components.ProgressBar.prototype.setRunWidth = function(width, num, fn) {
	if (!this._runWidthMap) {
		this._runWidthMap = new LC.Utils.Map();
	}
	if (null != width) {
		if ( typeof width == "string" || typeof width == "number") {//类型校验通过则进行正浮点数数校验
			if (!new RegExp(/^[0-9]+(\.\d)?[0-9]*\%?$/).test(width)) {
				LC.warning("设置进度条百分比方法setWidth参数错误,必须是正浮点数。");
				width = 0;
				//校验到错误则设为0%，提高容错率
			} else {//校验通过,如果尾部有"%"，则去掉
				width = width.toString().replace("%", "");
			};
		} else {
			LC.warning("设置进度条百分比方法setWidth参数错误,必须是正浮点数。");
			width = 0;
			//校验到错误则设为0%，提高容错率
		};
	} else {//未传参数默认0%
		width = 0;
	}
	num = LC.Components.ComponentFunction.checkNumInt(num, "设置进度条百分比方法setWidth");
	var oldWidth = "0";
	if (null != this._runWidthMap.get(num)) {
		oldWidth = this._runWidthMap.get(num);
	};
	this._runWidthMap.put(num.toString(), width.toString());
	if ( typeof fn == "function") {
		fn(width, num);
	}
	return this;
};
//设置进度条整体长度
LC.Components.ProgressBar.prototype.setSize = function(_width, _height) {
	this.dom.css({
		"width" : _width,
		"height" : _height
	});
};
//(fn, num) 设置监听，在读条完成后调用函数（只能设置一个子进度条）
LC.Components.ProgressBar.prototype.addListener = function(fn, num) {
	num = LC.Components.ComponentFunction.checkNumInt(num, "设置进度条监听回调函数方法setlistener,num");
	//获得组件内部div ProgressBar
	var progressChilds = this.dom.children("div.progress-bar");
	for (var i = 0; i < num; i++) {
		if (progressChilds.eq(num - 1).length > 0) {
			progressChilds.eq(num - 1)[0].addEventListener("transitionend", fn, false);
		} else {
			LC.warning("设置监听方法addListener未获取到有效的子进度条。");
		}
	};
	return this;
};
//(fn, num) 移除监听，移除在读条完成后调用函数（只能设置一个子进度条）
LC.Components.ProgressBar.prototype.removeListener = function(fn, num) {
	num = LC.Components.ComponentFunction.checkNumInt(num, "设置进度条监听回调函数方法setlistener,num");
	//获得组件内部div ProgressBar
	var progressChilds = this.dom.children("div.progress-bar");
	for (var i = 0; i < num; i++) {
		if (progressChilds.eq(num - 1).length > 0) {
			progressChilds.eq(num - 1)[0].removeEventListener("transitionend", fn, false);
		} else {
			LC.warning("设置监听方法addListener未获取到有效的子进度条。");
		}
	};
	return this;
};
// 获取进度条过渡效果Map
LC.Components.ProgressBar.prototype.getTransition = function() {
	if (!this._transitionMap) {
		this._transitionMap = new LC.Utils.Map();
	}
	return this._transitionMap;
};
//(str, num) 修改过渡效果(一次只能设置一个，除长度外，可以在尾部添加其他过渡效果)
LC.Components.ProgressBar.prototype.setTransition = function(str, num) {
	if (!this._transitionMap) {
		this._transitionMap = new LC.Utils.Map();
	}
	num = LC.Components.ComponentFunction.checkNumInt(num, "修改进度条过渡效果方法setTransition,num");
	if ( typeof str == "string") {//如果不为string,则设置无效
		this._transitionMap.put(num.toString(), str);
	} else {
		LC.warning("修改过渡效果失败，setTransition方法接收了不为String的无效参数！");
	};
	return this;
};
//(str, num) 还原过渡效果(一次只能设置一个)
LC.Components.ProgressBar.prototype.removeTransition = function(num) {
	if (!this._transitionMap) {
		this._transitionMap = new LC.Utils.Map();
	}
	if (null == num) {
		this._transitionMap.clear();
	} else {
		var param = LC.Components.ComponentFunction.checkInt(arguments, "还原进度条过渡效果方法setTransition");
		for (var i = 0; i < param.length; i++) {
			this._transitionMap.removeByKey(Number(param[i]).toString);
		};
		//num = LC.Components.ComponentFunction.checkNumInt(num, "还原进度条过渡效果方法setTransition,num");
		//_transitionMap.remove(num.toString);
	}
	return this;
};
LC.Components.ProgressBar.prototype.setColor = function(color, num) {
	num = LC.Components.ComponentFunction.checkNumInt(num, "修改进度条过渡效果方法setTransition,num");
	if ( typeof color == "string") {//如果color不为string,则设置无效
		//获得组件内部div progressBar
		var progressChild = this.dom.children("div.progress-bar").eq(Number(num) - 1);
		if (progressChild.length > 0) {
			progressChild.css({
				"background" : color
			});
		} else {
			LC.warning("设置颜色方法setColor未获取到有效的子进度条。");
		};
	} else {
		LC.warning("设置颜色失败，setColor方法接收了不为String的无效参数！");
	};
	return this;
};
//创建进度条的DOM对像,传入需要创建的子进度条的个数
LC.Components.ProgressBar.prototype.creatDOM = function() {
	var sign = LC.CommonProperty.SIGN;
	//创建容器
	var progress = $("<div></div>").attr({
		sign : this.getSignID(),
		"class" : LC.CommonProperty.CSS_PROGRESS+LC.CommonProperty.CSS_POSITION_ABSOLUTE,
	});
	//创建显示进度
	var progressBar = $("<div></div>").attr({
		"class" : LC.CommonProperty.CSS_PROGRESS_BAR+LC.CommonProperty.CSS_POSITION_ABSOLUTE,
	});
	//创建影子
	var progressShadow = $("<div></div>").attr({
		"class" : LC.CommonProperty.CSS_PROGRESS_BAR+LC.CommonProperty.CSS_PROGRESS_SHADOW+LC.CommonProperty.CSS_POSITION_ABSOLUTE,
	});
	progress.append(progressBar).append(progressShadow);
	this.dom = this.styleAlter(progress);
	this.dom.self = this;
	return this.dom;
};
//运行，开始读条到设定百分比
LC.Components.ProgressBar.prototype.start = function() {
	//获得组件内部div progressBar
	var progressChilds = this.dom.children("div.progress-bar");
	var jQueryObject;
	//子进度条DOM对象
	//重新设置运行时间样式（安全设置，防止页面修改）
	for (var i = 0; i < progressChilds.length; i++) {
		jQueryObject = progressChilds.eq(i);
		var childTime = this.getRunningTime().get((i + 1).toString());
		var childTransition = this.getTransition().get((i + 1).toString());
		if (null == childTransition) {
			childTransition = " linear ";
		};
		jQueryObject.css({
			"-webkit-transition" : " width " + childTime + "s " + childTransition,
			"-moz-transition" : " width " + childTime + "s " + childTransition,
			"-o-transition" : " width " + childTime + "s " + childTransition,
			"transition" : " width " + childTime + "s " + childTransition
		});
		var childWidth = this.getRunWidth().get((i + 1).toString());
		jQueryObject.css({
			"width" : childWidth + "%"
		});
	};
	return this;
};

/**
 * 组件空间中加入进度条工厂
 */
LC.Components.ProgressBarFactory = {
	/**
	 * 进度条，创建并返回一个关闭按钮html对象Menu，调用.append()加入页面中显示
	 * @param {String} _id
	 * @param {String} _cssClass
	 */
	createProgressBar : function(_id, _cssClass) {
		var progressBar = new LC.Components.ProgressBar();
		if (_cssClass) {
			progressBar.setSignID(_id).creatDOM("div", _cssClass);
		} else {
			progressBar.setSignID(_id).creatDOM("div", null);
		}
		return progressBar;
	},
	/**
	 * 模拟HP条
	 * @param {String} progressID
	 * @param {String} width
	 */
	createProgressBar1 : function(progressID, width) {
		var progressBar = new LC.Components.ProgressBar();
		progressBar.setSignID(progressID).creatDOM(2).css({
			//创建同时设置边框
			"border" : "3px ridge #767676",
			"border-radius" : "25px"
		}).children("div.progress-bar").eq(1).css({
			//设置影子透明度
			"opacity" : "0.8"
		});
		if (null == width) {
			//默认初始为满值
			width = 100;
		};
		progressBar.setRunWidth(width, 1).setRunWidth(width, 2).start();
		//设置HP条主要颜色
		progressBar.setColor(LC.CommonProperty.COLOR_PROGRESS_GREY, 1);
		//设置HP条影子颜色
		progressBar.setColor(LC.CommonProperty.COLOR_PROGRESS_GREY, 2);
		//设置长度变化效果（影子延迟）
		progressBar.setRunningTime(0.2, 1).setTransition(" ease 0.2s", 2).setRunningTime(0.5, 2);
		return progressBar;
	}
};
