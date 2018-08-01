//定义数据层
/*----数据----*/
/**
 * 基础字典数据 
 */
var dictionaryData = {};
/**
 * 交互动作常量数据 
 */
var ACTION={
	/**
	 * 交互动作.类型
	 */
	TYPE:{
		/**
		 * 分割、堆叠（用于唤出数字选择器） 
		 */
		split:"split",
		/**
		 * 使用消耗品 
		 */
		useConsumable:"useConsumable",
		/**
		 * 使用非消耗品 
		 */
		//useUnConsumable:"useUnConsumable",
		/**
		 * 穿上（装备）
		 */
		putOn:"putOn",
		/**
		 * 卸下（装备）
		 */
		takeOff:"takeOff",
		/**
		 * 显示已装备按钮选项（点击无效果，或不可点击）
		 */
		alreadyEquipped:"alreadyEquipped",
		/**
		 * 进入战斗界面
		 */
		fight:"fight",
	},
	/**
	 * 交互动作.目标
	 */
	TARGET:{
		/**
		 * 标识为：移动至角色包裹
		 */
		toRoleBag:"toRoleBag",
		/**
		 * 标识为：移动至交互对象（所属）
		 */
		toInteractiveObject:"toInteractiveObject",
		/**
		 * 标识为：售出返回
		 */
		sellback:"sellback",
		/**
		 * 标识为：购入返回
		 */
		buyback:"buyback",
	},
	/**
	 * 交互动作.所属归属
	 */
	BELONG:{
		/**
		 * 角色
		 */
		role:"role",
		/**
		 * 非角色
		 */
		notRole:"notRole",
		/**
		 * 交互对象
		 */
		interactiveObject:"interactiveObject",
	},
};
/**
 * 基础交互动作
 */
dictionaryData.action={
	/*---------对物品动作---------*/
	/**
	 * 物品（从交互对象）移动至角色包中
	 */
	itemToRoleBag:{
				name:"移动至包",
				type:ACTION.TYPE.split,
				target:ACTION.TARGET.toRoleBag,
				belong:ACTION.BELONG.notRole,
			},
	/**
	 * 物品（从角色包中）移动至交互对象
	 */
	role_itemToInteractiveObject:{
					name:"移动至对象",
					type:ACTION.TYPE.split,
					target:ACTION.TARGET.toInteractiveObject,
					belong:ACTION.BELONG.role,
				},
	/**
	 * （物品）使用消耗品
	 */
	role_useConsumable:{
					name:"使用消耗",
					type:ACTION.TYPE.useConsumable,
					target:"",
					belong:ACTION.BELONG.role,
				},
	/**
	 * （物品）使用非消耗品
	 */
	/*
	role_useUnConsumable:{
					name:"使用非消耗",
					type:ACTION.TYPE.useUnConsumable,
					target:"",
					belong:ACTION.BELONG.role,
				},
			*/
	/**
	 * （物品）穿上装备
	 */
	role_putOn:{
					name:"实装",
					type:ACTION.TYPE.putOn,
					target:"",
					belong:ACTION.BELONG.role,
				},
	/**
	 * （物品）卸下装备
	 */
	role_takeOff:{
					name:"卸下实装",
					type:ACTION.TYPE.takeOff,
					target:"",
					belong:ACTION.BELONG.role,
				},
	/**
	 * （物品） 显示已装备按钮选项（点击无效果，或不可点击）
	 */
	role_alreadyEquipped:{
					name:"已实装",
					type:ACTION.TYPE.alreadyEquipped,
					target:"",
					belong:ACTION.BELONG.role,
				},
	/**
	 * （物品）售出返回：从交易暂存面板中撤回至角色包
	 */
	sellback:{
				name:"撤回至包",
				type:ACTION.TYPE.split,
				target:ACTION.TARGET.sellback,
			},
	/**
	 * （物品）购入返回：从交易暂存面板中撤回至交互对象
	 */
	buyback:{
				name:"撤回至对象",
				type:ACTION.TYPE.split,
				target:ACTION.TARGET.buyback,
			},
	/*--------对交互对象动作------*/
	/**
	 * 攻击动作，进入战斗界面
	 */
	fight:{
				name:"跳转界面",
				type:ACTION.TYPE.fight,
				target:ACTION.TARGET.interactiveObject
	}
};


/**
 * 技能常量数据
 */
var SKILL={
	/**
	 * 类型
	 */
	TYPE:{
		/**
		 * 主动技能
		 */
		active:"active",
		/**
		 * 被动技能
		 */
		passive:"passive",
		/**
		 * 属性技能
		 */
		attribute:"attribute",
	},
	/**
	 * 效果
	 */
	EFFECT:{
		/*------属性-----*/
		hp:"hp",
		att:"att",
		def:"def",
		hpPercent:"hpPercent",
		attPercent:"attPercent",
		defPercent:"defPercent",
		/*------主动------*/
		
	},
};
/**
 * 技能字典
 */
