/*
* angularjs数据绑定示例（指对象绑定，非基本数据绑定）
* ps：	1.任何绑定，绑定之后都不可在变更基本绑定对象，包括重新定义和数据覆盖，只能变更对象属性，否则将无法自动刷新数据
* 		2.属性可以任意变更
*/
/*
绑定可以接受对象类型和数组类型
定义
var viewDataModel={"viewDataModelname":"viewDataModelnamedata"};
或
var viewDataModel={viewDataModelname:"viewDataModelnamedata"};
绑定
$rootScope.viewDataModel = viewDataModel;
展示
{{viewDataModel.viewDataModelname}}

定义
var viewDataModel=["viewDataModelnamedata"];
绑定
$rootScope.viewDataModel = viewDataModel;
展示
{{viewDataModel[0]}}
*/

/**
 * 视图数据显示对象 
 */
var viewDataModel = {
	/**
	 * 交流信息面板文本
	 */
	panelText:function(){return "";},
	/**
	 * XX面板文本 
	 */
	panel2Text:function(){return "中文";},
	/**
	 * XX面板 
	 */
	panel3:{
		/**
		 * 标题文本 
		 */
		tittleText:function(){return "标题";},
		text1:0,
	},
	/**
	 * 物品信息面板
	 */
	panel3ItemInfo:{
		name:"",
		content:"",
	},
	/**
	 * 对比角色（装备）物品信息面板
	 */
	panel3RoleItemInfo:{
		name:"",
		content:"",
	},
	/**
	 * 人物交互面板(按钮组)
	 */
	panel4:{
		/**
		 * 按钮元素集合
		 */
		buttonElements: function(){return {};},
	},
	/**
	 * 列表菜单（自动大小_带箭头）
	 */
	menu:{
		/**
		 * 菜单标题文本 
		 */
		tittleText:function(){return "菜单标题";},
		/**
		 * 按钮元素集合（文本）
		 */
		buttonElements:function(){return {};},
	},
	/**
	 * 列表菜单（包裹组件）
	 */
	menuBag:{
		/**
		 * 菜单标题文本 
		 */
		tittleText:function(){return "菜单标题";},
		/**
		 * 按钮元素集合（文本）
		 */
		buttonElements:function(){return {};},
	},
	/**
	 * 仓库面板 
	 */
	panel5:{
		/**
		 * 按钮元素集合（文本）
		 */
		buttonElements:function(){return {};},
	},
	/**
	 * 数字选择器 
	 */
	numberPicker:{
		tittleText:"数字选择器文本",
		number : 1,
		confirmButton:"确认按钮",
	},
	/**
	 * 交易面板
	 */
	transactionPanel:{
		/**
		 * 出售的按钮元素集合（文本）
		 */
		sellButtonElements:function(){return transactionItems.sellItems;},
		/**
		 * 购买的按钮元素集合（文本）
		 */
		buyButtonElements:function(){return transactionItems.buyItems;},
	},
	/*------------------战斗场景组件视图数据------------------*/
	/**
	 * 战斗面板
	 */
	battle:{
		roleHP:function(){return dataRoleObj[0].getHp();},
		roleMaxHP:function(){return dataRoleObj[0].getMaxHp();},
	},
};
/**
 * 视图控制对象（属性为对视图的控制属性）
 */
