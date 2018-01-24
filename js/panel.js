
/**
 * 组件空间中加入面板类
 */
LC.Components.Panel = function(panelID){
	var _signID = panelID;
	//自定义ID
	if ( typeof this.getSignID != "function") {
		/**
		 * 获取自定义ID
		 */
		LC.Components.Panel.prototype.getSignID = function() {
			return _signID;
		};
	};
	if ( typeof this.setSignID != "function") {
		/**
		 * 设置自定义ID
		 */
		LC.Components.Panel.prototype.setSignID = function(ID) {
			_signID = ID;
			return this;
		};
	};
	if ( typeof this.setText != "function") {
		LC.Components.Panel.prototype.setText = function(text){
			this.panelDOM.append($("<div></div>").css({
				"margin" : "auto"
			}).append(text));
			return this;
		};
	};
	if ( typeof this.styleAlter != "function") {
		/**
		 * 样式修改(子类继承扩展)
		 * @param {Object} panel 菜单对象
		 * @param {Function} fn 修改函数
		 */
		LC.Components.Panel.prototype.styleAlter = function(panel, fn) {
			if ( typeof fn == "function") {
				fn(panel);
			}
			return panel;
		};
	};
	/**
	 * 获取的DOM对像，通过.append()加入页面
	 */
	dom = null;
	if ( typeof this.creatPanelDOM != "function") {
		/**
		 * 创建的DOM对像
		 * @return panelDOM
		 */
		LC.Components.Panel.prototype.creatPanelDOM = function() {
			var sign = LC.CommonProperty.SIGN;
			var panel = $("<div></div>").attr({
				sign : _signID,
				"class" : "panel-outerlayer"
			});
			this.dom = this.styleAlter(panel);
			return this.dom;
		};
	};
};
/**
 * 组件空间中加入面板工厂
 */
LC.Components.PanelFactory = {
	/**
	 * 面板，创建并返回一个面板html对象scene，调用.append()加入页面中显示
	 * @param {Object} sceneID 菜单id
	 */
	createPanel : function(panelID) {
		var returnPanel = new LC.Components.Panel();
		returnPanel.setSignID(panelID).creatPanelDOM().css({
			"width":"200px",
			"height":"400px"
		});
		return returnPanel;
	}
};