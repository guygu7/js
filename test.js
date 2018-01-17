/**
 * @author LC 命名空间  namespace
 */
var LC = {};
/**
 * 定义工具空间
 */
LC.Utils = {};
/**
 * 打印错误信息
 */
LC.warning = function(msg) {
	console.info("warning : " + msg);
};
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
 * Map支持方法
 * size()     获取MAP元素个数
 * isEmpty()    判断MAP是否为空
 * clear()     删除MAP所有元素
 * put(key, value)   向MAP中增加元素（key, value)
 * remove(key)    删除指定KEY的元素，成功返回True，失败返回False
 * get(key)    获取指定KEY的元素值VALUE，失败返回NULL
 * element(index)   获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
 * containsKey(key)  判断MAP中是否含有指定KEY的元素
 * containsValue(value) 判断MAP中是否含有指定VALUE的元素
 * values()    获取MAP中所有VALUE的数组（ARRAY）
 * keys()     获取MAP中所有KEY的数组（ARRAY）
 */
LC.Utils.Map = function() {
	this.elements = new Array();

	//获取MAP元素个数
	if ( typeof this.size != 'function') {
		LC.Utils.Map.prototype.size = function() {
			return this.elements.length;
		};
	};
	//判断MAP是否为空
	if ( typeof this.isEmpty != 'function') {
		LC.Utils.Map.prototype.isEmpty = function() {
			return (this.elements.length < 1);
		};
	};
	//删除MAP所有元素
	if ( typeof this.clear != 'function') {
		LC.Utils.Map.prototype.clear = function() {
			this.elements = new Array();
		};
	};
	//向MAP中增加元素（key, value)
	if ( typeof this.put != 'function') {
		LC.Utils.Map.prototype.put = function(_key, _value) {
			if (this.get(_key)) {
				this.removeByKey(_key);
			};
			this.elements.push({
				key : _key,
				value : _value
			});
		};
	};
	//删除指定KEY的元素，成功返回True，失败返回False
	if ( typeof this.removeByKey != 'function') {
		LC.Utils.Map.prototype.removeByKey = function(_key) {
			var bln = false;
			try {
				for ( i = 0; i < this.elements.length; i++) {
					if (this.elements[i].key == _key) {
						this.elements.splice(i, 1);
						return true;
					}
				}
			} catch (e) {
				bln = false;
			}
			return bln;
		};
	};
	//删除指定VALUE的元素，成功返回True，失败返回False
	if ( typeof this.removeByValue != 'function') {
		LC.Utils.Map.prototype.removeByValue = function(_value) {//removeByValueAndKey
			var bln = false;
			try {
				for ( i = 0; i < this.elements.length; i++) {
					if (this.elements[i].value == _value) {
						this.elements.splice(i, 1);
						return true;
					}
				}
			} catch (e) {
				bln = false;
			}
			return bln;
		};
	};
	//删除指定VALUE的元素，成功返回True，失败返回False
	if ( typeof this.removeByValueAndKey != 'function') {
		LC.Utils.Map.prototype.removeByValueAndKey = function(_key, _value) {
			var bln = false;
			try {
				for ( i = 0; i < this.elements.length; i++) {
					if (this.elements[i].value == _value && this.elements[i].key == _key) {
						this.elements.splice(i, 1);
						return true;
					}
				}
			} catch (e) {
				bln = false;
			}
			return bln;
		};
	};
	//获取指定KEY的元素值VALUE，失败返回NULL
	if ( typeof this.get != 'function') {
		LC.Utils.Map.prototype.get = function(_key) {
			try {
				for ( i = 0; i < this.elements.length; i++) {
					if (this.elements[i].key == _key) {
						return this.elements[i].value;
					}
				}
			} catch (e) {
				return null;
			}
			return null;
		};
	};
	//获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
	if ( typeof this.element != 'function') {
		LC.Utils.Map.prototype.element = function(_index) {
			if (_index < 0 || _index >= this.elements.length) {
				return null;
			}
			return this.elements[_index];
		};
	};
	//判断MAP中是否含有指定KEY的元素
	if ( typeof this.containsKey != 'function') {
		LC.Utils.Map.prototype.containsKey = function(_key) {
			var bln = false;
			try {
				for ( i = 0; i < this.elements.length; i++) {
					if (this.elements[i].key == _key) {
						bln = true;
					}
				}
			} catch (e) {
				bln = false;
			}
			return bln;
		};
	};
	//判断MAP中是否含有指定VALUE的元素
	if ( typeof this.containsValue != 'function') {
		LC.Utils.Map.prototype.containsValue = function(_value) {
			var bln = false;
			try {
				for ( i = 0; i < this.elements.length; i++) {
					if (this.elements[i].value == _value) {
						bln = true;
					}
				}
			} catch (e) {
				bln = false;
			}
			return bln;
		};
	};
	//判断MAP中是否含有指定VALUE的元素
	if ( typeof this.containsObj != 'function') {
		LC.Utils.Map.prototype.containsObj = function(_key, _value) {
			var bln = false;
			try {
				for ( i = 0; i < this.elements.length; i++) {
					if (this.elements[i].value == _value && this.elements[i].key == _key) {
						bln = true;
					}
				}
			} catch (e) {
				bln = false;
			}
			return bln;
		};
	};
	//获取MAP中所有VALUE的数组（ARRAY）
	if ( typeof this.values != 'function') {
		LC.Utils.Map.prototype.values = function() {
			var arr = new Array();
			for ( i = 0; i < this.elements.length; i++) {
				arr.push(this.elements[i].value);
			}
			return arr;
		};
	};
	//获取MAP中所有VALUE的数组（ARRAY）
	if ( typeof this.valuesByKey != 'function') {
		LC.Utils.Map.prototype.valuesByKey = function(_key) {
			var arr = new Array();
			for ( i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					arr.push(this.elements[i].value);
				}
			}
			return arr;
		};
	};
	//获取MAP中所有KEY的数组（ARRAY）
	if ( typeof this.keys != 'function') {
		LC.Utils.Map.prototype.keys = function() {
			var arr = new Array();
			for ( i = 0; i < this.elements.length; i++) {
				arr.push(this.elements[i].key);
			}
			return arr;
		};
	};
	//获取key通过value
	if ( typeof this.keysByValue != 'function') {
		LC.Utils.Map.prototype.keysByValue = function(_value) {
			var arr = new Array();
			for ( i = 0; i < this.elements.length; i++) {
				if (_value == this.elements[i].value) {
					arr.push(this.elements[i].key);
				}
			}
			return arr;
		};
	};
	//获取MAP中所有KEY的数组（ARRAY）
	if ( typeof this.keysRemoveDuplicate != 'function') {
		LC.Utils.Map.prototype.keysRemoveDuplicate = function() {
			var arr = new Array();
			for ( i = 0; i < this.elements.length; i++) {
				var flag = true;
				for (var j = 0; j < arr.length; j++) {
					if (arr[j] == this.elements[i].key) {
						flag = false;
						break;
					}
				}
				if (flag) {
					arr.push(this.elements[i].key);
				}
			}
			return arr;
		};
	};
};
/**
 * 公共属性字典
 */
