
/**
 * 组件空间中加入面板类
 */
LC.Components.Button = function(buttonID){
	var _signID = buttonID;
	//自定义ID
	if ( typeof this.getSignID != "function") {
		/**
		 * 获取自定义ID
		 */
		LC.Components.Button.prototype.getSignID = function() {
			return _signID;
		};
	};
	if ( typeof this.setSignID != "function") {
		/**
		 * 设置自定义ID
		 */
		LC.Components.Button.prototype.setSignID = function(ID) {
			_signID = ID;
			return this;
		};
	};
	/*
	if ( typeof this.setText != "function") {
		LC.Components.Button.prototype.setText = function(text){
			this.buttonDOM.append($("<div></div>").css({
				"margin" : "auto"
			}).append(text));
			return this;
		};
	};
	*/
	if ( typeof this.styleAlter != "function") {
		/**
		 * 样式修改(子类继承扩展)
		 * @param {Object} button 菜单对象
		 * @param {Function} fn 修改函数
		 */
		LC.Components.Button.prototype.styleAlter = function(button, fn) {
			if ( typeof fn == "function") {
				fn(button);
			}
			return button;
		};
	};
	/**
	 * 获取的DOM对像，通过.append()加入页面
	 */
	dom = null;
	if ( typeof this.creatButtonDOM != "function") {
		/**
		 * 创建的DOM对像
		 * @return buttonDOM
		 */
		LC.Components.Button.prototype.creatButtonDOM = function() {
			var sign = LC.CommonProperty.SIGN;
			var button = $("<button></button>").attr({
				sign : _signID,
				"class" : "botton-start"
			});
			this.dom = this.styleAlter(button);
			return this.dom;
		};
	};
};
/**
 * 组件空间中加入面板工厂
 */
LC.Components.ButtonFactory = {
	/**
	 * 面板，创建并返回一个面板html对象scene，调用.append()加入页面中显示
	 * @param {Object} sceneID 菜单id
	 */
	createButton : function(buttonID) {
		var returnButton = new LC.Components.Button();
		returnButton.setSignID(buttonID).creatButtonDOM().attr({
			"class" :"botton-start"
		}).css({
			"width":"150px",
			"height":"35px"
		});
		return returnButton;
	}
};