var viewControl = {
	/**
	 * 应用全局对显示的控制(初始值)
	 */
	display:{
		/**
		 * 开始界面场景隐藏
		 */
		sceneStartHide:false,
		/**
		 * xx场景隐藏
		 */
		sceneMainHide:true,
		/**
		 * 交流信息面板隐藏
		 */
		panelHide:true,
		/**
		 * 场景名称展示条隐藏
		 */
		panel2Hide:true,
		/**
		 * 角色信息面板隐藏
		 */
		panel3Hide:true,
		/**
		 * 人物交互面板(按钮组)隐藏
		 */
		panel4Hide:true,
		/**
		 * 方向盘组件隐藏
		 */
		steeringWheelHide:true,
		/**
		 * 列表菜单（自动大小_带箭头）专用遮罩层隐藏 
		 */
		menuAutoMaskLayerHide:true,
		/**
		 * 列表菜单（自动大小_带箭头）隐藏 
		 */
		menuHide:true,
		/**
		 * 列表菜单（包裹）组件隐藏 
		 */
		menuBagHide:true,
		/**
		 * 物品信息面板  组件隐藏
		 */
		panel3ItemInfoHide:true,
		/**
		 * 物品信息面板  - name属性显示隐藏
		 */
		panel3ItemInfoNameHide:true,
		/**
		 * 物品信息面板  - name属性显示隐藏
		 */
		panel3ItemInfoContentHide:true,
		/**
		 * 对比角色物品（装备）信息面板  组件隐藏
		 */
		panel3RoleItemInfoHide:true,
		/**
		 * 仓库组件 专用遮罩层隐藏 
		 */
		panel5MaskLayerHide:true,
		/**
		 * 仓库组件隐藏
		 */
		panel5Hide:true,
		/**
		 * 数字选择器 专用遮罩层隐藏 
		 */
		numberPickerMaskLayerHide:true,
		/**
		 * 数字选择器隐藏 
		 */
		numberPickerHide:true,
		/**
		 * 交易面板 
		 */
		transactionPanelHide:true,
		/**
		 * 顶部菜单
		 */
		topFrameHide:false,
		/**
		 * 战斗场景
		 */
		sceneBattleHide:true,
	},
	/**
	 * 当前所在场景（初始值） 
	 */
	currentScene : "scene-start",
	/**
	 * 当前交互对象类型
	 */
	currentInteractiveType : "",
	/**
	 * 层叠关系集合,固定模型:{name:index,name2:index}
	 */
	zIndexList : {},
	/**
	 * 场景名称展示条
	 */
	panel2_Style:{
		"top" : 20 + "px",
		"left" : 10 + "px",
	},
	/**
	 * 角色信息面板
	 */
	panel3_Style:{
		"top" : 60 + "px",
		"left" : 20 + "px",
	},
	/**
	 * 人物交互面板(按钮组)
	 */
	panel4_Style:{
		"top" : 60 + "px",
		"left" : 330 + "px",
	},
	/**
	 * 交流信息面板 （初始值）
	 */
	panel_Style:{
		"bottom" : 5 + "px",
		"left" : 10 + "px",
	},
	/**
	 * 方向盘组件（初始值）
	 */
	steeringWheel_Style:{
		"bottom" : 55 + "px",
		"right" : 80 + "px",
	},
	/**
	 * 列表菜单（自动大小_带箭头）专用遮罩层（初始值）
	 */
	menuAutoMaskLayer_Style:{},
	/**
	 * 列表菜单（自动大小_带箭头）（初始值）
	 */
	menu_Style:{
		"top" : 30 + "px",
		"left" : 280 + "px",
		"opacity" : 0,
		"z-index":0,
	},
	/**
	 * 列表菜单（包裹）组件（初始值）
	 */
	menu_bag_Style:{
		"top" : 30 + "px",
		"left" : 180 + "px",
		"opacity" : 0,
	},
	/**
	 * 物品信息面板组件（初始值）
	 */
	panel3ItemInfo_Style:{
		"top" : 20 + "px",
		"right" : 50 + "px",
		"opacity" : 0,
	},
	/**
	 * 对比物品（装备）信息面板组件（初始值）
	 */
	panel3RoleItemInfo_Style:{
		"top" : 400 + "px",
		"right" : 50 + "px",
		"opacity" : 0,
	},
	/**
	 * 仓库组件面板 专用遮罩层（初始值）
	 */
	panel5MaskLayer_Style:{},
	/**
	 * 仓库组件面板（初始值）
	 */
	panel5_Style : {
		"top" : 10 + "px",
		"left" : 650 + "px",
		"opacity" : 0,
	},
	/**
	 * 数字选择器 专用遮罩层（初始值）
	 */
	numberPickerMaskLayer_Style:{},
	/**
	 * 数字选择器（初始值）
	 */
	numberPicker_Style:{},
	/**
	 * 交易面板（初始值）
	 */
	transactionPanel_Style:{
		"width": 500+"px",
		"top" : 50 + "px",
		"left" : 260 + "px",
		"opacity" : 0,
	},
	/*----------战斗场景面板组件----------*/
	panelFightBarColour:function(){
		sumMaxHp=dataRoleObj[0].getMaxHp();
		sumHp=dataRoleObj[0].getHp();
		percent = (sumHp/sumMaxHp);
		if(percent>0.25){
			return "grey";
		}else{
			return "red";
		}
	},
	panelFightBar_StyleFn:function(){
		sumMaxHp=dataRoleObj[0].getMaxHp();
		sumHp=dataRoleObj[0].getHp();
		if(sumHp<0){sumHp=0;}
		if(sumMaxHp<400){
			return {"width":sumHp+"px"};
		}else if(sumMaxHp>=400){
			return {"width":(sumHp/sumMaxHp)*400+"px"};
		}else{
			return {"width":0+"px"};
		}
	},
	/*{
		"width": 400+"px",
	}*/
};