dictionaryData.skill={
	skill1:{
		name:"属性hpPercent:10",
		type:SKILL.TYPE.attribute,
		effect:{
			hpPercent:0.1,
		},
	},
};


/**
 * 增益减益常量数据
 */
var BUFF={
	/**
	 * 类型
	 */
	TYPE:{
		/**
		 * 战斗增益（战斗后消失）
		 */
		battleBuff:"battleBuff",
		/**
		 * 长期增益
		 */
		buff:"buff",
		
	},
	/**
	 * 效果
	 */
	EFFECT:{
		hpPercent:1,
	},
};
/**
 * 增益减益字典
 */
dictionaryData.buff={
	BUFF1:{
		name:"增益",
		type:BUFF.TYPE.battleBuff,
		effect:{
			hpPercent:1,
		},
		round:3,
		superposition:1,
	},
};


/**
 * 物品常量数据 
 */
var ITEM={
	/**
	 * 类型（大类）
	 */
	TYPE:{
		/**
		 * 消耗品
		 */
		consumable:"consumable",
		/**
		 * 装备
		 */
		equip:"equip",
		
	},
	/**
	 * 类型（小类、第二分类） 
	 */
	TYPE2:{
		equipHead:"head",
		equip2:"2",
		/**
		 * 战斗消耗品
		 */
		battleConsumable:"battleConsumable",
		/**
		 * 非消耗品
		 */
		unConsumable:"unConsumable",
	},
};
/**
 * 物品字典
 */
dictionaryData.item={
	item1:{
		name:"消耗品+hp",
		type:ITEM.TYPE.consumable,
		attr:{
			hp:50,
		},
		content:"消耗品1说明",
		totalNum:1,
		sellCost:1,
		buyCost:2,
		actions:[
			dictionaryData.action.itemToRoleBag,
			dictionaryData.action.role_itemToInteractiveObject,
			dictionaryData.action.role_useConsumable,
		],
	},
	item2:{
		name:"消耗品+buff",
		type:ITEM.TYPE.consumable,
		content:"消耗品2说明",
		buffs:[
			dictionaryData.buff.BUFF1,
		],
		totalNum:1,
		sellCost:1,
		buyCost:2,
		actions:[
			dictionaryData.action.itemToRoleBag,
			dictionaryData.action.role_itemToInteractiveObject,
			//dictionaryData.action.role_useUnConsumable,
		],
	},
	item3:{
		name:"消耗品",
		type:ITEM.TYPE.consumable,
		content:"消耗品3说明",
		totalNum:1,
		sellCost:5,
		buyCost:10,
		actions:[
			dictionaryData.action.itemToRoleBag,
			dictionaryData.action.role_itemToInteractiveObject,
		],
	},
	item4:{
		name:"实装物体1",
		type:ITEM.TYPE.equip,
		type2:ITEM.TYPE2.equipHead,
		attr:{
			hp:100,
			def:1,
		},
		//skill:
		content:"物体1说明",
		totalNum:1,
		sellCost:5,
		buyCost:10,
		isPutOn:false,
		actions:[
			dictionaryData.action.itemToRoleBag,
			dictionaryData.action.role_itemToInteractiveObject,
			dictionaryData.action.role_putOn,
			dictionaryData.action.role_takeOff,
			dictionaryData.action.role_alreadyEquipped,
		],
	},
	item5:{
		name:"实装物体2",
		type:ITEM.TYPE.equip,
		type2:ITEM.TYPE2.equipHead,
		content:"物体2说明",
		totalNum:1,
		sellCost:5,
		buyCost:10,
		isPutOn:false,
		actions:[
			dictionaryData.action.itemToRoleBag,
			dictionaryData.action.role_itemToInteractiveObject,
			dictionaryData.action.role_putOn,
			dictionaryData.action.role_takeOff,
			dictionaryData.action.role_alreadyEquipped,
		],
	},
	item7:{
		name:"实装物体3",
		type:ITEM.TYPE.equip,
		type2:ITEM.TYPE2.equip2,
		attr:{
				hp:20,
				att:10,
				def:3,
		},
		content:"物体3说明",
		totalNum:1,
		sellCost:5,
		buyCost:10,
		isPutOn:false,
		actions:[
			dictionaryData.action.itemToRoleBag,
			dictionaryData.action.role_itemToInteractiveObject,
			dictionaryData.action.role_putOn,
			dictionaryData.action.role_takeOff,
			dictionaryData.action.role_alreadyEquipped,
		],
	},
	item6:{name:"物体3超长物品名字",type:"",content:"物体3说明",totalNum:1,sellCost:5,buyCost:10,
		actions:[
			dictionaryData.action.itemToRoleBag,
			dictionaryData.action.role_itemToInteractiveObject,
		],
	},
};
//对原始物品字典数据备份（暂不使用）
dictionaryData.itemBak = JSON.parse(JSON.stringify(dictionaryData.item));
//深度复制
dictionaryData.roleItemInfo = [];
dictionaryData.itemInfo = [];
(function (){
	//roleItemInfo数据处理
	var tempRoleItemInfo = JSON.parse(JSON.stringify(dictionaryData.item));
	for (var tempitem in tempRoleItemInfo) {
		//遍历获取每个item 记为 tempitem
		//获取item中的actions数组
		var tempActions = tempRoleItemInfo[tempitem].actions;
		for (var i=0; i < tempActions.length; i++) {
			if("notRole"==tempActions[i].belong){
				//判断不属于role,去掉该动作
				tempActions.splice(i,i+1);
				i--;
			}
		};
		dictionaryData.roleItemInfo.push(tempRoleItemInfo[tempitem]);
	};
	//itemInfo数据处理,同时重构物品字典，去掉role的动作
	for (var tempitem in dictionaryData.item) {
		//遍历获取每个item 记为 tempitem
		//获取item中的actions数组
		var tempActions =  dictionaryData.item[tempitem].actions;
		for (var i=0; i < tempActions.length; i++) {
			if("role"==tempActions[i].belong){
				//判断属于role,去掉该动作
				tempActions.splice(i,i+1);
				i--;
			}
		};
		dictionaryData.itemInfo.push(dictionaryData.item[tempitem]);
	};
})();
/**
 * 初始数据 
 */
