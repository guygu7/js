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
	createButton : function() {
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
			"width" : "50px",
			"height" : "35px"
		});
		return button;
	},
	/**
	 * 右上角关闭按钮，创建并返回一个关闭按钮html对象button，调用.append()加入页面中显示
	 * @param {Object} _id 菜单id
	 */
	createButtonClose : function(_id, parten) {
		if (null == parten)
			parten = 1;
		var button = LC.Components.ButtonFactory.createButton();
		button.setSignID(_id).creatDOM("div", LC.CommonProperty.CSS_BUTTON_CLOSE)[0].addEventListener("click", function() {
			parten.hide();
		}, false);
		return button;
	},
	/**
	 * 移动按钮（东南西北）
	 * @param {Object} id
	 */
	createButtonMove : function(pram) {
		var moveBotton = LC.Components.ButtonFactory.createButton();
		//整体容器
		var botton = LC.Components.ButtonFactory.createButton();
		//按钮图像容器(装入箭头/遮挡块)
		var arrow = LC.Components.ButtonFactory.createButton();
		//箭头
		var block = LC.Components.ButtonFactory.createButton();
		//遮挡块
		var text = LC.Components.ButtonFactory.createButton();
		//文字
		switch(pram) {
		case "top":
			botton.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_INSIDE);
			text.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_TOPTEXT);
			moveBotton.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_NORTH);
			break;
		case "bottom":
			botton.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_INSIDE + LC.CommonProperty.CSS_DIRECTION_DOWNWARD);
			text.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_BOTTOMTEXT);
			moveBotton.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_SOUTH);
			break;
		case "left":
			botton.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_INSIDE + LC.CommonProperty.CSS_DIRECTION_LEFTWARD);
			text.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_LEFTTEXT);
			moveBotton.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_WEST);
			break;
		case "right":
			botton.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_INSIDE + LC.CommonProperty.CSS_DIRECTION_RIGHTWARD);
			text.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_RIGHTTEXT);
			moveBotton.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_EAST);
			break;
		default:
			moveBotton.creatDOM("div");
			text.creatDOM("div");
		}
		arrow.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_ARROW);
		block.creatDOM("div", LC.CommonProperty.CSS_BOTTON_MOVE_BLOCK);
		moveBotton.dom.append(botton.dom.append(arrow.dom).append(block.dom)).append(text.dom);
		moveBotton.setText = function(pram) {
			text.dom.text(pram);
		};
		return moveBotton;
	},
	/**
	 * 带环形菜单的按钮
	 */
	createButtonCircularMenu : function() {
		//整体容器
		var all = LC.Components.ButtonFactory.createButton();
		all.creatDOM("div", LC.CommonProperty.CSS_BOTTON_circularMenu);
		//整体容器样式
		//中间主要内容
		var mainButton = LC.Components.ButtonFactory.createButton();
		mainButton.creatDOM("div", LC.CommonProperty.CSS_BOTTON_circularMenu_middleContent);
		all.setText=function(text){
			mainButton.dom.text(text);
			return all;
		};
		//中心圆样式
		all.dom.append(mainButton.dom);
		//添加修改菜单元素的方法
		/**
		 * 必须传入Action类型，未传num则顺位添加，最多添加8个
		 * @param {Object} actObj
		 * @param {Object} roleObj
		 * @param {Object} num
		 */
		all.add_update_Element = function(actObj,roleObj,num) {
			//判断是否存在菜单
			if (0 == all.dom.children("."+LC.CommonProperty.CSS_BOTTON_circularMenu_menu.trim()).length) {
				//不存在，则创建菜单容器，并设为all的元素方便获取
				all.menu = LC.Components.ButtonFactory.createButton();
				all.menu.creatDOM("div", LC.CommonProperty.CSS_BOTTON_circularMenu_menu);
				all.dom.append(all.menu.dom);
				//菜单容器样式
			}
			//未传num序号，顺位添加
			if(!num){
				//判断菜单当前元素数量
				switch(all.menu.dom.children("."+LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement1.trim() + ",." + LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement2.trim() + ",." + LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement3.trim() + ",." + LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement4.trim() + ",." + LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement5.trim() + ",." + LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement6.trim() + ",." + LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement7.trim() + ",." + LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement8.trim()).length){
					case 0 :
						//加入菜单元素
						all.menuElement1 = LC.Components.ButtonFactory.createButton();
						all.menuElement1.creatDOM("div", LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement1);
						all.menu.dom.append(all.menuElement1.dom);
						//加入元素文本
						all.menuElement1.text = LC.Components.ButtonFactory.createButton();
						all.menuElement1.text.creatDOM("div", LC.CommonProperty.CSS_BOTTON_circularMenu_menuElementText1);
						all.menuElement1.dom.append(all.menuElement1.text.dom);
						all.menuElement1.setText=function(text){
							all.menuElement1.text.dom.text(text);
						};
						//执行一次
						all.menuElement1.setText(actObj.getName());
						//绑定事件（交互动作，点击效果）
						var actfn = actObj.getActFn();
						all.menuElement1.dom.bind("click", roleObj ,actfn);
						break;
					case 1:
						//加入菜单元素
						all.menuElement2 = LC.Components.ButtonFactory.createButton();
						all.menuElement2.creatDOM("div", LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement2);
						all.menu.dom.append(all.menuElement2.dom);
						//加入元素文本
						all.menuElement2.text = LC.Components.ButtonFactory.createButton();
						all.menuElement2.text.creatDOM("div", LC.CommonProperty.CSS_BOTTON_circularMenu_menuElementText2);
						all.menuElement2.dom.append(all.menuElement2.text.dom);
						all.menuElement2.setText=function(text){
							all.menuElement2.text.dom.text(text);
						};
						//执行一次
						all.menuElement2.setText(actObj.getName());
						//绑定事件（交互动作，点击效果）
						var actfn = actObj.getActFn();
						all.menuElement2.dom.bind("click", actfn);
						break;
					case 2 :
						//加入菜单元素
						all.menuElement3 = LC.Components.ButtonFactory.createButton();
						all.menuElement3.creatDOM("div", LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement3);
						all.menu.dom.append(all.menuElement3.dom);
						//加入元素文本
						all.menuElement3.text = LC.Components.ButtonFactory.createButton();
						all.menuElement3.text.creatDOM("div", LC.CommonProperty.CSS_BOTTON_circularMenu_menuElementText3);
						all.menuElement3.dom.append(all.menuElement3.text.dom);
						all.menuElement3.setText=function(text){
							all.menuElement3.text.dom.text(text);
						};
						//执行一次
						all.menuElement3.setText(actObj.getName());
						//绑定事件（交互动作，点击效果）
						var actfn = actObj.getActFn();
						all.menuElement3.dom.bind("click", actfn);
						break;
					case 3:
						//加入菜单元素
						all.menuElement4 = LC.Components.ButtonFactory.createButton();
						all.menuElement4.creatDOM("div", LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement4);
						all.menu.dom.append(all.menuElement4.dom);
						//加入元素文本
						all.menuElement4.text = LC.Components.ButtonFactory.createButton();
						all.menuElement4.text.creatDOM("div", LC.CommonProperty.CSS_BOTTON_circularMenu_menuElementText4);
						all.menuElement4.dom.append(all.menuElement4.text.dom);
						all.menuElement4.setText=function(text){
							all.menuElement4.text.dom.text(text);
						};
						//执行一次
						all.menuElement4.setText(actObj.getName());
						//绑定事件（交互动作，点击效果）
						var actfn = actObj.getActFn();
						all.menuElement4.dom.bind("click", actfn);
						break;
					case 4 :
						//加入菜单元素
						all.menuElement5 = LC.Components.ButtonFactory.createButton();
						all.menuElement5.creatDOM("div", LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement5);
						all.menu.dom.append(all.menuElement5.dom);
						//加入元素文本
						all.menuElement5.text = LC.Components.ButtonFactory.createButton();
						all.menuElement5.text.creatDOM("div", LC.CommonProperty.CSS_BOTTON_circularMenu_menuElementText5);
						all.menuElement5.dom.append(all.menuElement5.text.dom);
						all.menuElement5.setText=function(text){
							all.menuElement5.text.dom.text(text);
						};
						//执行一次
						all.menuElement5.setText(actObj.getName());
						//绑定事件（交互动作，点击效果）
						var actfn = actObj.getActFn();
						all.menuElement5.dom.bind("click", actfn);
						break;
					case 5:
						//加入菜单元素
						all.menuElement6 = LC.Components.ButtonFactory.createButton();
						all.menuElement6.creatDOM("div", LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement6);
						all.menu.dom.append(all.menuElement6.dom);
						//加入元素文本
						all.menuElement6.text = LC.Components.ButtonFactory.createButton();
						all.menuElement6.text.creatDOM("div", LC.CommonProperty.CSS_BOTTON_circularMenu_menuElementText6);
						all.menuElement6.dom.append(all.menuElement6.text.dom);
						all.menuElement6.setText=function(text){
							all.menuElement6.text.dom.text(text);
						};
						//执行一次
						all.menuElement6.setText(actObj.getName());
						//绑定事件（交互动作，点击效果）
						var actfn = actObj.getActFn();
						all.menuElement6.dom.bind("click", actfn);
						break;
					case 6 :
						break;
					case 7:
						break;
					default:
				}
			}else{//有num序号，做修改操作
				num = Number(num);
				switch(num){
					case 1:
						//移除对应节点元素
						all.menu.dom.remove(LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement1);
						//加入菜单元素
						all.menuElement1 = LC.Components.ButtonFactory.createButton();
						all.menuElement1.creatDOM("div", LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement1);
						all.menu.dom.append(menulist1.dom);
						//加入元素文本
						all.menuElement1.text = LC.Components.ButtonFactory.createButton();
						all.menuElement1.text.creatDOM("div", LC.CommonProperty.CSS_BOTTON_circularMenu_menuElementText);
						all.menuElement1.setText=function(){
							all.menuElement1.text.dom.text(text);
						};
						break;
					default:
				}
			}
		};
		//移除菜单元素的方法
		all.removeElement = function(num) {
			switch(num){
				case 1:
					//移除对应节点元素
					all.menu.dom.remove(LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement1);
					//移除对应属性
					all.menuElement1 = undefined;
					break;
				default:
			}
			//如果已移除全部元素，则移除环形菜单
			if(0==all.menu.dom.children(LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement1 + "," + LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement2 + "," + LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement3 + "," + LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement4 + "," + LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement5 + "," + LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement6 + "," + LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement7 + "," + LC.CommonProperty.CSS_BOTTON_circularMenu_menuElement8).length){
				all.dom.remove(LC.CommonProperty.CSS_BOTTON_circularMenu_menu);
				all.menu = undefined;
			}
		};
		return all;
	},
};
