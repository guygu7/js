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
	 * 增益减益对象目标
	 */
	TARGET:{
		/**
		 * 给自己
		 */
		self:"self",
		/**
		 * 给对方
		 */
		opponent:"opponent",
	},
};
/**
 * 增益减益字典
 */
dictionaryData.buff={
	/**
	 * maxhp直接增加50
	 */
	hpUp1:{
		id:1,
		name:"增益+maxHp50",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{
			maxHp:50,
		},
		round:3,
		superposition:1,
	},
	/**
	 * maxhp增加10%
	 */
	hpUp2:{
		id:2,
		name:"增益+maxhp10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{
			maxHpPercent:0.1,
		},
		round:3,
		superposition:1,
	},
	/**
	 * maxhp减少10%
	 */
	hpDown1:{
		id:3,
		name:"减益+maxhp-10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.opponent,
		attr:{
			maxHpPercent:-0.1,
		},
		round:3,
		superposition:1,
	},
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
		 * 主动技能（可使用）
		 */
		active:"active",
		/**
		 * 非主动技能（可使用）
		 */
		unActive:"unActive",
	},
	TYPE2:{
		/**
		 * 被动技能（不可使用）
		 */
		passive:"passive",
		/**
		 * 属性技能
		 */
		attribute:"attribute",
		
	},
};
/**
 * 技能字典
 */
dictionaryData.skill={
	skill1:{
		name:"属性hpPercent:10",
		type:SKILL.TYPE.unActive,
		type2:SKILL.TYPE2.attribute,
		attr:{
			maxHpPercent:0.1,
		},
	},
	/**
	 * 攻击技能
	 */
	att:{
		name:"主动伤害",
		type:SKILL.TYPE.active,
		attr:{
			att:20,
			ep:-10,//代表EP消耗量
		},
	},
	/**
	 * deff弱化技能
	 */
	deBuff:{
		name:"deBuff",
		type:SKILL.TYPE.active,
		attr:{
			ep:-2,//代表EP消耗量
		},
		buffs:[
			dictionaryData.buff.hpDown1,
		],
	},
	/**
	 * buff:maxhp+50
	 */
	buffHpUp:{
		name:"buff:maxhp+50",
		type:SKILL.TYPE.active,
		attr:{
		},
		buffs:[
			dictionaryData.buff.hpUp1,
		],
	},
	/**
	 * buff:maxhp+10%
	 */
	buffHpUp2:{
		name:"buff:maxhp+10%",
		type:SKILL.TYPE.active,
		attr:{
		},
		buffs:[
			dictionaryData.buff.hpUp2,
		],
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
		 * 消耗品
		 */
		consumable:"consumable",
		/**
		 * 战斗消耗品
		 */
		battleConsumable:"battleConsumable",
		/**
		 * 可反复使用消耗品
		 */
		reusingConsumable:"reusingConsumable",
	},
};
/**
 * 物品字典
 */
