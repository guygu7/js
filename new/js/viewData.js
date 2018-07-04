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
	panelText:"",
	/**
	 * XX面板文本 
	 */
	panel2Text:"中文",
	/**
	 * XX面板 
	 */
	panel3:{
		/**
		 * 标题文本 
		 */
		tittleText:"标题",
	},
	/**
	 * 人物交互面板(按钮组)
	 */
	panel4:{
		/**
		 * 按钮元素集合
		 */
		buttonElements:{},
	},
	/**
	 * 列表菜单
	 */
	menu:{
		/**
		 * 菜单标题文本 
		 */
		tittleText:"菜单标题",
		/**
		 * 按钮元素集合（文本）
		 */
		buttonElements:{},
	},
	/**
	 * 列表菜单（包裹组件）
	 */
	menuBag:{
		/**
		 * 菜单标题文本 
		 */
		tittleText:"菜单标题",
		/**
		 * 按钮元素集合（文本）
		 */
		buttonElements:{},
	},
	/**
	 * 仓库面板 
	 */
	panel5:{
		/**
		 * 按钮元素集合（文本）
		 */
		buttonElements:{},
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
		 * 列表菜单隐藏 
		 */
		menuHide:true,
		/**
		 * 列表菜单（包裹）组件隐藏 
		 */
		menuBagHide:true,
		/**
		 * 遮罩层隐藏 
		 */
		maskLayerHide:true,
		/**
		 * 仓库组件隐藏
		 */
		panel5Hide:true,
	},
	/**
	 * 当前所在场景（初始值） 
	 */
	currentScene : "scene-start",
	/**
	 * 层叠关系集合,固定模型:{name:index,name2:index}
	 */
	zIndexList : {
		panel4 : 0
	},
	/**
	 * 列表菜单（初始值）
	 */
	panel4_menu_Style:{
		"top" : 30 + "px",
		"left" : 280 + "px",
		"opacity" : 0,
		"z-index":0,
	},
	/**
	 * 列表菜单（包裹）组件（初始值）
	 */
	panel4_menu_bag_Style:{
		"top" : 30 + "px",
		"left" : 180 + "px",
		"opacity" : 0,
	},
	/**
	 * 仓库组件面板（初始值）
	 */
	panel5_Style : {
		"top" : 50 + "px",
		"left" : 650 + "px",
		"opacity" : 0
	},
};