LC.CommonProperty = {
	SIGN : "lcsign" //通用标记属性，替代id
};
/**
 * 定义组件命名空间
 */
LC.Components = {};
/**
 * 组件所用到的公共方法集合
 */
LC.Components.ComponentFunction = {
	/**
	 * 传参校验，校验传入的参数是否为正整数或正整数数组，有错则报警，但程序不会终止
	 * @param {Object[]} args[] 需要校验的参数(必须)
	 * @param {Object} msg 报警提示信息
	 * @return param[]
	 */
	checkInt : function(args, msg) {
		if ( typeof msg != "string") {
			msg = "";
		};
		if (!args instanceof Array) {
			LC.warning("传参校验方法checkInt参数错误,不是一个数组。");
			return args;
		};
		var param;
		if (args.length == 0) {//未传参，则修改第一个
			param = ["1"];
		} else if (args.length == 1) {//传一个参数
			if (args[0] instanceof Array) {//是数组
				for (var i = 0; i < args[0].length; i++) {//遍历数组校验是否字符串或正整数
					if ( typeof args[0][i] == 'string' || typeof args[0][i] == 'number') {//类型校验通过则进行正整数校验
						if (!new RegExp(/^[1-9]\d*$/).test(args[0][i]))
							LC.warning(msg + "参数错误,必须是正整数。");
					} else {
						LC.warning(msg + "参数错误,必须是正整数。");
					};
				};
				param = args[0];
				//是数组则直接复制
			} else {//不是数组
				if ( typeof args[0] == 'string' || typeof args[0] == 'number') {//类型校验通过则进行正整数校验
					if (!new RegExp(/^[1-9]\d*$/).test(args[0])) {
						LC.warning(msg + "参数错误,必须是正整数。");
						param = ["1"];
						//校验到错误则设为1，提高容错率
					} else {
						param = args;
						//校验通过，赋值
					}
				} else {
					LC.warning(msg + "参数错误,必须是正整数。");
					param = ["1"];
					//校验到错误则设为1，提高容错率
				};
				//param = new RegExp(/^[1-9]\d*$/).test(args[0]) ? [args[0]] : LC.warning(msg + "参数错误,必须是正整数。");
			};
		} else {//传多个参数
			for (var i = 0; i < args.length; i++) {
				if ( typeof args[i] == 'string' || typeof args[i] == 'number') {//类型校验通过则进行正整数校验
					if (!new RegExp(/^[1-9]\d*$/).test(args[i]))
						LC.warning(msg + "参数错误,必须是正整数。");
				} else {
					LC.warning(msg + "参数错误,必须是正整数。");
				};
			};
			param = args;
		}
		return param;
	},
	/**
	 * 传参校验，校验传入的参数是否为正浮点数或正浮点数数组，有错则报警，但程序不会终止
	 * @param {Object[]} args[] 需要校验的参数(必须)
	 * @param {Object} msg 报警提示信息
	 * @return param[]
	 */
	checkFloat : function(args, msg) {
		if ( typeof msg != "string") {
			msg = "";
		};
		if (!args instanceof Array) {
			LC.warning("传参校验方法checkInt参数错误,不是一个数组。");
			return args;
		};
		var param;
		if (args.length == 0) {//未传参，则修改第一个
			param = ["1"];
		} else if (args.length == 1) {//传一个参数
			if (args[0] instanceof Array) {//是数组
				for (var i = 0; i < args[0].length; i++) {//遍历数组校验是否字符串或正整数
					if ( typeof args[0][i] == 'string' || typeof args[0][i] == 'number') {//类型校验通过则进行正整数校验
						if (!new RegExp(/^[0-9]+(\.\d)?[0-9]*$/).test(args[0][i]))
							LC.warning(msg + "参数错误,必须是正浮点数。");
					} else {
						LC.warning(msg + "参数错误,必须是正浮点数。");
					};
				};
				param = args[0];
				//是数组则直接复制
			} else {//不是数组
				if ( typeof args[0] == 'string' || typeof args[0] == 'number') {//类型校验通过则进行正整数校验
					if (!new RegExp(/^[0-9]+(\.\d)?[0-9]*$/).test(args[0])) {
						LC.warning(msg + "参数错误,必须是正浮点数。");
						param = ["0"];
						//校验到错误则设为0，提高容错率
					} else {
						param = args[0];
						//校验通过，赋值
					}
				} else {
					LC.warning(msg + "参数错误,必须是正浮点数。");
					param = ["0"];
					//校验到错误则设为0，提高容错率
				};
			};
		} else {//传多个参数
			for (var i = 0; i < args.length; i++) {
				if ( typeof args[i] == 'string' || typeof args[i] == 'number') {//类型校验通过则进行正整数校验
					if (!new RegExp(/^[0-9]+(\.\d)?[0-9]*$/).test(args[i]))
						LC.warning(msg + "参数错误,必须是正浮点数。");
				} else {
					LC.warning(msg + "参数错误,必须是正浮点数。");
				};
			};
			param = args;
		}
		return param;
	},
	/**
	 * 传参校验，校验传入的参数是否为正整数，有错则报警并设为默认值1，但程序不会终止
	 * @param {Object} num 需要校验的参数(非必须，未传则设为默认值1)
	 * @param {Object} msg 报警提示信息
	 * @return param[]
	 */
	checkNumInt : function(num, msg) {
		if (null != num) {
			if ( typeof num == 'string' || typeof num == 'number') {//类型校验通过则进行正整数校验
				if (!new RegExp(/^[1-9]\d*$/).test(num)) {
					LC.warning(msg + "参数错误,必须是正整数。");
					num = 1;
					//校验到错误则设为1，提高容错率
				} else {//校验通过
				};
			} else {
				LC.warning(msg + "参数错误,必须是正整数。");
				num = 1;
				//校验到错误则设为1，提高容错率
			};
		} else {//未传参数默认第一个
			num = 1;
		}
		return num;
	}
};
/**
 * 组件空间中装入进度条类,支持方法：
 * getSignID() 获取进度条自定义ID
 * setSignID(ID) 设置进度条自定义ID
 * getRunningTime() 获取进度条过渡效果运行时间Map
 * setRunningTime(time, num) 设置进度条过渡效果运行时间，单位s（只能设置一个子进度条）
 * getWidth() 获取进度条要运行到的百分比Map
 * setWidth(width, num) 设置进度条要运行到的百分比（只能设置一个子进度条）
 * addStriped(args) 按传入顺位号添加条纹
 * removeStriped(args) 按传入顺位号移除条纹
 * addActive(args) 按传入顺位号添加条纹动画
 * removeActive(args) 按传入顺位号移除条纹动画
 * styleAlter(progress) 进度条样式修改(子类继承重写使用)
 * creatProgressDOM(num) 创建进度条的DOM对像,传入需要创建的子进度条的个数
 * addListener(fn, num) 设置监听，在读条完成后调用函数（只能设置一个子进度条）
 * removeListener(fn, num) 移除监听，移除在读条完成后调用函数（只能设置一个子进度条）
 * setTransition(str, num) 修改过渡效果(一次只能设置一个，除长度外，可以在尾部添加其他过渡效果)
 * getTransition() 获取进度条过渡效果Map
 * removeTransition(str, num) 还原过渡效果(一次只能设置一个)
 * start()  运行，开始读条到设定百分比
 *
 * progressDOM 进度条的DOM对像，通过.append()加入页面
 *
 * @param {Object} progressID 进度条id
 */
