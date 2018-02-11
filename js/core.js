/**
 * @author LC 命名空间  namespace
 */
var LC = {};
/**
 * 公共属性字典
 */
LC.CommonProperty = {
	//通用标记属性，替代id
	SIGN : "lcsign",
	//底层桌面对象，用于终止置顶方法zIndexToTop
	MAIN_DESK : $("#mainDesktop"),
	//进度条过渡色：红色
	COLOR_PROGRESS_RED : " repeating-linear-gradient(#5A230F 1%,#FAAA87 20%,#E6815A 40%,#9E4635 97%,#5B3123 100%) ",
	//进度条过渡色：橙色
	COLOR_PROGRESS_ORIGIN : " repeating-linear-gradient(#D78728 1%,#F5C84B 20%,#EE8C20 40%,#D67B1B 97%,#532710 100%) ",
	COLOR_PROGRESS_ORIGIN2 : " repeating-linear-gradient(#D78728 1%,#F5C84B 20%,#EE8C20 40%,#B05718 97%,#532710 100%) ",
	//进度条过渡色：蓝色
	COLOR_PROGRESS_BLUE : " repeating-linear-gradient(#5A230F 1%,#67DAEC 20%,#0584BB 40%,#048ABD 97%,#5B3123 100%) ",
	//进度条过渡色：石板灰
	COLOR_PROGRESS_GREY : " repeating-linear-gradient(#5A230F 1%,#778899 20%,#708090 40%,#2F4F4F 97%,#5B3123 100%) ",
	//进度条过渡色：绿
	COLOR_PROGRESS_GREEN : " repeating-linear-gradient(#5A230F 1%,#3DFF1E 15%,#5DD810 50%,#157600 97%,#5B3123 100%) ",
	/*---CSS class---*/
	/**
	 * CSS class:hide-expand 隐藏特效（扩张消失）
	 */
	CSS_HIDE_EXPAND : " hide-expand ",
	/**
	 * CSS class:hide-shrink 隐藏特效（缩小消失）
	 */
	CSS_HIDE_SHRINK : " hide-shrink ",
	/**
	 * CSS class:背景桌布
	 */
	CSS_MAIN_DESKTOP : " main-desktop ",
	/**
	 * CSS class:场景桌面
	 */
	CSS_SCENE_DESKTOP : " scene-desktop ",
	//====面板====
	/**
	 * CSS class:面板（不透明）
	 */
	CSS_PANEL : " panel-basic ",
	/**
	 * CSS class:空气面板（用于布局）
	 */
	CSS_PANEL_AIR : " panel-air ",
	/**
	 * CSS class:面板（背景半透明，有边框和边距）
	 */
	CSS_PANEL_TRANSPARENT : " panel-transparent ",
	/**
	 * CSS class:面板（标题栏样式）
	 */
	CSS_PANEL_TITTLE : " panel-title ",
	/**
	 * CSS class:表格单元格tb样式
	 */
	CSS_PANEL_TABLE_TB : " panel-table-tb ",
	//====按钮====
	/**
	 * CSS class:右上角的关闭按钮
	 */
	CSS_BUTTON_CLOSE : " botton-colse ",
	/**
	 * CSS class:下拉菜单按钮
	 */
	CSS_BUTTON_DROPDOWN : " botton-dropdown ",
	//====角标====
	/**
	 * CSS class:角标
	 */
	CSS_CORNERSIGN : " cornersign ",
	//====菜单====
	/**
	 * CSS class:下拉菜单
	 */
	CSS_DROPDOWN : " dropdown ",
	//====进度条====
	/**
	 * 进度条容器
	 */
	CSS_PROGRESS : " progress ",
	/**
	 * 进度条
	 */
	CSS_PROGRESS_BAR :" progress-bar ",
	/**
	 * 进度条影子
	 */
	CSS_PROGRESS_SHADOW : " progress-shadow ",
	//====定位====
	/**
	 * CSS class:定位右下
	 */
	CSS_POSITION_LOWERRIGHT : " lowerright ",
	/**
	 * CSS class:定位右上
	 */
	CSS_POSITION_UPPERRIGHT : " upperright ",
	/**
	 * CSS class:定位左下
	 */
	CSS_POSITION_LOWERLEFT : " lowerleft ",
	/**
	 * CSS class:定位左上
	 */
	CSS_POSITION_UPPERLEFT : " upperleft ",
	/**
	 *  CSS class:相对定位
	 */
	CSS_POSITION_RELATIVE : " position-relative ",
	/**
	 *  CSS class:相对定位
	 */
	CSS_POSITION_ABSOLUTE : " position-absolute ",
};
/**
 * 全局变量 
 */
