/**
 * 组件空间中装入进度条类,支持方法：
 * getSignID() 获取进度条自定义ID
 * setSignID(ID) 设置进度条自定义ID
 * getRunningTime() 获取进度条长度过渡效果运行时间Map
 * setRunningTime(time, num) 设置进度条长度过渡效果运行时间，单位s（一次只能设置一个子进度条）
 * getWidth() 获取进度条要运行到的百分比Map
 * setWidth(width, num) 设置进度条要运行到的百分比（一次只能设置一个子进度条）
 * addStriped(args) 按传入顺位号添加条纹
 * removeStriped(args) 按传入顺位号移除条纹
 * addActive(args) 按传入顺位号添加条纹动画
 * removeActive(args) 按传入顺位号移除条纹动画
 * styleAlter(progress) 进度条样式修改(子类继承扩展重写使用)
 * creatDOM(num) 创建进度条的DOM对像,传入需要创建的子进度条的个数
 * addListener(fn, num) 设置监听，在读条完成后调用函数（只能设置一个子进度条）
 * removeListener(fn, num) 移除监听，移除在读条完成后调用函数（只能设置一个子进度条）
 * setTransition(str, num) 修改过渡效果(一次只能设置一个，除长度外，可以在尾部添加其他过渡效果)
 * getTransition() 获取进度条过渡效果Map
 * removeTransition(str, num) 还原过渡效果(一次只能设置一个)
 * start()  运行，开始读条到设定百分比
 *
 * dom 进度条的DOM对像，通过.append()加入页面
 *
 * @param {Object} progressID 进度条id
 */
