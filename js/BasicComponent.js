/**
 * 基本组件类（所有组件类父类）
 */
LC.Components.BasicComponent = function(basicComponentID) {
	var _signID = basicComponentID;
	//自定义ID
	if ( typeof this.getSignID != "function") {
		/**
		 * 获取自定义id</br>
		 * @return _signID
		 */
		LC.Components.BasicComponent.prototype.getSignID = function() {
			return _signID;
		};
	};
	if ( typeof this.setSignID != "function") {
		/**
		 * 设置自定义id</br>
		 * @param {String} id
		 */
		LC.Components.BasicComponent.prototype.setSignID = function(id) {
			_signID = id;
			return this;
		};
	};
	if ( typeof this.addCssClass != "function") {
		/**
		 * 添加指定CSS样式</br>
		 * 参数：</br>
		 * String cssClass css样式</br>
		 * @param {String} cssClass
		 */
		LC.Components.BasicComponent.prototype.addCssClass = function(cssClass) {
			var className = this.dom.attr("class");
			if (null == cssClass || "" == cssClass.trim()) {//未传参数，则返回
				return this;
			};
			if (-1 == className.search(cssClass)) {//判断没有该样式才添加
				this.dom.attr({
					"class" : className + cssClass
				});
			};
			return this;
		};
	};
	if ( typeof this.removeCssClass != "function") {
		/**
		 * 去掉指定CSS样式
		 * 参数：</br>
		 * String cssClass css样式</br>
		 * @param {String} cssClass
		 */
		LC.Components.BasicComponent.prototype.removeCssClass = function(cssClass) {
			var className = this.dom.attr("class");
			if (null == cssClass || "" == cssClass.trim()) {//未传参数，则返回
				return this;
			};
			className = className.replace(cssClass.trim(), "");
			this.dom.attr({
				"class" : className
			});
			return this;
		};
	};
	if ( typeof this.hide != "function") {
		/**
		 * 隐藏</br>
		 * 参数："shrink"|"expand" (非必须)隐藏特效样式</br>
		 * @param {String} hideType
		 */
		LC.Components.BasicComponent.prototype.hide = function(hideType) {
			var className = this.dom.attr("class");
			if (null == cssClass || "" == cssClass.trim()) {//未传参数，则为默认隐藏样式
				hideType = LC.CommonProperty.CSS_HIDE_SHRINK;
			};
			if ("shrink" == hideType.trim()) {
				hideType = LC.CommonProperty.CSS_HIDE_SHRINK;
			} else if ("expand"==hideType.trim()) {
				hideType = LC.CommonProperty.CSS_HIDE_EXPAND;
			}
			//去掉所有隐藏样式
			var hideClass = LC.CommonProperty.CSS_HIDE_EXPAND.trim();
			var hideClass2 = LC.CommonProperty.CSS_HIDE_SHRINK.trim();
			className = className.replace(hideClass, "").replace(hideClass, "");
			//重新添加隐藏样式
			this.dom.attr({
				"class" : className + hideType
			});
			return this;
		};
	};
	if ( typeof this.show != "function") {
		/**
		 * 显示，自动去掉所有隐藏样式
		 */
		LC.Components.BasicComponent.prototype.show = function() {
			var className = this.dom.attr("class");
			//去掉所有隐藏样式
			var hideClass = LC.CommonProperty.CSS_HIDE_EXPAND.trim();
			var hideClass2 = LC.CommonProperty.CSS_HIDE_SHRINK.trim();
			className = className.replace(hideClass, "").replace(hideClass, "");
			this.dom.attr({
				"class" : className
			});
			return this;
		};
	};
	//==========
	if ( typeof this.addPosition != "function") {
		/**
		 * 添加定位</br>
		 * 参数："lowerright"|"upperright"|"lowerleft"|"upperleft"|"relative"</br>
		 * @param {String} positionType
		 */
		LC.Components.BasicComponent.prototype.addPosition = function(positionType) {
			var className = this.dom.attr("class");
			if (null == positionType || "" == positionType.trim()) {//未传参数，则返回
				return this;
			};
			positionType = positionType.trim();
			if ("lowerright"==positionType) {//右下
				positionType = LC.CommonProperty.CSS_POSITION_LOWERRIGHT;
			} else if ("upperright"==positionType) {//右上
				positionType = LC.CommonProperty.CSS_POSITION_UPPERRIGHT;
			} else if ("lowerleft"==positionType) {//左下
				positionType = LC.CommonProperty.CSS_POSITION_LOWERLEFT;
			} else if ("upperleft"==positionType) {//左上
				positionType = LC.CommonProperty.CSS_POSITION_UPPERLEFT;
			} 
			//去掉所有定位样式
			var positionClass = LC.CommonProperty.CSS_POSITION_LOWERRIGHT.trim();
			var positionClass2 = LC.CommonProperty.CSS_POSITION_UPPERRIGHT.trim();
			var positionClass3 = LC.CommonProperty.CSS_POSITION_LOWERLEFT.trim();
			var positionClass4 = LC.CommonProperty.CSS_POSITION_UPPERLEFT.trim();
			className = className.replace(positionClass, "").replace(positionClass2, "").replace(positionClass3, "").replace(positionClass4, "");
			this.dom.attr({
				"class" : className + positionType
			});
			return this;
		};
	};
	if ( typeof this.removePosition != "function") {
		/**
		 * 去掉定位
		 * 参数：</br>
		 */
		LC.Components.BasicComponent.prototype.removePosition = function() {
			var className = this.dom.attr("class");
			//去掉所有定位样式
			var positionClass = LC.CommonProperty.CSS_POSITION_LOWERRIGHT.trim();
			var positionClass2 = LC.CommonProperty.CSS_POSITION_UPPERRIGHT.trim();
			var positionClass3 = LC.CommonProperty.CSS_POSITION_LOWERLEFT.trim();
			var positionClass4 = LC.CommonProperty.CSS_POSITION_UPPERLEFT.trim();
			className = className.replace(positionClass, "").replace(positionClass2, "").replace(positionClass3, "").replace(positionClass4, "");;
			this.dom.attr({
				"class" : className
			});
			return this;
		};
	};
	if ( typeof this.addPosition != "function") {
		/**
		 * 添加定位模式（绝对|相对）</br>
		 * 参数："relative"|"absolute"</br>
		 * @param {String} positionType
		 */
		LC.Components.BasicComponent.prototype.addPositionMode = function(positionType) {
			var className = this.dom.attr("class");
			if (null == positionType || "" == positionType.trim()) {//未传参数，则返回
				return this;
			};
			positionType = positionType.trim();
			if ("relative"==positionType) {//相对
				positionType = LC.CommonProperty.CSS_POSITION_RELATIVE;
			} else if ("absolute"==positionType) {//绝对
				positionType = LC.CommonProperty.CSS_POSITION_ABSOLUTE;
			} 
			//去掉所有定位样式
			var positionClass = LC.CommonProperty.CSS_POSITION_RELATIVE.trim();
			var positionClass2 = LC.CommonProperty.CSS_POSITION_ABSOLUTE.trim();
			className = className.replace(positionClass, "").replace(positionClass2, "");
			this.dom.attr({
				"class" : className + positionType
			});
			return this;
		};
	};
	if ( typeof this.removePosition != "function") {
		/**
		 * 去掉定位模式（绝对|相对）
		 * 参数：</br>
		 */
		LC.Components.BasicComponent.prototype.removePositionMode = function() {
			var className = this.dom.attr("class");
			//去掉所有定位样式
			var positionClass = LC.CommonProperty.CSS_POSITION_RELATIVE.trim();
			var positionClass2 = LC.CommonProperty.CSS_POSITION_ABSOLUTE.trim();
			className = className.replace(positionClass, "").replace(positionClass2, "").replace(positionClass3, "").replace(positionClass4, "");;
			this.dom.attr({
				"class" : className
			});
			return this;
		};
	};
	/*
	 * 自动重写宽高(未实现)
	 LC.Components.BasicComponent.prototype.autoSize=function(){
	 var childs = this.dom.children();
	 var width=0;
	 var height=0;
	 for (var i=0; i < childs.length; i++) {
	 width = width + Number(childs[i].css("width").replace("px",""));
	 childs[i].css("margin-top");
	 childs[i].css("margin-bottom");
	 childs[i].css("height");
	 childs[i].css("margin-left");
	 childs[i].css("margin-right");
	 };
	 };
	 */
	if ( typeof this.styleAlter != "function") {
		/**
		 * 样式修改(子类继承扩展)
		 * @param {Object} basicComponent 组件对象
		 * @param {Function} fn 修改函数
		 */
		LC.Components.BasicComponent.prototype.styleAlter = function(basicComponent, fn) {
			if ( typeof fn == "function") {
				fn(basicComponent);
			}
			return basicComponent;
		};
	};
	/**
	 * 获取的DOM对像，通过.append()加入页面
	 * dom中包含一个self属性
	 * 可以通过dom.self获取到原对象
	 */
	dom = null;
	if ( typeof this.creatDOM != "function") {
		/**
		 * 创建DOM对像</br>
		 * 参数：</br>
		 * String htmlLabel (非必须)html标签类别，默认为div</br>
		 * String cssClass (非必须)css样式，默认为空""</br>
		 * @param {String} htmlLabel
		 * @param {String} cssClass
		 * @return basicComponentDOM
		 */
		LC.Components.BasicComponent.prototype.creatDOM = function(htmlLabel, cssClass) {
			var sign = LC.CommonProperty.SIGN;
			if (null == htmlLabel || "" == htmlLabel.trim()) {//未传参数，则默认为div标签
				htmlLabel = "div";
			};
			if (null == cssClass || "" == cssClass.trim()) {//未传参数，则默认没有样式，为空
				cssClass = "";
			};
			var basicComponent = $("<" + htmlLabel + "></" + htmlLabel + ">").attr({
				sign : _signID,
				"class" : cssClass
			});
			this.dom = this.styleAlter(basicComponent);
			this.dom.self = this;
			return this.dom;
		};
	};
}; 