LC.Components.ProgressBar = function(progressID) {
	var _signID = progressID;
	//进度条自定义ID
	if ( typeof this.getSignID != 'function') {
		/**
		 * 获取进度条自定义ID
		 */
		LC.Components.ProgressBar.prototype.getSignID = function() {
			return _signID;
		};
	};
	if ( typeof this.setSignID != 'function') {
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
	if ( typeof this.getRunningTime != 'function') {
		/**
		 * 获取进度条过渡效果运行时间map
		 */
		LC.Components.ProgressBar.prototype.getRunningTime = function() {
			return _runningTimeMap;
		};
	};
	if ( typeof this.setRunningTime != 'function') {
		/**
		 * 设置进度条过渡效果运行时间，单位s（只能设置一个子进度条）
		 * @param {Object} time 运行时间
		 * @param {Object} num 子进度条的顺位
		 * @return this
		 */
		LC.Components.ProgressBar.prototype.setRunningTime = function(time, num) {
			if (null != time) {
				if ( typeof time == 'string' || typeof time == 'number') {//类型校验通过则进行正浮点数数校验
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
	if ( typeof this.setWidth != 'function') {
		/**
		 * 设置进度条要运行到的百分比
		 * @param {Object} width 百分比
		 * @return this
		 */
		LC.Components.ProgressBar.prototype.setWidth = function(width, num) {
			if (null != width) {
				if ( typeof width == 'string' || typeof width == 'number') {//类型校验通过则进行正浮点数数校验
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
			_widthMap.put(num.toString(), width.toString());
			return this;
		};
	};
	if ( typeof this.getWidth != 'function') {
		/**
		 * 获取进度条要运行到的百分比Map
		 * @return _widthMap
		 */
		LC.Components.ProgressBar.prototype.getWidth = function() {
			return _widthMap;
		};
	};
	//添加条纹效果
	if ( typeof this.addStriped != 'function') {
		/**
		 * 按传入顺位号添加条纹
		 * @param args args[] ...args
		 * @return this
		 */
		LC.Components.ProgressBar.prototype.addStriped = function(args) {
			var param = LC.Components.ComponentFunction.checkInt(arguments, "添加条纹方法addStriped");
			//获得组件内部div progressBar
			var progressChilds = this.progressDOM.children("div.progress-bar");
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
	if ( typeof this.removeStriped != 'function') {
		/**
		 *  按传入顺位号移除条纹
		 * @param args args[] ...args
		 * @return this
		 */
		LC.Components.ProgressBar.prototype.removeStriped = function(args) {
			var param = LC.Components.ComponentFunction.checkInt(arguments, "去除条纹方法removeStriped");
			//获得组件内部div progressBar
			var progressChilds = this.progressDOM.children("div.progress-bar");
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
	if ( typeof this.addActive != 'function') {
		/**
		 * 按传入顺位号添加条纹动画
		 * @param args args[] ...args
		 * @return this
		 */
		LC.Components.ProgressBar.prototype.addActive = function(args) {
			var param = LC.Components.ComponentFunction.checkInt(arguments, "添加条纹方法addStriped");
			//获得组件内部div progressBar
			var progressChilds = this.progressDOM.children("div.progress-bar");
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
	if ( typeof this.removeActive != 'function') {
		/**
		 * 按传入顺位号移除条纹动画
		 * @param args args[] ...args
		 * @return this
		 */
		LC.Components.ProgressBar.prototype.removeActive = function(args) {
			var param = LC.Components.ComponentFunction.checkInt(arguments, "去除条纹方法removeStriped");
			//获得组件内部div progressBar
			var progressChilds = this.progressDOM.children("div.progress-bar");
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
		 * 创建进度条的DOM对像,传入需要创建的子进度条的个数
		 * @param num 需要创建的子进度条的个数
		 * @return progressDOM
		 */
		LC.Components.ProgressBar.prototype.creatProgressDOM = function(num) {
			if (null == num) {
				num = 1;
			};
			var param = LC.Components.ComponentFunction.checkInt([num], "创建进度条方法creatProgressDOM");
			var sign = LC.CommonProperty.SIGN;
			var progress = $("<div></div>").attr({
				sign : _signID,
				"class" : "progress"
			});
			for (var i = 0; i < param[0]; i++) {
				progress.append($("<div></div>").attr({
					"class" : "progress-bar",
					"role" : "progressbar",
					"aria-valuenow" : "0",
					"aria-valuemin" : "0",
					"aria-valuemax" : "100"
				}));
			};
			LC.Components.ProgressBar.prototype.progressDOM = this.styleAlter(progress);
			return LC.Components.ProgressBar.prototype.progressDOM;
		};
	};
	/**
	 * 获取进度条的DOM对像，通过.append()加入页面
	 */
	LC.Components.ProgressBar.prototype.progressDOM;
	if ( typeof this.addListener != 'function') {
		/**
		 * 设置监听，在读条完成后调用函数(一次只能设置一个)
		 * @param {function} fn
		 * @param {Object} num 子进度条顺位
		 */
		LC.Components.ProgressBar.prototype.addListener = function(fn, num) {
			num = LC.Components.ComponentFunction.checkNumInt(num, "设置进度条监听回调函数方法setlistener,num");
			//获得组件内部div progressBar
			var progressChilds = this.progressDOM.children("div.progress-bar");
			progressChilds.eq(Number(num) - 1)[0].addEventListener('transitionend', fn, false);
			return this;
		};
	};
	if ( typeof this.removeListener != 'function') {
		/**
		 * 移除监听，移除在读条完成后调用函数(一次只能设置一个)
		 * @param {function} fn
		 * @param {Object} num 子进度条顺位
		 */
		LC.Components.ProgressBar.prototype.removeListener = function(fn, num) {
			num = LC.Components.ComponentFunction.checkNumInt(num, "设置进度条监听回调函数方法setlistener,num");
			//获得组件内部div progressBar
			var progressChilds = this.progressDOM.children("div.progress-bar");
			progressChilds.eq(Number(num) - 1)[0].removeEventListener('transitionend', fn, false);
			return this;
		};
	};
	//修改过渡效果
	var _transitionMap = new LC.Utils.Map();
	if ( typeof this.setTransition != 'function') {
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
	if ( typeof this.getTransition != 'function') {
		/**
		 * 获取进度条过渡效果Map
		 * @return {Map} _transitionMap
		 */
		LC.Components.ProgressBar.prototype.getTransition = function() {
			return _transitionMap;
		};
	};
	//还原过渡效果
	if ( typeof this.removeTransition != 'function') {
		/**
		 * 还原过渡效果(不传参则全清)
		 * @param {Object} num num[] ...num
		 */
		LC.Components.ProgressBar.prototype.removeTransition = function(num) {
			if (null == num) {
				_transitionMap.clear();
			} else {
				var param = LC.Components.ComponentFunction.checkInt(arguments, "还原进度条过渡效果方法setTransition");
				for (var i=0; i < param.length; i++) {
					_transitionMap.remove(Number(param[i]).toString);
				};
				//num = LC.Components.ComponentFunction.checkNumInt(num, "还原进度条过渡效果方法setTransition,num");
				//_transitionMap.remove(num.toString);
			}
			return this;
		};
	};
	//设置颜色，立即生效
	if ( typeof this.setColor != 'function'){
		LC.Components.ProgressBar.prototype.setColor = function(color,num) {
			num = LC.Components.ComponentFunction.checkNumInt(num, "修改进度条过渡效果方法setTransition,num");
			if ( typeof color == "string") {//如果color不为string,则设置无效
				//获得组件内部div progressBar
				var progressChild = this.progressDOM.children("div.progress-bar").eq(Number(num)-1);
				progressChild.css({
					"background-color" : color
				});
			} else {
				LC.warning("设置颜色失败，setColor方法接收了不为String的无效参数！");
			};
			return this;
		};
	};
	if ( typeof this.start != 'function') {
		/**
		 * 运行，开始读条到设定百分比
		 */
		LC.Components.ProgressBar.prototype.start = function() {
			//获得组件内部div progressBar
			var progressChilds = this.progressDOM.children("div.progress-bar");
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
		var returnProgress = new LC.Components.ProgressBar();
		returnProgress.setSignID(progressID).creatProgressDOM(2);
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
