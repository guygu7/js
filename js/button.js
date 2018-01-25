
/**
 * 组件空间中加入按钮类
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
			this.dom.append($("<div></div>").css({
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
	if ( typeof this.creatDOM != "function") {
		/**
		 * 创建的DOM对像
		 * @return DOM
		 */
		LC.Components.Button.prototype.creatDOM = function() {
			var sign = LC.CommonProperty.SIGN;
			var button = $("<button></button>").attr({
				sign : _signID,
			});
			this.dom = this.styleAlter(button);
			return this.dom;
		};
	};
};
/**
 * 组件空间中加入按钮工厂
 */
LC.Components.ButtonFactory = {
	/**
	 * 按钮，创建并返回一个按钮html对象button，调用.append()加入页面中显示
	 * @param {Object} buttonID 菜单id
	 */
	createButtonStart : function(buttonID) {
		var returnButton = new LC.Components.Button();
		returnButton.setSignID(buttonID).creatDOM().attr({
			"class" :"botton-start"
		}).css({//测试用
			"width":"150px",
			"height":"35px"
		});
		return returnButton;
	},
	/**
	 * 右上角关闭按钮，创建并返回一个关闭按钮html对象button，调用.append()加入页面中显示
	 * @param {Object} buttonID 菜单id
	 */
	createButtonClose : function(buttonID,parten) {
		if (null==parten)parten=1;
		var returnButton = new LC.Components.Button();
		returnButton.setSignID(buttonID).creatDOM().attr({
			"class" :"botton-colse"
		})[0].addEventListener("click",function(){
			parten.hide();
		},false);
		return returnButton;
	}
	
};