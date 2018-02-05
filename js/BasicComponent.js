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
	if ( typeof this.hide != "function") {
		/**
		 * 隐藏</br>
		 * 参数：</br>
		 * String cssClass (非必须)隐藏特效样式</br>
		 * @param {String} cssClass
		 */
		LC.Components.BasicComponent.prototype.hide = function(cssClass) {
			var className = this.dom.attr("class");
			if(null==cssClass||""==cssClass.trim()){//未传参数，则为默认隐藏样式
				cssClass=LC.CommonProperty.CSS_HIDE_SHRINK;
			};
			if (-1 == className.search(cssClass)) {
				this.dom.attr({
					"class" : className + cssClass
				});
			};
			return this;
		};
	};
	if ( typeof this.show != "function") {
		/**
		 * 显示，自动去掉所有隐藏样式
		 */
		LC.Components.BasicComponent.prototype.show = function() {
			var className = this.dom.attr("class");
			hideClass=LC.CommonProperty.CSS_HIDE_EXPAND.trim();
			//去掉所有隐藏样式
			className = className.replace(hideClass, "").replace(hideClass, "");
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
	dom=null;
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
		LC.Components.BasicComponent.prototype.creatDOM = function(htmlLabel,cssClass) {
			var sign = LC.CommonProperty.SIGN;
			if(null==htmlLabel||""==htmlLabel.trim()){//未传参数，则默认为div标签
				htmlLabel="div";
			};
			if(null==cssClass||""==cssClass.trim()){//未传参数，则默认没有样式，为空
				cssClass="";
			};
			var basicComponent = $("<"+htmlLabel+"></"+htmlLabel+">").attr({
				sign : _signID,
				"class" : cssClass
			});
			this.dom = this.styleAlter(basicComponent);
			this.dom.self = this;
			return this.dom;
		};
	};
};