dictionaryData.item={
	/**
	 * 恢复hp50
	 */
	recoveryHp:{
		name:"耗+hp50",
		type:ITEM.TYPE.consumable,
		type2:ITEM.TYPE2.consumable,
		attr:{
			hp:50,
		},
		content:"耗+hp50",
		totalNum:1,
		sellCost:1,
		buyCost:2,
		actions:[
			dictionaryData.action.itemToRoleBag,
			dictionaryData.action.role_itemToInteractiveObject,
			dictionaryData.action.role_useConsumable,
		],
	},
	/**
	 * 恢复当前hp10%
	 */
	recoveryHp2:{
		name:"耗+当前hp10%",
		type:ITEM.TYPE.consumable,
		type2:ITEM.TYPE2.consumable,
		attr:{
			hpPercent:0.1,
		},
		content:"耗+当前hp10%",
		totalNum:1,
		sellCost:1,
		buyCost:2,
		actions:[
			dictionaryData.action.itemToRoleBag,
			dictionaryData.action.role_itemToInteractiveObject,
			dictionaryData.action.role_useConsumable,
		],
	},
	/**
	 * 恢复Maxhp10%
	 */
	recoveryHp3:{
		name:"耗+Maxhp10%",
		type:ITEM.TYPE.consumable,
		type2:ITEM.TYPE2.consumable,
		attr:{
			maxHpPercent:0.1,
		},
		content:"耗+当前hp10%",
		totalNum:1,
		sellCost:1,
		buyCost:2,
		actions:[
			dictionaryData.action.itemToRoleBag,
			dictionaryData.action.role_itemToInteractiveObject,
			dictionaryData.action.role_useConsumable,
		],
	},
	/**
	 * 增加buff:MaxHp10%
	 */
	buffHp1:{
		name:"耗+buff:MaxHp10%",
		type:ITEM.TYPE.consumable,
		type2:ITEM.TYPE2.consumable,
		content:"耗+buff:MaxHp10%",
		buffs:[
			dictionaryData.buff.hpUp2,
		],
		totalNum:1,
		sellCost:1,
		buyCost:2,
		actions:[
			dictionaryData.action.itemToRoleBag,
			dictionaryData.action.role_itemToInteractiveObject,
		],
	},
	//------------------------------
	item1:{
		name:"消耗品hp+50",
		type:ITEM.TYPE.consumable,
		type2:ITEM.TYPE2.consumable,
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
		name:"废",
		type:ITEM.TYPE.consumable,
		type2:ITEM.TYPE2.consumable,
		content:"消耗品2说明",
		buffs:[
			//dictionaryData.buff.BUFF1,
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
		name:"可反复使用消耗品",
		type:ITEM.TYPE.consumable,
		type2:ITEM.TYPE.reusingConsumable,
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
		name:"装备物品1-1类",
		type:ITEM.TYPE.equip,
		type2:ITEM.TYPE2.equipHead,
		attr:{
			maxHp:100,
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
		name:"装备物品2-1类",
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
		name:"装备物品3-2类",
		type:ITEM.TYPE.equip,
		type2:ITEM.TYPE2.equip2,
		attr:{
				maxHp:20,
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
	item8:{
		name:"战斗消耗品",
		type:ITEM.TYPE.consumable,
		type2:ITEM.TYPE2.battleConsumable,
		attr:{
			att:50,
		},
		content:"消耗品1说明",
		totalNum:1,
		sellCost:1,
		buyCost:2,
		actions:[
			dictionaryData.action.itemToRoleBag,
			dictionaryData.action.role_itemToInteractiveObject,
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
		hp:50,
		baseMaxHp:500,
		ep:50,
		baseMaxEp:50,
		baseAtt:10,
		baseDef:1,
		baseCri:0.5,//暴击率cri的直接 增加量 或 减少量
		baseCriStrike:1.5,//暴击伤害criStrike的直接  增加量 或 减少量
		baseAvd:0.1,//闪避率avd的直接  增加量 或 减少量
		baseHit:0.8,//命中率hit的直接  增加量 或 减少量
		skills:[
			dictionaryData.skill.skill1,
			dictionaryData.skill.att,
			dictionaryData.skill.buffHpUp1,
			dictionaryData.skill.buffHpUp2,
			dictionaryData.skill.deBuff,
		],
		itemInfos:dictionaryData.roleItemInfo,
		items:[
			dictionaryData.item.item1,
			dictionaryData.item.item2,
			dictionaryData.item.item3,
			dictionaryData.item.item4,
			dictionaryData.item.item5,
			dictionaryData.item.item7,
			dictionaryData.item.item8,
			dictionaryData.item.recoveryHp,
			dictionaryData.item.recoveryHp2,
			dictionaryData.item.recoveryHp3,
			dictionaryData.item.buffHp1,
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
				/**
				 * 全局临时存放点对象（用于复制的模版）|或许会有其他用处？
				 */
				{
					name:"临时存放点",
					actions:[
						{name:"对话",type:"talk",content:"临时存放点"},
						{name:"查看",type:"useWarehouse",content:"临时存放点"},
					],
					items:[
					],
				},
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
					hp:50,
					maxHp:900,
					att:2,
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
data.roles[0].items[4].totalNum=1;
data.roles[0].items[5].totalNum=9;
data.roles[0].items[6].totalNum=9;
data.roles[0].items[7].totalNum=9;
data.roles[0].items[8].totalNum=9;
data.roles[0].items[9].totalNum=9;
data.roles[0].items[10].totalNum=9;
data.domains[1].interactiveObjects[2].items[0].dropChance=1;