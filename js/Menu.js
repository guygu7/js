/**
 * 组件空间中加入开始菜单类
 */
LC.Components.Menu = function() {
};
LC.Utils.extend(LC.Components.CornerSign, LC.Components.BasicComponent);
LC.Components.CornerSign.prototype.setText = function(text) {
	this.dom.append($("<div></div>").css({
		"margin" : "auto"
	}).append(text));
	return this;
};
/**
 * 组件空间中加入菜单工厂
 */
LC.Components.CornerSignFactory = {
	/**
	 * 菜单，创建并返回一个关闭按钮html对象Menu，调用.append()加入页面中显示
	 * @param {Object} id 菜单id
	 */
	createCornerSign : function(_id) {
		var cornerSign = new LC.Components.CornerSign();
		cornerSign.setSignID(_id).creatDOM("div", " cornersign upperright ");
		return cornerSign;
	}
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