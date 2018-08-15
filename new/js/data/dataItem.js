
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
		equip1:"1",
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
	ATTR:{
		hpRecovery:"hpRecovery",//hp的直接 恢复量 或 减少量
		hpRecoveryPercent:"hpRecoveryPercent",//当前hp百分比的 直接恢复量 或 减少量
		hpRecoveryMaxHpPercent:"hpRecoveryMaxHpPercent",//最大maxHp百分比的恢复量
		maxHp:"maxHp",//最大maxHp的直接 增加量 或 减少量
		maxHpPercent:"maxHpPercent",//最大maxHp百分比的 增加量 或 减少量
		att:"att",//攻击力att的直接 增加量 或 减少量
		attPercent:"attPercent",//攻击力att百分比的 增加量 或 减少量
		def:"def",//防御力def的直接 增加量 或 减少量
		defPercent:"defPercent",//防御力def百分比的 增加量 或 减少量
		/*未实现*/
		absorbHp:"absorbHp",//吸hp(百分比)
		absorbEp:"absorbEp",//吸ep(百分比)
		//能量值
		/*----------------此部分暂未写入战斗逻辑---------------*/
		epRecovery:"epRecovery",//ep的直接 恢复量 或 减少量
		epRecoveryPercent:"epRecoveryPercent",//当前ep百分比的 直接恢复量 或 减少量
		epRecoveryMaxEpPercent:"epRecoveryMaxEpPercent",//最大maxEp百分比的恢复量
		/*----------------------------------------------*/
		maxEp:"maxEp",//最大maxEp的直接 增加量 或 减少量
		maxEpPercent:"maxEpPercent",//最大maxEp百分比的 增加量 或 减少量
		damage:"damage",//固定输出伤害，不计算角色攻击力
		cri:"cri",//暴击率cri的直接 增加量 或 减少量
		//criPercent:"criPercent",//暴击率cri百分比的 增加量 或 减少量（不适用skill）
		criStrike:"criStrike",//暴击伤害criStrike的直接  增加量 或 减少量
		//criStrikePercent:"criStrikePercent",//暴击伤害criStrike百分比的  增加量 或 减少量（不适用skill）
		avd:"avd",//闪避率avd的直接  增加量 或 减少量
		//avdPercent:"avdPercent",//闪避率avd百分比的  增加量 或 减少量（不适用skill）
		hit:"hit",//命中率hit的直接  增加量 或 减少量
		//hitPercent:"hitPercent",//命中率hit百分比的  增加量 或 减少量（不适用skill）
	},
	/**
	 * 交互动作组合
	 */
	ACTIONS:{
		/**
		 * 消耗类物品
		 */
		consumable:[
			dictionaryData.action.itemToRoleBag,
			dictionaryData.action.role_itemToInteractiveObject,
			dictionaryData.action.role_useConsumable,
		],
		/**
		 * 战斗消耗类物品(攻击、投掷类)
		 */
		battleConsumable:[
			dictionaryData.action.itemToRoleBag,
			dictionaryData.action.role_itemToInteractiveObject,
			//dictionaryData.action.role_useConsumable,战斗类消耗品不可使用
		],
		/**
		 * 装备类物品
		 */
		equip:[
			dictionaryData.action.itemToRoleBag,
			dictionaryData.action.role_itemToInteractiveObject,
			dictionaryData.action.role_putOn,
			dictionaryData.action.role_takeOff,
			dictionaryData.action.role_alreadyEquipped,
		],
	}
};
/**
 * 物品字典
 */