var data = {
	/**
	 * 开始引导文本
	 */
	startText:"开始引导文本。。",
	/**
	 * 角色数据 
	 */
	roles:[{
		name:"角色",
		hp:400,
		baseHp:500,
		baseAtt:10,
		baseDef:1,
		skills:[
			dictionaryData.skill.skill1,
		],
		itemInfos:dictionaryData.roleItemInfo,
		items:[
			dictionaryData.item.item1,
			dictionaryData.item.item2,
			dictionaryData.item.item4,
			dictionaryData.item.item5,
			dictionaryData.item.item7,
		],
	},],
	/**
	 * 场景数据 
	 */
	domains:[
		/**
		 * 开场局部区域（小场景） 
		 */
		{
			name:"引导场景",
			signId:"startDomain",
			interactiveObjects:[
				{	
					name:"引导对象",
					actions:[
						{name:"对话",type:"talk",content:"对话内容"},
						{name:"移动",type:"move",content:"移动到公共场景",target:"publicDomain"},
					],
				},
			],
			
		},
		/**
		 * 公共场景
		 */
		{
			name:"公共场景",
			signId:"publicDomain",
			interactiveObjects:[
				{
					name:"移动-私有据点场景",
					actions:[
						{name:"对话",type:"talk",content:"公共场景-移动对象-对话内容"},
						{name:"移动",type:"move",content:"移动-私有据点场景",target:"homeDomain"},
					],
				},
				{
					name:"交流对象",
					items:[
						dictionaryData.item.item1,
						//dictionaryData.item.item3,
						//dictionaryData.item.item4,
					],
					actions:[
						{name:"对话",type:"talk",content:"公共场景-交流对象-对话内容"},
						{name:"交互",type:"transaction",content:"打开交易面板"},
					],
					//itemInfo:[],
				},
				{
					name:"对战对象",
					hp:250,
					maxHp:300,
					att:20,
					def:10,
					items:[
						dictionaryData.item.item1,
					],
					actions:[
						dictionaryData.action.fight,
					],
					//itemInfo:[],
				},
			],
			//itemInfo:[],
		},
		/**
		 * 私有据点场景
		 */
		{
			name:"私有据点场景",
			signId:"homeDomain",
			interactiveObjects:[
				{
					name:"移动-公共场景",
					actions:[
						{name:"对话",type:"talk",content:"私有据点-移动对象-对话内容"},
						{name:"移动",type:"move",content:"移动-公共场景",target:"publicDomain"},
					],
				},
				{
					name:"私有建筑",
					actions:[
						{name:"对话",type:"talk",content:"私有据点-私有建筑-对话内容"},
						{name:"使用",type:"useWarehouse",content:"私有据点-私有建筑-使用"},
					],
					items:[
						//dictionaryData.item.item5,
						//dictionaryData.item.item6,
					],
				},
			],
		},
	],
};
data.roles[0].items[0].totalNum=9;
data.roles[0].items[1].totalNum=1;
data.roles[0].items[2].totalNum=1;
data.roles[0].items[3].totalNum=1;
