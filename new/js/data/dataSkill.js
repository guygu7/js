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
};
/**
 * 技能字典
 */
dictionaryData.skill={
	example:{
		name:"主动技能示例",
		content:"主动技能说明文本",
		type:SKILL.TYPE.active,
		attr:{
			hpRecovery:1,//hp的直接 恢复量 或 减少量
			hpRecoveryPercent:0.1,//当前hp百分比的 直接恢复量 或 减少量
			hpRecoveryMaxHpPercent:1,//最大maxHp百分比的恢复量
			epRecovery:1,//ep的直接 恢复量 或 减少量
			epRecoveryPercent:0.1,//当前ep百分比的 直接恢复量 或 减少量
			epRecoveryMaxEpPercent:0.1,//最大maxEp百分比的恢复量
			att:1,//攻击力att的直接 增加量 或 减少量
			attPercent:"attPercent",//攻击力att百分比的 增加量 或 减少量
			cri:0.1,//暴击率cri的直接 增加量 或 减少量
			criStrike:0.1,//暴击伤害criStrike的直接  增加量 或 减少量
			hit:0.1,//命中率hit的直接  增加量 或 减少量
		},
		buffs:[
			//各种状态
		],
		useChance:0.1,//敌方使用概率
		actions:[
			//恢复类型可以操作
		],
	},
	example2:{//被攻击时触发
		name:"被动技能示例",
		content:"被动技能说明文本",
		type:SKILL.TYPE.unActive,
		attr:{
			hpRecovery:1,//hp的直接 恢复量 或 减少量
			hpRecoveryPercent:0.1,//当前hp百分比的 直接恢复量 或 减少量
			hpRecoveryMaxHpPercent:1,//最大maxHp百分比的恢复量
			epRecovery:1,//ep的直接 恢复量 或 减少量
			epRecoveryPercent:0.1,//当前ep百分比的 直接恢复量 或 减少量
			epRecoveryMaxEpPercent:0.1,//最大maxEp百分比的恢复量
			
			damage:1,//（反伤）固定输出伤害，不计算角色攻击力
			cri:0.1,//暴击率cri的直接 增加量 或 减少量
			criStrike:0.1,//暴击伤害criStrike的直接  增加量 或 减少量
			avd:0.1,//闪避率avd的直接  增加量 或 减少量
			hit:0.1,//命中率hit的直接  增加量 或 减少量
		},
		buffs:[
			//各种状态
		],
		useChance:0.1,//自身触发概率
		actions:[
		],
	},
	example3:{
		name:"属性技能示例",
		content:"属性技能说明文本",
		type:SKILL.TYPE.unActive,
		type2:SKILL.TYPE2.attribute,
		attr:{
			maxHp:1,//最大maxHp的直接 增加量 或 减少量
			maxHpPercent:0.1,//最大maxHp百分比的 增加量 或 减少量
			att:1,//攻击力att的直接 增加量 或 减少量
			attPercent:0.1,//攻击力att百分比的 增加量 或 减少量
			def:1,//防御力def的直接 增加量 或 减少量
			defPercent:0.1,//防御力def百分比的 增加量 或 减少量
			maxEp:1,//最大maxEp的直接 增加量 或 减少量
			maxEpPercent:0.1,//最大maxEp百分比的 增加量 或 减少量
			//damage:1,//固定输出伤害，不计算角色攻击力
			cri:0.1,//暴击率cri的直接 增加量 或 减少量
			criStrike:0.1,//暴击伤害criStrike的直接  增加量 或 减少量
			avd:1,//闪避率avd的直接  增加量 或 减少量
			hit:0.1,//命中率hit的直接  增加量 或 减少量
		},
		actions:[],
		//属性技能不存在buff、使用概率
	},
	/*-------测试（主动技能）------*/
	//普通攻击
	testAttack:{
		name:"普通攻击",
		content:"普通攻击",
		type:SKILL.TYPE.active,
		attr:{attPercent:1,
			//epRecovery:-10,//消耗EP的技能为负数
		},
		buffs:[],
		useChance:0.1,//敌方使用概率
		actions:[//恢复类型可以操作
		],
	},
	
	testHpRecovery:{
		name:"HP恢复10",
		content:"HP恢复10",
		type:SKILL.TYPE.active,
		attr:{hpRecovery:10,//hp的直接 恢复量 或 减少量
		},
		buffs:[],
		useChance:0.1,//敌方使用概率
		actions:[//恢复类型可以操作
		],
	},
	testHpRecoveryPercent:{
		name:"恢复当前HP10%",
		content:"恢复当前HP10%",
		type:SKILL.TYPE.active,
		attr:{hpRecoveryPercent:0.1,//当前hp百分比的 直接恢复量 或 减少量
		},
		buffs:[],
		useChance:0.1,//敌方使用概率
		actions:[//恢复类型可以操作
		],
	},
	testHpRecoveryMaxHpPercent:{
		name:"恢复MaxHp10%",
		content:"恢复MaxHp10%",
		type:SKILL.TYPE.active,
		attr:{hpRecoveryMaxHpPercent:0.1,//最大maxHp百分比的恢复量
			epRecovery:-5,//消耗EP的技能为负数
		},
		buffs:[],
		useChance:0.1,//敌方使用概率
		actions:[//恢复类型可以操作
		],
	},
	testEpRecovery:{
		name:"EP恢复10",
		content:"EP恢复10",
		type:SKILL.TYPE.active,
		attr:{epRecovery:10,//ep的直接 恢复量 或 减少量
		},
		buffs:[],
		useChance:0.1,//敌方使用概率
		actions:[//恢复类型可以操作
		],
	},
	testEpRecoveryPercent:{
		name:"恢复当前EP10%",
		content:"恢复当前EP10%",
		type:SKILL.TYPE.active,
		attr:{epRecoveryPercent:0.1,//当前ep百分比的 直接恢复量 或 减少量
		},
		buffs:[],
		useChance:0.1,//敌方使用概率
		actions:[//恢复类型可以操作
		],
	},
	testEpRecoveryMaxEpPercent:{
		name:"恢复MaxEp10",
		content:"恢复MaxEp10",
		type:SKILL.TYPE.active,
		attr:{epRecoveryMaxEpPercent:0.1,//最大maxEp百分比的恢复量
		},
		buffs:[],
		useChance:0.1,//敌方使用概率
		actions:[//恢复类型可以操作
		],
	},
	testAtt:{
		name:"攻击力增加10",
		content:"攻击力增加10",
		type:SKILL.TYPE.active,
		attr:{attPercent:1,//需要附上普通攻击比例
			att:10,//攻击力att的直接 增加量 或 减少量
		},
		buffs:[],
		useChance:0.1,//敌方使用概率
		actions:[//恢复类型可以操作
		],
	},
	testAttPercent:{
		name:"攻击力增加10%",
		content:"攻击力增加10%",
		type:SKILL.TYPE.active,
		attr:{attPercent:1.1,//攻击力att百分比的 增加量 或 减少量//需要附上普通攻击比例
			epRecovery:-5,//消耗EP的技能为负数
		},
		buffs:[],
		useChance:0.1,//敌方使用概率
		actions:[//恢复类型可以操作
		],
	},
	testCri:{
		name:"暴击率增加10%",
		content:"暴击率增加10%",
		type:SKILL.TYPE.active,
		attr:{attPercent:1,//需要附上普通攻击比例
			cri:0.1,//暴击率cri的直接 增加量 或 减少量
		},
		buffs:[],
		useChance:0.1,//敌方使用概率
		actions:[//恢复类型可以操作
		],
	},
	testCriStrike:{
		name:"暴击伤害增加10%",
		content:"暴击伤害增加10%",
		type:SKILL.TYPE.active,
		attr:{attPercent:1,//需要附上普通攻击比例
			criStrike:0.1,//暴击伤害criStrike的直接  增加量 或 减少量
		},
		buffs:[],
		useChance:0.1,//敌方使用概率
		actions:[//恢复类型可以操作
		],
	},
	testHit:{
		name:"增加命中率10%",
		content:"增加命中率10%",
		type:SKILL.TYPE.active,
		attr:{attPercent:1,//需要附上普通攻击比例
			hit:0.1,//命中率hit的直接  增加量 或 减少量
		},
		buffs:[],
		useChance:0.1,//敌方使用概率
		actions:[//恢复类型可以操作
		],
	},
	/*-------测试（BUFF技能）------*/
	testBuff:{
		name:"buff增加MaxHp10%",
		content:"buff增加MaxHp10%",
		type:SKILL.TYPE.active,
		attr:{},
		buffs:[
			dictionaryData.buff.testMaxHpPercent,
		],
		useChance:0.1,//敌方使用概率
	},
	testBuff2:{
		name:"buff增加攻击力10%",
		content:"buff增加攻击力10%",
		type:SKILL.TYPE.active,
		attr:{},
		buffs:[
			dictionaryData.buff.testAttPercent,
		],
		useChance:0.1,//敌方使用概率
	},
	testDeBuff:{
		name:"deBuff降低攻击力50",
		content:"deBuff降低攻击力50",
		type:SKILL.TYPE.active,
		attr:{},
		buffs:[
			dictionaryData.buff.testDeBuffAtt,
		],
		useChance:0.1,//敌方使用概率
	},
	testDeBuff2:{
		name:"deBuff:MaxHp减少10%",
		content:"deBuff:MaxHp减少10%",
		type:SKILL.TYPE.active,
		attr:{},
		buffs:[
			dictionaryData.buff.testDeBuffMaxHpPercent,
		],
		useChance:0.1,//敌方使用概率
	},
	/*-------测试（属性技能）------*/
	test3MaxHp:{
		name:"MaxHp增加10",
		content:"MaxHp增加10",
		type:SKILL.TYPE.unActive,
		type2:SKILL.TYPE2.attribute,
		attr:{
			maxHp:10,//最大maxHp的直接 增加量 或 减少量
		},
		actions:[],
	},
	test3MaxHpPercent:{
		name:"MaxHp增加10%",
		content:"MaxHp增加10%",
		type:SKILL.TYPE.unActive,
		type2:SKILL.TYPE2.attribute,
		attr:{maxHpPercent:0.1,//最大maxHp百分比的 增加量 或 减少量
		},
		actions:[],
	},
	test3MaxEp:{
		name:"MaxEp增加10",
		content:"MaxEp增加10",
		type:SKILL.TYPE.unActive,
		type2:SKILL.TYPE2.attribute,
		attr:{maxEp:10,//最大maxEp的直接 增加量 或 减少量
		},
		actions:[],
	},
	test3MaxEpPercent:{
		name:"MaxEp增加10%",
		content:"MaxEp增加10%",
		type:SKILL.TYPE.unActive,
		type2:SKILL.TYPE2.attribute,
		attr:{maxEpPercent:0.1,//最大maxEp百分比的 增加量 或 减少量
		},
		actions:[],
	},
	test3Att:{
		name:"攻击力增加10",
		content:"攻击力增加10",
		type:SKILL.TYPE.unActive,
		type2:SKILL.TYPE2.attribute,
		attr:{att:10,//攻击力att的直接 增加量 或 减少量
		},
		actions:[],
	},
	test3AttPercent:{
		name:"攻击力增加10%",
		content:"攻击力增加10%",
		type:SKILL.TYPE.unActive,
		type2:SKILL.TYPE2.attribute,
		attr:{attPercent:0.1,//攻击力att百分比的 增加量 或 减少量
		},
		actions:[],
	},
	test3Cri:{
		name:"暴击率增加10%",
		content:"暴击率增加10%",
		type:SKILL.TYPE.unActive,
		type2:SKILL.TYPE2.attribute,
		attr:{cri:0.1,//暴击率cri的直接 增加量 或 减少量
		},
		actions:[],
	},
	test3CriStrike:{
		name:"暴击伤害增加10%",
		content:"暴击伤害增加10%",
		type:SKILL.TYPE.unActive,
		type2:SKILL.TYPE2.attribute,
		attr:{criStrike:0.1,//暴击伤害criStrike的直接  增加量 或 减少量
		},
		actions:[],
	},
	test3Hit:{
		name:"增加命中率10%",
		content:"增加命中率10%",
		type:SKILL.TYPE.unActive,
		type2:SKILL.TYPE2.attribute,
		attr:{hit:0.1,//命中率hit的直接  增加量 或 减少量
		},
		actions:[],
	},
};