dictionaryData.item={
	example:{
		name:"消耗物品示例",
		content:"消耗物品示例",
		type:ITEM.TYPE.consumable,
		type2:ITEM.TYPE2.consumable,
		attr:{
			hpRecovery:1,//hp的直接 恢复量 或 减少量
			hpRecoveryPercent:0.1,//当前hp百分比的 直接恢复量 或 减少量
			hpRecoveryMaxHpPercent:0.1,//最大maxHp百分比的恢复量
			att:1,//攻击力att的直接 增加量 或 减少量
			attPercent:0.1,//攻击力att百分比的 增加量 或 减少量
			def:1,//防御力def的直接 增加量 或 减少量
			defPercent:0.1,//防御力def百分比的 增加量 或 减少量
			//能量值
			/*----------------此部分暂未写入战斗逻辑---------------*/
			epRecovery:1,//ep的直接 恢复量 或 减少量
			epRecoveryPercent:0.1,//当前ep百分比的 直接恢复量 或 减少量
			epRecoveryMaxEpPercent:0.1,//最大maxEp百分比的恢复量
			/*----------------------------------------------*/
			maxEp:1,//最大maxEp的直接 增加量 或 减少量
			maxEpPercent:0.1,//最大maxEp百分比的 增加量 或 减少量
			damage:1,//固定输出伤害，不计算角色攻击力
			cri:0.1,//暴击率cri的直接 增加量 或 减少量
			criStrike:0.1,//暴击伤害criStrike的直接  增加量 或 减少量
			avd:0.1,//闪避率avd的直接  增加量 或 减少量
			hit:0.1,//命中率hit的直接  增加量 或 减少量
		},
		buffs:[//各种状态（对自身）
		],
		totalNum:1,//拥有数量
		sellCost:1,//售出价值
		buyCost:2,//购入价值
		actions:ITEM.ACTIONS.consumable,
	},
	example2:{//攻击、投掷类
		name:"战斗消耗物品示例",
		content:"战斗消耗物品示例",
		type:ITEM.TYPE.consumable,
		type2:ITEM.TYPE2.battleConsumable,
		attr:{
			hpRecovery:1,//hp的直接 恢复量 或 减少量
			hpRecoveryPercent:0.1,//当前hp百分比的 直接恢复量 或 减少量
			hpRecoveryMaxHpPercent:0.1,//最大maxHp百分比的恢复量
			att:1,//攻击力att的直接 增加量 或 减少量
			attPercent:0.1,//攻击力att百分比的 增加量 或 减少量
			def:1,//防御力def的直接 增加量 或 减少量
			defPercent:0.1,//防御力def百分比的 增加量 或 减少量
			//能量值
			/*----------------此部分暂未写入战斗逻辑---------------*/
			epRecovery:1,//ep的直接 恢复量 或 减少量
			epRecoveryPercent:0.1,//当前ep百分比的 直接恢复量 或 减少量
			epRecoveryMaxEpPercent:0.1,//最大maxEp百分比的恢复量
			/*----------------------------------------------*/
			maxEp:1,//最大maxEp的直接 增加量 或 减少量
			maxEpPercent:0.1,//最大maxEp百分比的 增加量 或 减少量
			damage:1,//固定输出伤害，不计算角色攻击力
			cri:0.1,//暴击率cri的直接 增加量 或 减少量
			criStrike:0.1,//暴击伤害criStrike的直接  增加量 或 减少量
			avd:0.1,//闪避率avd的直接  增加量 或 减少量
			hit:0.1,//命中率hit的直接  增加量 或 减少量
		},
		buffs:[//各种状态（对自身或对方）
		],
		totalNum:1,//拥有数量
		sellCost:1,//售出价值
		buyCost:2,//购入价值
		actions:ITEM.ACTIONS.battleConsumable,
	},
	example3:{//装备类
		name:"装备物品示例",
		content:"装备物品示例",
		type:ITEM.TYPE.equip,
		type2:ITEM.TYPE2.equipHead,
		attr:{
			maxHp:"maxHp",//最大maxHp的直接 增加量 或 减少量
			maxHpPercent:"maxHpPercent",//最大maxHp百分比的 增加量 或 减少量
			att:1,//攻击力att的直接 增加量 或 减少量
			attPercent:0.1,//攻击力att百分比的 增加量 或 减少量
			def:1,//防御力def的直接 增加量 或 减少量
			defPercent:0.1,//防御力def百分比的 增加量 或 减少量
			//能量值
			maxEp:1,//最大maxEp的直接 增加量 或 减少量
			maxEpPercent:0.1,//最大maxEp百分比的 增加量 或 减少量
			damage:1,//固定输出伤害，不计算角色攻击力
			cri:0.1,//暴击率cri的直接 增加量 或 减少量
			criStrike:0.1,//暴击伤害criStrike的直接  增加量 或 减少量
			avd:0.1,//闪避率avd的直接  增加量 或 减少量
			hit:0.1,//命中率hit的直接  增加量 或 减少量
		},
		//skill:未完成
		totalNum:1,//拥有数量
		sellCost:1,//售出价值
		buyCost:2,//购入价值
		isPutOn:false,
		actions:ITEM.ACTIONS.equip,
	},
	/*--------测试（消耗品）--------*/
	testHpRecovery:{
		name:"消耗品恢复MaxHp10%",
		content:"消耗品恢复MaxHp10%",
		type:ITEM.TYPE.consumable,
		type2:ITEM.TYPE2.consumable,
		attr:{
			hpRecoveryMaxHpPercent:0.1,
		},
		buffs:[//各种状态（对自身）
		],
		totalNum:1,//拥有数量
		sellCost:1,//售出价值
		buyCost:2,//购入价值
		actions:ITEM.ACTIONS.consumable,
	},
	testEpRecovery:{
		name:"消耗品恢复EP50",
		content:"消耗品恢复EP50",
		type:ITEM.TYPE.consumable,
		type2:ITEM.TYPE2.consumable,
		attr:{
			epRecovery:50,
		},
		buffs:[//各种状态（对自身）
		],
		totalNum:1,//拥有数量
		sellCost:1,//售出价值
		buyCost:2,//购入价值
		actions:ITEM.ACTIONS.consumable,
	},
	testBuff:{
		name:"消耗品Buff:MaxHp10%",
		content:"消耗品Buff:MaxHp10%",
		type:ITEM.TYPE.consumable,
		type2:ITEM.TYPE2.consumable,
		attr:{},
		buffs:[//各种状态（对自身）
			dictionaryData.buff.testMaxHpPercent,
		],
		totalNum:1,//拥有数量
		sellCost:1,//售出价值
		buyCost:2,//购入价值
		actions:ITEM.ACTIONS.consumable,
	},
	/*-------测试（战斗消耗物品）-------*/
	test2Att:{//攻击、投掷类
		name:"战斗消耗品:攻击10",
		content:"战斗消耗品:攻击10",
		type:ITEM.TYPE.consumable,
		type2:ITEM.TYPE2.battleConsumable,
		attr:{
			att:1,//攻击力att的直接 增加量 或 减少量
		},
		buffs:[//各种状态（对自身或对方）
		],
		totalNum:1,//拥有数量
		sellCost:1,//售出价值
		buyCost:2,//购入价值
		actions:ITEM.ACTIONS.battleConsumable,
	},
	test2DeBuff:{//攻击、投掷类
		name:"战斗消耗品:deBuff攻击-50",
		content:"战斗消耗品:攻击10",
		type:ITEM.TYPE.consumable,
		type2:ITEM.TYPE2.battleConsumable,
		attr:{},
		buffs:[//各种状态（对自身或对方）
			dictionaryData.buff.testDeBuffAtt,
		],
		totalNum:1,//拥有数量
		sellCost:1,//售出价值
		buyCost:2,//购入价值
		actions:ITEM.ACTIONS.battleConsumable,
	},
	/*-------测试（装备类物品）-------*/
	testEquip11:{//装备类
		name:"装备物品1类-1号",
		content:"装备物品1类-1号",
		type:ITEM.TYPE.equip,
		type2:ITEM.TYPE2.equip1,
		attr:{
			maxHp:1,//最大maxHp的直接 增加量 或 减少量
		},
		//skill:未完成
		totalNum:1,//拥有数量
		sellCost:1,//售出价值
		buyCost:2,//购入价值
		isPutOn:false,
		actions:ITEM.ACTIONS.equip,
	},
	testEquip12:{//装备类
		name:"装备物品1类-2号",
		content:"装备物品1类-2号",
		type:ITEM.TYPE.equip,
		type2:ITEM.TYPE2.equip1,
		attr:{
			maxHpPercent:0.1,//最大maxHp百分比的 增加量 或 减少量
		},
		//skill:未完成
		totalNum:1,//拥有数量
		sellCost:1,//售出价值
		buyCost:2,//购入价值
		isPutOn:false,
		actions:ITEM.ACTIONS.equip,
	},
	testEquip21:{//装备类
		name:"装备物品2类-1号",
		content:"装备物品2类-1号",
		type:ITEM.TYPE.equip,
		type2:ITEM.TYPE2.equip2,
		attr:{
			maxEp:1,//最大maxEp的直接 增加量 或 减少量
		},
		//skill:未完成
		totalNum:1,//拥有数量
		sellCost:1,//售出价值
		buyCost:2,//购入价值
		isPutOn:false,
		actions:ITEM.ACTIONS.equip,
	},
	testEquip22:{//装备类
		name:"装备物品2类-2号",
		content:"装备物品2类-2号",
		type:ITEM.TYPE.equip,
		type2:ITEM.TYPE2.equip2,
		attr:{
			maxEpPercent:0.1,//最大maxEp百分比的 增加量 或 减少量
		},
		//skill:未完成
		totalNum:1,//拥有数量
		sellCost:1,//售出价值
		buyCost:2,//购入价值
		isPutOn:false,
		actions:ITEM.ACTIONS.equip,
	},
};