LC.GlobalVar={
};
/**
 * 打印错误信息
 */
LC.warning = function(msg) {
	console.info("warning : " + msg);
};
/**
 * 定义工具空间
 */
LC.Utils = {};
/**
 * <br>继承方法</br>
 * 参数：</br>
 * Object sub (必须)用于继承的子类</br>
 * Object sup (必须)被继承的父类
 * @param {Object} sub
 * @param {Object} sup
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
 * removeByKey(key)    删除指定KEY的元素，成功返回True，失败返回False
 * removeByValue(_value)    删除指定_value的元素，成功返回True，失败返回False
 * removeByValueAndKey(_key,_value)    删除指定KEY&_value的元素，成功返回True，失败返回False
 * get(key)    获取指定KEY的元素值VALUE，失败返回NULL
 * element(index)   获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
 * containsKey(key)  判断MAP中是否含有指定KEY的元素
 * containsValue(value) 判断MAP中是否含有指定VALUE的元素
 * containsObj(key,value) 判断MAP中是否含有指定KEY&VALUE的元素
 * values()    获取MAP中所有VALUE的数组（ARRAY）
 * valuesByKey
 * keys()     获取MAP中所有KEY的数组（ARRAY）
 * keysByValue
 * keysRemoveDuplicate
 */
LC.Utils.Map = function() {
	this.elements = new Array();
	//获取MAP元素个数
	if ( typeof this.size != "function") {
		LC.Utils.Map.prototype.size = function() {
			return this.elements.length;
		};
	};
	//判断MAP是否为空
	if ( typeof this.isEmpty != "function") {
		LC.Utils.Map.prototype.isEmpty = function() {
			return (this.elements.length < 1);
		};
	};
	//删除MAP所有元素
	if ( typeof this.clear != "function") {
		LC.Utils.Map.prototype.clear = function() {
			this.elements = new Array();
		};
	};
	//向MAP中增加元素（key, value)
	if ( typeof this.put != "function") {
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
	if ( typeof this.removeByKey != "function") {
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
	if ( typeof this.removeByValue != "function") {
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
	if ( typeof this.removeByValueAndKey != "function") {
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
	if ( typeof this.get != "function") {
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
	if ( typeof this.element != "function") {
		LC.Utils.Map.prototype.element = function(_index) {
			if (_index < 0 || _index >= this.elements.length) {
				return null;
			}
			return this.elements[_index];
		};
	};
	//判断MAP中是否含有指定KEY的元素
	if ( typeof this.containsKey != "function") {
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
	if ( typeof this.containsValue != "function") {
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
	if ( typeof this.containsObj != "function") {
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
	if ( typeof this.values != "function") {
		LC.Utils.Map.prototype.values = function() {
			var arr = new Array();
			for ( i = 0; i < this.elements.length; i++) {
				arr.push(this.elements[i].value);
			}
			return arr;
		};
	};
	//获取MAP中所有VALUE的数组（ARRAY）
	if ( typeof this.valuesByKey != "function") {
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
	if ( typeof this.keys != "function") {
		LC.Utils.Map.prototype.keys = function() {
			var arr = new Array();
			for ( i = 0; i < this.elements.length; i++) {
				arr.push(this.elements[i].key);
			}
			return arr;
		};
	};
	//获取key通过value
	if ( typeof this.keysByValue != "function") {
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
	if ( typeof this.keysRemoveDuplicate != "function") {
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
					if ( typeof args[0][i] == "string" || typeof args[0][i] == "number") {//类型校验通过则进行正整数校验
						if (!new RegExp(/^[1-9]\d*$/).test(args[0][i]))
							LC.warning(msg + "参数错误,必须是正整数。");
					} else {
						LC.warning(msg + "参数错误,必须是正整数。");
					};
				};
				param = args[0];
				//是数组则直接复制
			} else {//不是数组
				if ( typeof args[0] == "string" || typeof args[0] == "number") {//类型校验通过则进行正整数校验
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
				if ( typeof args[i] == "string" || typeof args[i] == "number") {//类型校验通过则进行正整数校验
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
					if ( typeof args[0][i] == "string" || typeof args[0][i] == "number") {//类型校验通过则进行正整数校验
						if (!new RegExp(/^[0-9]+(\.\d)?[0-9]*$/).test(args[0][i]))
							LC.warning(msg + "参数错误,必须是正浮点数。");
					} else {
						LC.warning(msg + "参数错误,必须是正浮点数。");
					};
				};
				param = args[0];
				//是数组则直接复制
			} else {//不是数组
				if ( typeof args[0] == "string" || typeof args[0] == "number") {//类型校验通过则进行正整数校验
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
				if ( typeof args[i] == "string" || typeof args[i] == "number") {//类型校验通过则进行正整数校验
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
	 * @return num
	 */
	checkNumInt : function(num, msg) {
		if (null != num) {
			if ( typeof num == "string" || typeof num == "number") {//类型校验通过则进行正整数校验
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
	},
	/**
	 * 添加拖拽事件(只能传入jQuery对象)
	 * obj 拖拽触发dom对象
	 * moveobj 拖拽移动dom对象
	 * parentObj 拖拽限制移动范围元素dom对象
	 * dropObj 拖拽进入的元素dom对象
	 * isReset 是否在拖拽完成后还原位置
	 */
	drag : function(obj,moveobj,parentObj,dropObj,isReset) {
		if (obj.dom) {//适配，如果传入的不是dom，则转为dom
			obj = obj.dom;
		}
		if (null == moveobj) {//适配，如果未传入moveobj，则默认是obj自身
			moveobj = obj;
		} else if (moveobj.dom) {//适配，如果传入的不是dom，则转为dom
			moveobj = moveobj.dom;
		}
		if (null == parentObj) {//适配，如果未传入parentObj，则默认是moveobj的父元素
			parentObj = moveobj.parent();
		} else if (parentObj.dom) {//适配，如果传入的不是dom，则转为dom
			parentObj = parentObj.dom;
		}
		if (null == dropObj) {//适配，如果未传入dropObj，----则默认是moveobj的父元素
		} else if (dropObj.dom) {//适配，如果传入的不是dom，则转为dom
			dropObj = dropObj.dom;
		}
		obj.bind("mousedown", mousedown1);
		var gapX,gapY,maxX,minX,maxY,minY,initLeft,initTop;
		function mousedown1(event) {
			if (0 == event.button) {//左键点击
				initLeft = parseInt(moveobj.css("left"));
				initTop = parseInt(moveobj.css("top"));
				LC.Components.ComponentFunction.zIndexToTop(moveobj);//置顶
				gapX = parseInt(moveobj.css("left"))-event.clientX;
				gapY = parseInt(moveobj.css("top"))-event.clientY;
				maxX = (parentObj.width()-moveobj.width())-(moveobj.offset().left-parentObj.offset().left)+parseInt(moveobj.css("left"))-parseInt(moveobj.css("margin-right"))+parseInt(parentObj.css("padding-right"));
				minX = parseInt(moveobj.css("left"))+parentObj.offset().left-moveobj.offset().left+parseInt(moveobj.css("margin-left"))+parseInt(parentObj.css("padding-left"));
				maxY = (parentObj.height()-moveobj.height())-(moveobj.offset().top-parentObj.offset().top)+parseInt(moveobj.css("top"))-parseInt(moveobj.css("margin-bottom"))+parseInt(parentObj.css("padding-bottom"));
				minY = parseInt(moveobj.css("top"))+parentObj.offset().top-moveobj.offset().top+parseInt(moveobj.css("margin-top"))+parseInt(parentObj.css("padding-top"));
				//移除其他过度效果
				moveobj.css({
					"transition" : "0s",
				});
				//适应项目场景修正，其他情况可以去除
				maxX = maxX-8;
				//==============
				$(document).bind("mousemove", move);
				$(document).bind("mouseup", mouseup1);
			}
		};
		var left,top;
		function move(event) {
			left = event.clientX+gapX;
			if (left > maxX) {//限制不会移出右边
				left = maxX;
			} else if (left < minX) {//限制不会移出左边
				left = minX;
			}
			top = event.clientY+gapY;
			if (top > maxY) {//限制不会移出下边
				top = maxY;
			} else if (top < minY) {//限制不会移出上边
				top = minY;
			}
			//=====================
			moveobj.css({
				"left" : left + "px",
				"top" : top + "px"
			});
		};
		function mouseup1(event) {
			//1.保存鼠标位置
			mouseupX = event.clientX;
			mouseupY = event.clientY;
			if(dropObj){//如果有传参，则为拖放，否则为拖拽
				//2.还原元素原始位置
				moveobj.css({
						"left" : initLeft + "px",
						"top" : initTop + "px"
					});
				//3.获取鼠标位置dom
				var dropTarget = $(document.elementFromPoint(mouseupX, mouseupY));
				//模拟冒泡，当前元素不满足拖放条件，则继续寻找其父元素,直到兜底桌面
				while(!(dropTarget[0] === dropObj[0])&&!(dropTarget[0]==LC.CommonProperty.MAIN_DESK[0])){
					dropTarget = dropTarget.parent();
				};
				//4.判断是否满足拖放条件
				if(dropTarget[0] === dropObj[0]){
					console.log("满足");
					//4.1满足
					//获取dropTarget父dom，并将dropTarget删除，将moveobj写入该父dom
					dropTarget.parent().empty().append(moveobj);
					//---.还原过度效果
					moveobj.css({
						"transition" : "",
					});
				} else {
					console.log("不满足");
					//4.2不满足,重新移动元素到当前位置
					moveobj.css({
						"left" : left + "px",
						"top" : top + "px"
					});
					setTimeout(
						function (){
							//还原过度效果
							moveobj.css({
								"transition" : "",
							});
							//还原位置
							if (isReset) {
								moveobj.css({
									"left" : initLeft + "px",
									"top" : initTop + "px"
								});
							};
						}(),1000
					);
				};
				//dropObj.unbind("dropin");
			}
			//还原过度效果
			moveobj.css({
				"transition" : "",
			});
			//解绑事件
			$(document).unbind("mousemove", move);
			$(document).unbind("mouseup", mouseup1);
		};
	},
	zIndex:[],
	/**
	 * 置顶显示方法(只能传入jQuery对象) 
	 */
	zIndexToTop : function(obj){
		//堆栈最大长度，最多保存N个对象
		var zIndexMaxSize=50;
		//堆栈中z-index初始值（最小值）
		var zIndexMinValue=101;
		//堆栈中z-index最大值，避免无限增大，重置运行次数为初始值（最小值）+N
		var zIndexMaxValue=zIndexMinValue+zIndexMaxSize+100;
		if (obj.dom) {//适配，如果传入的不是dom，则转为dom
			obj = obj.dom;
		}
		//获取父一级dom
		parentObj = obj.parent();
		//判断是否已经到桌面
		if (parentObj[0]==LC.CommonProperty.MAIN_DESK[0]){
			return;//父元素为桌面，则表示本次对象为场景对象，不再执行，返回
		}
		//递归，获取父元素dom依次置顶
		LC.Components.ComponentFunction.zIndexToTop(parentObj);
		//获取全局变量中z-index[]数组长度
		var zSize = LC.Components.ComponentFunction.zIndex.length;
		//判断z-index是否有对象
		if (LC.Components.ComponentFunction.zIndex.length>0){
			//有，判断是否有相同对象
			for (var i=0; i < LC.Components.ComponentFunction.zIndex.length; i++) {
			//有相同对象则移除相同对象
			  if(LC.Components.ComponentFunction.zIndex[i]===obj){
			  	LC.Components.ComponentFunction.zIndex.splice(i,1)[0].css({"z-index":""});
			  	i--;
			  } 
			};
			if (LC.Components.ComponentFunction.zIndex.length==0){//经过移除重复元素后数组为空
				LC.Components.ComponentFunction.zIndex.push(obj.css({"z-index":zIndexMinValue}));
				return;
			};
			//判断是否达到数组长度上限
			if(LC.Components.ComponentFunction.zIndex.length>=zIndexMaxSize){
				//--达到上限则去除最开始的一个
				LC.Components.ComponentFunction.zIndex.shift().css({"z-index":""});
			}
			//--然后取数组中z-index最大值
			var maxIndex=0;
			var index=1;
			for (var i=0; i < LC.Components.ComponentFunction.zIndex.length; i++) {
				index = parseInt(LC.Components.ComponentFunction.zIndex[i].css("z-index"));
				if (maxIndex<index) {
					maxIndex=index;
				};
			};
			//--判断最大值是否达到z-index上限值
			if (maxIndex>=zIndexMaxValue){
				//----达到上限则遍历数组，将数组对象中z-index值降低
				for (var i=0; i < LC.Components.ComponentFunction.zIndex.length; i++) {
					index = LC.Components.ComponentFunction.zIndex[i].css("z-index");
					LC.Components.ComponentFunction.zIndex[i].css({"z-index":index-(zIndexMaxValue-zIndexMinValue-zIndexMaxSize)});
				};
				//重设当前最大值=zIndex初始值+保存对象个数N
				maxIndex=zIndexMinValue+zIndexMaxSize;
			};
			//新对象z-index+1装入数组
			LC.Components.ComponentFunction.zIndex.push(obj.css({"z-index":(maxIndex+1)}));
		} else {//没有，装入，并设置初始值
			LC.Components.ComponentFunction.zIndex.push(obj.css({"z-index":zIndexMinValue}));
		}
	}
};
