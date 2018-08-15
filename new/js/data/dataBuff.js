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
		//能量值
		epRecovery:"epRecovery",//ep的直接 恢复量 或 减少量
		epRecoveryPercent:"epPercent",//当前ep百分比的 直接恢复量 或 减少量
		epRecoveryMaxEpPercent:"epRecoveryMaxEpPercent",//最大maxEp百分比的恢复量
		maxEp:"maxEp",//最大maxEp的直接 增加量 或 减少量
		maxEpPercent:"maxEpPercent",//最大maxEp百分比的 增加量 或 减少量
		
		//damage:"damage",//固定输出伤害，不计算角色攻击力
		cri:"cri",//暴击率cri的直接 增加量 或 减少量
		criPercent:"criPercent",//暴击率cri百分比的 增加量 或 减少量（不适用skill）
		criStrike:"criStrike",//暴击伤害criStrike的直接  增加量 或 减少量
		criStrikePercent:"criStrikePercent",//暴击伤害criStrike百分比的  增加量 或 减少量（不适用skill）
		avd:"avd",//闪避率avd的直接  增加量 或 减少量
		avdPercent:"avdPercent",//闪避率avd百分比的  增加量 或 减少量（不适用skill）
		hit:"hit",//命中率hit的直接  增加量 或 减少量
		hitPercent:"hitPercent",//命中率hit百分比的  增加量 或 减少量（不适用skill）
	},
};
/**
 * 增益减益字典
 */
