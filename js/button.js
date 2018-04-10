/**
 * 组件空间中加入按钮类
 */
LC.Components.Button = function() {
};
LC.Utils.extend(LC.Components.Button, LC.Components.BasicComponent);
LC.Components.Button.prototype.setText = function(text) {
	this.dom.append($("<div></div>").css({
		"margin" : "auto"
	}).append(text));
	return this;
};
/**
 * 组件空间中加入按钮工厂
 */
LC.Components.ButtonFactory = {
	/**
	 * 菜单的按钮，创建并返回一个按钮html对象button，调用.append()加入页面中显示
	 * @param {Object} _id 菜单id
	 */
	createButtonDropdown : function(_id) {
		var button = new LC.Components.Button();
		button.setSignID(_id).creatDOM("div", LC.CommonProperty.CSS_BUTTON_DROPDOWN).css({
			"width":"50px",
			"height":"35px"
		});
		return button;
	},
	/**
	 * 右上角关闭按钮，创建并返回一个关闭按钮html对象button，调用.append()加入页面中显示
	 * @param {Object} _id 菜单id
	 */
	createButtonClose : function(_id,parten) {
		if (null==parten)parten=1;
		var button = new LC.Components.Button();
		button.setSignID(_id).creatDOM("div", LC.CommonProperty.CSS_BUTTON_CLOSE)[0].addEventListener("click",function(){
			parten.hide();
		},false);
		return button;
	},
	/**
	 * 向北移动按钮
 	 * @param {Object} id
	 */
	createButtonMoveNorth:function(id) {
		var moveNorth = LC.Components.PanelFactory.createPanel();
		var moveNorth1 = LC.Components.PanelFactory.createPanel();
		var moveNorth2 = LC.Components.PanelFactory.createPanel();
		moveNorth.setSignID(id).creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVENORTH);
		moveNorth1.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVENORTH_ARROW);
		moveNorth2.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVENORTH_TEXT);
		moveNorth.dom.append(moveNorth1.dom).append(moveNorth2.dom);
		moveNorth.setText=function(pram){
			moveNorth2.dom.text(pram);
		};
		return moveNorth;
	}
};