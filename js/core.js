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
	COLOR_PROGRESS_RED : "repeating-linear-gradient(#5A230F 1%,#FAAA87 20%,#E6815A 40%,#9E4635 97%,#5B3123 100%)",
	//进度条过渡色：橙色
	COLOR_PROGRESS_ORIGIN : "repeating-linear-gradient(#D78728 1%,#F5C84B 20%,#EE8C20 40%,#D67B1B 97%,#532710 100%)",
	COLOR_PROGRESS_ORIGIN2 : "repeating-linear-gradient(#D78728 1%,#F5C84B 20%,#EE8C20 40%,#B05718 97%,#532710 100%)",
	//进度条过渡色：蓝色
	COLOR_PROGRESS_BLUE : "repeating-linear-gradient(#5A230F 1%,#67DAEC 20%,#0584BB 40%,#048ABD 97%,#5B3123 100%)",
	//进度条过渡色：石板灰
	COLOR_PROGRESS_GREY : "repeating-linear-gradient(#5A230F 1%,#778899 20%,#708090 40%,#2F4F4F 97%,#5B3123 100%)",
	//进度条过渡色：绿
	COLOR_PROGRESS_GREEN : "repeating-linear-gradient(#5A230F 1%,#3DFF1E 15%,#5DD810 50%,#157600 97%,#5B3123 100%)",
	/*---CSS class---*/
	/**
	 * CSS class:hide-expand 隐藏特效（扩张消失）
	 */
	CSS_HIDE_EXPAND : " hide-expand ",
	/**
	 * CSS class:hide-shrink 隐藏特效（缩小消失）
	 */
	CSS_HIDE_SHRINK : " hide-shrink "
	
	
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
				//给拖拽目标绑定dropin事件,表示拖拽的对象被拖入了目标,并返回标的对象
				if(dropObj){//如果有传参，则为拖放，否则为拖拽
					dropObj.bind("dropin",function (){
						console.log(dropObj);
						console.log(this);
						console.log(this.dropObj);
						return this.dropObj;
					});
				}
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
				var dropTarget = $(document.elementFromPoint(mouseupX, mouseupY)).trigger("dropin");
				//4.判断是否满足拖放条件
				if(dropTarget[0] === dropObj[0]){
					console.log("满足");
					//4.1满足
					//执行拖放操作...未完成...
					console.log(dropTarget);
					//获取dropTarget父dom，并将dropTarget删除
					dropTarget.parent().empty().append(moveobj);
					//将moveobj写入该父dom
					
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
				dropObj.unbind("dropin");
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