dictionaryData.buff={
	example:{
		buffId:9999,
		name:"增益减益示例",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,//给对方附加:BUFF.TARGET.opponent,
		attr:{
			hpRecovery:1,//hp的直接 恢复量 或 减少量
			hpRecoveryPercent:0.1,//当前hp百分比的 直接恢复量 或 减少量
			hpRecoveryMaxHpPercent:0.1,//最大maxHp百分比的恢复量
			maxHp:1,//最大maxHp的直接 增加量 或 减少量
			maxHpPercent:0.1,//最大maxHp百分比的 增加量 或 减少量
			att:1,//攻击力att的直接 增加量 或 减少量
			attPercent:0.1,//攻击力att百分比的 增加量 或 减少量
			def:1,//防御力def的直接 增加量 或 减少量
			defPercent:0.1,//防御力def百分比的 增加量 或 减少量
			//能量值
			epRecovery:1,//ep的直接 恢复量 或 减少量
			epRecoveryPercent:0.1,//当前ep百分比的 直接恢复量 或 减少量
			epRecoveryMaxEpPercent:0.1,//最大maxEp百分比的恢复量
			maxEp:1,//最大maxEp的直接 增加量 或 减少量
			maxEpPercent:0.1,//最大maxEp百分比的 增加量 或 减少量
			//damage:1,//固定输出伤害，不计算角色攻击力
			cri:0.1,//暴击率cri的直接 增加量 或 减少量
			criPercent:0.1,//暴击率cri百分比的 增加量 或 减少量（不适用skill）
			criStrike:0.1,//暴击伤害criStrike的直接  增加量 或 减少量
			criStrikePercent:0.1,//暴击伤害criStrike百分比的  增加量 或 减少量（不适用skill）
			avd:0.1,//闪避率avd的直接  增加量 或 减少量
			avdPercent:0.1,//闪避率avd百分比的  增加量 或 减少量（不适用skill）
			hit:0.1,//命中率hit的直接  增加量 或 减少量
			hitPercent:0.1,//命中率hit百分比的  增加量 或 减少量（不适用skill）
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"增益减益说明文本",
	},
	/*-----测试（减益）----*/
	testDeBuffAtt:{
		buffId:10006,
		name:"攻击力减少50",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.opponent,
		attr:{att:-50,//攻击力att的直接 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"攻击力减少50",
	},
	testDeBuffMaxHpPercent:{
		buffId:10005,
		name:"MaxHp减少10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.opponent,
		attr:{maxHpPercent:-0.1,//最大maxHp百分比的 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"MaxHp减少10%",
	},
	/*-----测试（增益）----*/
	testHpRecovery:{
		buffId:10001,
		name:"HP恢复10",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{hpRecovery:10,//hp的直接 恢复量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"HP恢复10",
	},
	testHpRecoveryPercent:{
		buffId:10002,
		name:"恢复当前HP10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{hpRecoveryPercent:0.1,//当前hp百分比的 直接恢复量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"恢复当前HP10%",
	},
	testHpRecoveryMaxHpPercent:{
		buffId:10003,
		name:"恢复MaxHp10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{hpRecoveryMaxHpPercent:0.1,//最大maxHp百分比的恢复量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"恢复MaxHp10%",
	},
	testMaxHp:{
		buffId:10004,
		name:"MaxHp增加10",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{maxHp:10,//最大maxHp的直接 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"MaxHp增加10",
	},
	testMaxHpPercent:{
		buffId:10005,
		name:"MaxHp增加10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{maxHpPercent:0.1,//最大maxHp百分比的 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"MaxHp增加10%",
	},
	testAtt:{
		buffId:10006,
		name:"攻击力增加10",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{att:10,//攻击力att的直接 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"攻击力增加10",
	},
	testAttPercent:{
		buffId:10007,
		name:"攻击力增加10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{attPercent:0.1,//攻击力att百分比的 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"攻击力增加10%",
	},
	testDef:{
		buffId:10008,
		name:"防御力增加10",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{def:10,//防御力def的直接 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"防御力增加10",
	},
	testDefPercent:{
		buffId:10009,
		name:"防御力增加10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{defPercent:0.1,//防御力def百分比的 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"防御力增加10%",
	},
	testEpRecovery:{
		buffId:10010,
		name:"EP恢复10",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{epRecovery:10,//ep的直接 恢复量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"EP恢复10",
	},
	testEpRecoveryPercent:{
		buffId:10011,
		name:"恢复当前EP10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{epRecoveryPercent:0.1,//当前ep百分比的 直接恢复量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"恢复当前EP10%",
	},
	testEpRecoveryMaxEpPercent:{
		buffId:10012,
		name:"恢复MaxEp10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{epRecoveryMaxEpPercent:0.1,//最大maxEp百分比的恢复量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"恢复MaxEp10%",
	},
	testMaxEp:{
		buffId:10013,
		name:"MaxEp增加10",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{maxEp:10,//最大maxEp的直接 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"MaxEp增加10",
	},
	testMaxEpPercent:{
		buffId:10014,
		name:"MaxEp增加10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{maxEpPercent:0.1,//最大maxEp百分比的 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"MaxEp增加10%",
	},
	testCri:{
		buffId:10015,
		name:"暴击率增加10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{cri:0.1,//暴击率cri的直接 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"暴击率增加10%",
	},
	testCriPercent:{
		buffId:10016,
		name:"增加当前暴击率的10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{criPercent:0.1,//暴击率cri百分比的 增加量 或 减少量（不适用skill）
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"增加当前暴击率的10%",
	},
	testCriStrike:{
		buffId:10017,
		name:"暴击伤害增加10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{criStrike:0.1,
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"暴击伤害增加10%",
	},
	testCriStrikePercent:{
		buffId:10018,
		name:"增加当前暴击伤害的10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{criStrikePercent:0.1,//暴击伤害criStrike百分比的  增加量 或 减少量（不适用skill）
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"增加当前暴击伤害的10%",
	},
	testAvd:{
		buffId:10019,
		name:"增加闪避率10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{avd:0.1,//闪避率avd的直接  增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"增加闪避率10%",
	},
	testAvdPercent:{
		buffId:10020,
		name:"增加当前闪避率的10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{avdPercent:0.1,//闪避率avd百分比的  增加量 或 减少量（不适用skill）
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"增加当前闪避率的10%",
	},
	testHit:{
		buffId:10021,
		name:"增加命中率10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{hit:0.1,//命中率hit的直接  增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"增加命中率10%",
	},
	testHitPercent:{
		buffId:10022,
		name:"增加当前命中率的10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{hitPercent:0.1,//命中率hit百分比的  增加量 或 减少量（不适用skill）
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"增加当前命中率的10%",
	},
	/*-----测试（减益）----*/
	test2HpRecovery:{//适用中毒、流血等效果
		buffId:20001,
		name:"HP减少10",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{hpRecovery:-10,//hp的直接 恢复量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"HP减少10",
	},
	test2HpRecoveryPercent:{//适用中毒、流血等效果
		buffId:20002,
		name:"减少当前HP10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{hpRecoveryPercent:-0.1,//当前hp百分比的 直接恢复量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"减少当前HP10%",
	},
	test2HpRecoveryMaxHpPercent:{//适用中毒、流血等效果
		buffId:20003,
		name:"减少MaxHp10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{hpRecoveryMaxHpPercent:-0.1,//最大maxHp百分比的恢复量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"减少MaxHp10%",
	},
	test2MaxHp:{
		buffId:20004,
		name:"MaxHp降低10",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{maxHp:-10,//最大maxHp的直接 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"MaxHp降低10",
	},
	test2MaxHpPercent:{
		buffId:20005,
		name:"MaxHp降低10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{maxHpPercent:-0.1,//最大maxHp百分比的 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"MaxHp降低10%",
	},
	test2Att:{
		buffId:20006,
		name:"攻击力降低10",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{att:-10,//攻击力att的直接 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"攻击力降低10",
	},
	test2AttPercent:{
		buffId:20007,
		name:"攻击力降低10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{attPercent:-0.1,//攻击力att百分比的 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"攻击力降低10%",
	},
	test2Def:{
		buffId:20008,
		name:"防御力降低10",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{def:-10,//防御力def的直接 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"防御力降低10",
	},
	test2DefPercent:{
		buffId:20009,
		name:"防御力降低10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{defPercent:-0.1,//防御力def百分比的 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"防御力降低10%",
	},
	test2EpRecovery:{
		buffId:20010,
		name:"EP减少10",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{epRecovery:-10,//ep的直接 恢复量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"EP减少10",
	},
	test2EpRecoveryPercent:{
		buffId:20011,
		name:"减少当前EP10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{epRecoveryPercent:-0.1,//当前ep百分比的 直接恢复量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"减少当前EP10%",
	},
	test2EpRecoveryMaxEpPercent:{
		buffId:20012,
		name:"减少MaxEp10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{epRecoveryMaxEpPercent:-0.1,//最大maxEp百分比的恢复量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"减少MaxEp10%",
	},
	test2MaxEp:{
		buffId:20013,
		name:"MaxEp降低10",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{maxEp:-10,//最大maxEp的直接 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"MaxEp降低10",
	},
	test2MaxEpPercent:{
		buffId:20014,
		name:"MaxEp降低10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{maxEpPercent:-0.1,//最大maxEp百分比的 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"MaxEp降低10%",
	},
	test2Cri:{
		buffId:20015,
		name:"暴击率降低10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{cri:-0.1,//暴击率cri的直接 增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"暴击率降低10%",
	},
	test2CriPercent:{
		buffId:20016,
		name:"降低当前暴击率的10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{criPercent:-0.1,//暴击率cri百分比的 增加量 或 减少量（不适用skill）
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"降低当前暴击率的10%",
	},
	test2CriStrike:{
		buffId:20017,
		name:"暴击伤害降低10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{criStrike:-0.1,
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"暴击伤害降低10%",
	},
	test2CriStrikePercent:{
		buffId:20018,
		name:"降低当前暴击伤害的10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{criStrikePercent:-0.1,//暴击伤害criStrike百分比的  增加量 或 减少量（不适用skill）
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"降低当前暴击伤害的10%",
	},
	test2Avd:{
		buffId:20019,
		name:"降低闪避率10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{avd:-0.1,//闪避率avd的直接  增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"降低闪避率10%",
	},
	test2AvdPercent:{
		buffId:20020,
		name:"降低当前闪避率的10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{avdPercent:-0.1,//闪避率avd百分比的  增加量 或 减少量（不适用skill）
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"降低当前闪避率的10%",
	},
	test2Hit:{
		buffId:20021,
		name:"降低命中率10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{hit:-0.1,//命中率hit的直接  增加量 或 减少量
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"降低命中率10%",
	},
	test2HitPercent:{
		buffId:20022,
		name:"降低当前命中率的10%",
		type:BUFF.TYPE.battleBuff,
		target:BUFF.TARGET.self,
		attr:{hitPercent:-0.1,//命中率hit百分比的  增加量 或 减少量（不适用skill）
		},
		round:3,//持续回合数
		superposition:2,//可叠加数（根据buffId）
		content:"降低当前命中率的10%",
	},
};