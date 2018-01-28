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
	 * 按钮，创建并返回一个按钮html对象button，调用.append()加入页面中显示
	 * @param {Object} buttonID 菜单id
	 */
	createButtonStart : function(buttonID) {
		var button = new LC.Components.Button();
		button.setSignID(buttonID).creatDOM("div", "botton-start").css({//测试用
			"width":"150px",
			"height":"35px"
		});
		return button;
	},
	/**
	 * 右上角关闭按钮，创建并返回一个关闭按钮html对象button，调用.append()加入页面中显示
	 * @param {Object} buttonID 菜单id
	 */
	createButtonClose : function(buttonID,parten) {
		if (null==parten)parten=1;
		var button = new LC.Components.Button();
		button.setSignID(buttonID).creatDOM("div", "botton-colse")[0].addEventListener("click",function(){
			parten.hide();
		},false);
		return button;
	}
};