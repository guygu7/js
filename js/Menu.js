
/**
 * 组件空间中加入开始菜单类
 */
LC.Components.Menu = function(menuID){
	var _signID = menuID;
	//自定义ID
	if ( typeof this.getSignID != "function") {
		/**
		 * 获取自定义ID
		 */
		LC.Components.Menu.prototype.getSignID = function() {
			return _signID;
		};
	};
	if ( typeof this.setSignID != "function") {
		/**
		 * 设置自定义ID
		 */
		LC.Components.Menu.prototype.setSignID = function(ID) {
			_signID = ID;
			return this;
		};
	};
	if ( typeof this.styleAlter != "function") {
		/**
		 * 样式修改(子类继承扩展)
		 * @param {Object} menu 菜单对象
		 * @param {Function} fn 修改函数
		 */
		LC.Components.Menu.prototype.styleAlter = function(menu, fn) {
			if ( typeof fn == "function") {
				fn(menu);
			}
			return menu;
		};
	};
	/**
	 * 获取的DOM对像，通过.append()加入页面
	 */
	dom=null;
	if ( typeof this.creatDOM != "function") {
		/**
		 * 创建的DOM对像
		 * @return menuDOM
		 */
		LC.Components.Menu.prototype.creatDOM = function() {
			var sign = LC.CommonProperty.SIGN;
			var menu = $("<div></div>").attr({
				sign : _signID,
				"class" : "menu-start"
			});
			this.dom = this.styleAlter(menu);
			return this.dom;
		};
	};
};
/**
 * 组件空间中加入菜单工厂
 */
LC.Components.MenuFactory = {
	/**
	 * 开始菜单，创建并返回一个开始菜单html对象scene，调用.append()加入页面中显示
	 * @param {Object} sceneID 菜单id
	 */
	createStartMenu : function(menuID) {
		var returnStartMenu = new LC.Components.Menu();
		returnStartMenu.setSignID(menuID).creatDOM();
		return returnStartMenu;
	}
};