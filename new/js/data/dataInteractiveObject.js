var OBJ = {
};

dictionaryData.interactiveObject={
	example:{
		name:"示例",
		//contents:"对话",
		missions:[
			dictionaryData.mission.example,
		],
		hp:150,
		maxHp:900,
		att:10,
		def:10,
		cri:0.5,//暴击率cri的直接 增加量 或 减少量
		criStrike:1.2,//暴击伤害criStrike的直接  增加量 或 减少量
		avd:0.1,//闪避率avd的直接  增加量 或 减少量
		hit:0.9,//命中率hit的直接  增加量 或 减少量
		items:[
			dictionaryData.item.testEquip22,
			dictionaryData.item.testHpRecovery,
		],
		actions:[
			dictionaryData.action.fight,
		],
		skills:[
			dictionaryData.skill.att2,
			dictionaryData.skill.hpRecovery,
		],
		//itemInfo:[],
	},
	example1:{
		name:"测试-战A1",
		hp:10,
		maxHp:10,
		att:3,
		def:1,
		cri:0.5,//暴击率cri的直接 增加量 或 减少量
		criStrike:1.2,//暴击伤害criStrike的直接  增加量 或 减少量
		avd:0.05,//闪避率avd的直接  增加量 或 减少量
		hit:0.95,//命中率hit的直接  增加量 或 减少量
		actions:[
			dictionaryData.action.fight,
		],
		skills:[
		],
	},
	example2:{
		name:"测试-战A2",
		hp:10,
		maxHp:10,
		att:3,
		def:1,
		cri:0.5,//暴击率cri的直接 增加量 或 减少量
		criStrike:1.2,//暴击伤害criStrike的直接  增加量 或 减少量
		avd:0.05,//闪避率avd的直接  增加量 或 减少量
		hit:0.95,//命中率hit的直接  增加量 或 减少量
		actions:[
			dictionaryData.action.fight,
		],
		skills:[
			dictionaryData.skill.att2,
		],
	},
};