LC.Components.ProgressBar = function(progressID) {
	var _signID = progressID;
	//进度条自定义ID
	if ( typeof this.getSignID != "function") {
		/**
		 * 获取进度条自定义ID
		 */
		LC.Components.ProgressBar.prototype.getSignID = function() {
			return _signID;
		};
	};
	if ( typeof this.setSignID != "function") {
		/**
		 * 设置进度条自定义ID
		 */
		LC.Components.ProgressBar.prototype.setSignID = function(ID) {
			_signID = ID;
			return this;
		};
	};
	var _runningTimeMap = new LC.Utils.Map();
	//进度条过渡效果运行时间
	if ( typeof this.getRunningTime != "function") {
		/**
		 * 获取进度条过渡效果运行时间map
		 */
		LC.Components.ProgressBar.prototype.getRunningTime = function() {
			return _runningTimeMap;
		};
	};
	if ( typeof this.setRunningTime != "function") {
		/**
		 * 设置进度条过渡效果运行时间，单位s（只能设置一个子进度条）
		 * @param {Object} time 运行时间
		 * @param {Object} num 子进度条的顺位
		 * @return this
		 */
		LC.Components.ProgressBar.prototype.setRunningTime = function(time, num) {
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
			_runningTimeMap.put(num.toString(), time.toString());
			return this;
		};
	};
	var _widthMap = new LC.Utils.Map();
	//进度条长度（百分比）
	if ( typeof this.getWidth != "function") {
		/**
		 * 获取进度条要运行到的百分比Map
		 * @return _widthMap
		 */
		LC.Components.ProgressBar.prototype.getWidth = function() {
			return _widthMap;
		};
	};
	if ( typeof this.setWidth != "function") {
		/**
		 * 设置进度条要运行到的百分比
		 * @param {Object} width 百分比
		 * @param {Object} num 子进度条顺位
		 * @param {Object} fn(width,num) 传入函数，参数为setWidth中的(width,num)，可以用于操作其他子进度条长度，或者校验总长度是否大于100%
		 * @return this
		 */
		LC.Components.ProgressBar.prototype.setWidth = function(width, num, fn) {
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
			if (null != _widthMap.get(num)) {
				oldWidth = _widthMap.get(num);
			};
			_widthMap.put(num.toString(), width.toString());
			/*
			 if (Number(width) > Number(oldWidth)) {//判断是增大
			 if (null != linkage) {//是否联动
			 if ("next" == linkage) {//联动修改下一个，下一个缩小
			 var widthA = Number(_widthMap.get(num + 1)) - Number(width) + Number(oldWidth);
			 widthA = (widthA >= 0) ? widthA : 0;
			 //计算后小于0则取0
			 _widthMap.put((num + 1).toString(), widthA.toString());
			 } else if ("last" == linkage) {//联动修改上一个
			 if ((num - 1) >= 1) {
			 var widthA = Number(_widthMap.get(num - 1)) - Number(width) + Number(oldWidth);
			 widthA = (widthA >= 0) ? widthA : 0;
			 //计算后小于0则取0
			 _widthMap.put((num - 1).toString(), widthA.toString());
			 } else {
			 LC.warning("进度条setWidth方法联动设置失败，已经是第一个元素。");
			 }
			 }
			 }
			 */
			/*
			 //校验_width总和，不能大于100，大于100则从后往前依次缩小
			 var mapKeys = _widthMap.keys();
			 mapKeys.sort(function(a, b) {
			 return a - b;
			 });
			 var sumWidth = 0;
			 for (var i = 0; i < mapKeys.length; i++) {
			 if (sumWidth + Number(_widthMap.get(mapKeys[i])) < 100) {//相加后小于100
			 sumWidth = sumWidth + Number(_widthMap.get(mapKeys[i]));
			 //累加
			 } else if (sumWidth < 100) {//小于100，但相加后大于100
			 _widthMap.put(mapKeys[i], (100 - sumWidth).toString());
			 } else {//大于等于100，设为0
			 _widthMap.put(mapKeys[i], "0");
			 }
			 };*/
			/*
			 } else if (Number(width) < Number(oldWidth)) {//判断是缩小
			 if (null != linkage) {//是否联动
			 if ("next" == linkage) {//联动修改下一个，下一个增加
			 _widthMap.put((num + 1).toString(), (Number(oldWidth) - Number(width) + Number(_widthMap.get(num + 1))).toString());
			 } else if ("last" == linkage) {//联动修改上一个
			 if ((num - 1) >= 1) {
			 _widthMap.put((num - 1).toString(), (Number(oldWidth) - Number(width) + Number(_widthMap.get(num - 1))).toString());
			 } else {
			 LC.warning("进度条setWidth方法联动设置失败，已经是第一个元素。");
			 }
			 }
			 }
			 }
			 */
			if ( typeof fn == "function") {
				fn(width, num);
			}
			return this;
		};
	};
	//添加条纹效果
	if ( typeof this.addStriped != "function") {
		/**
		 * 按传入顺位号添加条纹
		 * @param args args[] ...args
		 * @return this
		 */
		LC.Components.ProgressBar.prototype.addStriped = function(args) {
			var param = LC.Components.ComponentFunction.checkInt(arguments, "添加条纹方法addStriped");
			//获得组件内部div progressBar
			var progressChilds = this.dom.children("div.progress-bar");
			for (var i = 0; i < param.length; i++) {
				if (progressChilds.eq(Number(param[i]) - 1).length > 0) {
					var className = progressChilds.eq(Number(param[i]) - 1).attr("class");
					if (-1 == className.search(/progress-bar-striped/)) {//校验是否存在条纹效果，没有则添加条纹效果
						progressChilds.eq(Number(param[i]) - 1).attr({
							"class" : className + " progress-bar-striped "
						});
					};
				} else {
					LC.warning("添加条纹效果方法addStriped未获取到有效的子进度条。");
				}
			};
			return this;
		};
	};
	//去除条纹效果
	if ( typeof this.removeStriped != "function") {
		/**
		 *  按传入顺位号移除条纹
		 * @param args args[] ...args
		 * @return this
		 */
		LC.Components.ProgressBar.prototype.removeStriped = function(args) {
			var param = LC.Components.ComponentFunction.checkInt(arguments, "去除条纹方法removeStriped");
			//获得组件内部div progressBar
			var progressChilds = this.dom.children("div.progress-bar");
			for (var i = 0; i < param.length; i++) {
				if (progressChilds.eq(Number(param[i]) - 1).length > 0) {
					var className = progressChilds.eq(Number(param[i]) - 1).attr("class");
					if (-1 == className.search(/progress-bar-striped/)) {//校验是否存在条纹效果，有则删除条纹效果
						progressChilds.eq(Number(param[i]) - 1).attr({
							"class" : className.replace(/progress-bar-striped/, "")
						});
					};
				} else {
					LC.warning("移除条纹效果方法removeStriped未获取到有效的子进度条。");
				}
			};
			return this;
		};
	};
	//添加条纹动画效果
	if ( typeof this.addActive != "function") {
		/**
		 * 按传入顺位号添加条纹动画
		 * @param args args[] ...args
		 * @return this
		 */
		LC.Components.ProgressBar.prototype.addActive = function(args) {
			var param = LC.Components.ComponentFunction.checkInt(arguments, "添加条纹方法addStriped");
			//获得组件内部div progressBar
			var progressChilds = this.dom.children("div.progress-bar");
			for (var i = 0; i < param.length; i++) {
				if (progressChilds.eq(Number(param[i]) - 1).length > 0) {
					var className = progressChilds.eq(Number(param[i]) - 1).attr("class");
					if (-1 == className.search(/active/)) {//校验是否存在条纹效果，没有则添加条纹效果
						progressChilds.eq(Number(param[i]) - 1).attr({
							"class" : className + " active "
						});
					};
				} else {
					LC.warning("添加条纹动画效果方法addActive未获取到有效的子进度条。");
				}
			};
			return this;
		};
	};
	//去除条纹动画效果
	if ( typeof this.removeActive != "function") {
		/**
		 * 按传入顺位号移除条纹动画
		 * @param args args[] ...args
		 * @return this
		 */
		LC.Components.ProgressBar.prototype.removeActive = function(args) {
			var param = LC.Components.ComponentFunction.checkInt(arguments, "去除条纹方法removeStriped");
			//获得组件内部div progressBar
			var progressChilds = this.dom.children("div.progress-bar");
			for (var i = 0; i < param.length; i++) {
				if (progressChilds.eq(Number(param[i]) - 1).length > 0) {
					var className = progressChilds.eq(Number(param[i]) - 1).attr("class");
					if (-1 == className.search(/active/)) {//校验是否存在条纹效果，有则删除条纹效果
						progressChilds.eq(Number(param[i]) - 1).attr({
							"class" : className.replace(/active/, "")
						});
					};
				} else {
					LC.warning("移除条纹动画效果方法removeActive未获取到有效的子进度条。");
				}
			};
			return this;
		};
	};
	if ( typeof this.styleAlter != "function") {
		/**
		 * 进度条样式修改(子类继承扩展)
		 * @param {Object} progress 进度条对象
		 * @param {Function} fn 修改函数
		 */
		LC.Components.ProgressBar.prototype.styleAlter = function(progress, fn) {
			if ( typeof fn == "function") {
				fn(progress);
			}
			return progress;
		};
	};
	if ( typeof this.creatDOM != "function") {
		/**
		 * 创建进度条的DOM对像,传入需要创建的子进度条的个数
		 * @param num 需要创建的子进度条的个数
		 * @return dom
		 */
		LC.Components.ProgressBar.prototype.creatDOM = function(num) {
			if (null == num) {
				num = 1;
			};
			var param = Number(LC.Components.ComponentFunction.checkNumInt(num, "创建进度条方法creatDOM"));
			var sign = LC.CommonProperty.SIGN;
			var progress = $("<div></div>").attr({
				sign : _signID,
				"class" : "progress"
			}).css({
				"position" : "relative"
			});
			for (var i = 0; i < param; i++) {
				progress.append($("<div></div>").attr({
					"class" : "progress-bar",
					"role" : "progressbar",
					"aria-valuenow" : "0",
					"aria-valuemin" : "0",
					"aria-valuemax" : "100",
				}).css({
					"position" : "absolute",
					"z-index" : param - i
				}));
			};
			this.dom = this.styleAlter(progress);
			return this.dom;
		};
	};
	/**
	 * 获取进度条的DOM对像，通过.append()加入页面
	 */
	dom = null;
	if ( typeof this.addListener != "function") {
		/**
		 * 设置监听，在读条完成后调用函数(一次只能设置一个)
		 * @param {function} fn
		 * @param {Object} num 子进度条顺位
		 */
		LC.Components.ProgressBar.prototype.addListener = function(fn, num) {
			num = LC.Components.ComponentFunction.checkNumInt(num, "设置进度条监听回调函数方法setlistener,num");
			//获得组件内部div progressBar
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
	};
	if ( typeof this.removeListener != "function") {
		/**
		 * 移除监听，移除在读条完成后调用函数(一次只能设置一个)
		 * @param {function} fn
		 * @param {Object} num 子进度条顺位
		 */
		LC.Components.ProgressBar.prototype.removeListener = function(fn, num) {
			num = LC.Components.ComponentFunction.checkNumInt(num, "设置进度条监听回调函数方法setlistener,num");
			//获得组件内部div progressBar
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
	};
	//修改过渡效果
	var _transitionMap = new LC.Utils.Map();
	if ( typeof this.setTransition != "function") {
		/**
		 * 修改过渡效果(一次只能设置一个，除长度外，可以在尾部添加其他过渡效果)
		 * @param {Object} str css的过渡效果，只能是String
		 * @param {Object} num 子进度条顺位
		 */
		LC.Components.ProgressBar.prototype.setTransition = function(str, num) {
			num = LC.Components.ComponentFunction.checkNumInt(num, "修改进度条过渡效果方法setTransition,num");
			if ( typeof str == "string") {//如果不为string,则设置无效
				_transitionMap.put(num.toString(), str);
			} else {
				LC.warning("修改过渡效果失败，setTransition方法接收了不为String的无效参数！");
			};
			return this;
		};
	};
	//获取过渡效果Map
	if ( typeof this.getTransition != "function") {
		/**
		 * 获取进度条过渡效果Map
		 * @return {Map} _transitionMap
		 */
		LC.Components.ProgressBar.prototype.getTransition = function() {
			return _transitionMap;
		};
	};
	//还原过渡效果
	if ( typeof this.removeTransition != "function") {
		/**
		 * 还原过渡效果(不传参则全清)
		 * @param {Object} num num[] ...num
		 */
		LC.Components.ProgressBar.prototype.removeTransition = function(num) {
			if (null == num) {
				_transitionMap.clear();
			} else {
				var param = LC.Components.ComponentFunction.checkInt(arguments, "还原进度条过渡效果方法setTransition");
				for (var i = 0; i < param.length; i++) {
					_transitionMap.removeByKey(Number(param[i]).toString);
				};
				//num = LC.Components.ComponentFunction.checkNumInt(num, "还原进度条过渡效果方法setTransition,num");
				//_transitionMap.remove(num.toString);
			}
			return this;
		};
	};
	//设置颜色，立即生效
	if ( typeof this.setColor != "function") {
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
	};
	if ( typeof this.start != "function") {
		/**
		 * 运行，开始读条到设定百分比
		 */
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
				var childWidth = this.getWidth().get((i + 1).toString());
				jQueryObject.css({
					"width" : childWidth + "%"
				});
			};
			return this;
		};
	};
};
/**
 * 进度条style1样式(子类继承)
 */
