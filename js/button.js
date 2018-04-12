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
	createButton : function(){
		var button = new LC.Components.Button();
		//定义监听响应方法集合
		LC.Components.ComponentFunction.responseMethod(button);
		return button;
	},
	/**
	 * 菜单的按钮，创建并返回一个按钮html对象button，调用.append()加入页面中显示
	 * @param {Object} _id 菜单id
	 */
	createButtonDropdown : function(_id) {
		var button = LC.Components.ButtonFactory.createButton();
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
		var button = LC.Components.ButtonFactory.createButton();
		button.setSignID(_id).creatDOM("div", LC.CommonProperty.CSS_BUTTON_CLOSE)[0].addEventListener("click",function(){
			parten.hide();
		},false);
		return button;
	},
	/**
	 * 移动按钮（东南西北）
 	 * @param {Object} id
	 */
	createButtonMove:function(pram) {
		var moveBotton = LC.Components.ButtonFactory.createButton();//整体容器
		var botton = LC.Components.ButtonFactory.createButton();//按钮图像容器(装入箭头/遮挡块)
		var arrow = LC.Components.ButtonFactory.createButton();//箭头
		var block = LC.Components.ButtonFactory.createButton();//遮挡块
		var text = LC.Components.ButtonFactory.createButton();//文字
		switch(pram){
			case "top":
				botton.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_INSIDE);
				text.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_TOPTEXT);
				break;
			case "bottom":
				botton.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_INSIDE+LC.CommonProperty.CSS_DIRECTION_DOWNWARD);
				text.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_BOTTOMTEXT);
				break;
			default:
			moveBotton.creatDOM("div");
			text.creatDOM("div");
		}
		moveBotton.creatDOM("div",LC.CommonProperty.CSS_BOTTON_MOVE);
		arrow.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_ARROW);
		block.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_BLOCK);
		moveBotton.dom.append(botton.dom.append(arrow.dom).append(block.dom)).append(text.dom);
		moveBotton.setText = function(pram){
			text.dom.text(pram);
		};
		return moveBotton;
	},
};