LC.Components.ProgressBarStyle1 = function() {
};
LC.Utils.extend(LC.Components.ProgressBarStyle1, LC.Components.ProgressBar);
/*
LC.Components.ProgressBarStyle1.prototype.setWidth = function(width,num) {
LC.Components.ProgressBarStyle1.superClass.setWidth(width,num);
LC.Components.ProgressBarStyle1.superClass.setWidth(width,num+1);
};
*/
/**
 * 组件空间中加入进度条工厂
 */
LC.Components.ProgressBarFactory = {
	/**
	 * 进度条基本样式，创建并返回一个进度条html对象progress，调用.append()加入页面中显示
	 * @param {Object} progressID 进度条id
	 */
	createProgressBar : function(progressID) {
		var returnProgress = new LC.Components.ProgressBar();
		returnProgress.setSignID(progressID).creatDOM(1);
		return returnProgress;
	},
	/**
	 * 模拟HP条
	 * @param {String} progressID
	 * @param {String} width
	 */
	createProgressBar1 : function(progressID, width) {
		var returnProgress = new LC.Components.ProgressBar();
		returnProgress.setSignID(progressID).creatDOM(2).css({
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
		returnProgress.setWidth(width, 1).setWidth(width, 2).start();
		//设置HP条主要颜色
		returnProgress.setColor(LC.CommonProperty.COLOR_PROGRESS_GREY, 1);
		//设置HP条影子颜色
		returnProgress.setColor(LC.CommonProperty.COLOR_PROGRESS_GREY, 2);
		//设置长度变化效果（影子延迟）
		returnProgress.setRunningTime(0.2, 1).setTransition(" ease 0.2s", 2).setRunningTime(0.5, 2);
		return returnProgress;
	}
};
