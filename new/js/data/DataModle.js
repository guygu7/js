/*----数据模型----*/
DataModle = {
	/**
	 * 当前场景地图
	 */
	Domain : function domain () {},
	/**
	 * 可交互对象
	 */
	InteractiveObject : function interactiveObject () {},
	/**
	 * 交互动作
	 */
	Action : function action () {},
	/**
	 * 物品 
	 */
	Item : function item () {},
	/**
	 * 角色
	 */
	Role : function role () {},
	/**
	 * 技能
	 */
	Skill: function skill () {},
	/**
	 * 增益减益
	 */
	Buff: function buff () {},
};
DataModleFactory = {
	createRole:function() {
		var role = new DataModle.Role();
		/**
		 * 名称
		 */
		var name;
		role.getName = function() {
			return name;
		};
		role.setName = function(pram) {
			name = pram;
			return this;
		};
		/**
		 * 状态
		 */
		var status;
		role.getStatus = function() {
			return status;
		};
		role.setStatus = function(pram) {
			status = pram;
			return this;
		};
		/**
		 * 第二状态
		 */
		var status2;
		role.getStatus2 = function() {
			return status2;
		};
		role.setStatus2 = function(pram) {
			status2 = pram;
			return this;
		};
		
		/**
		 * 角色当前HP
		 */
		var Hp=100;
		role.getHp  = function() {
			return Hp;
		};
		role.setHp = function(pram) {
			if(!isNaN(Number(pram))){
				Hp = Math.round(Number(pram));//舍去小数
				var tempMaxHp = this.getMaxHp();
				if(Hp>tempMaxHp){
					Hp=tempMaxHp;
				}
				if(Hp<0){Hp=0;}
			}
			return this;
		};
		
		/**
		 * 计算属性数值
		 */
		function compute (attrType,baseAttrType) {
			var nowAttrType = 0;
			var tempAttrType=0;//直接加成
			var tempAttrTypePercent=0;//百分比
			//遍历角色技能加成
			var unActiveSkills = role.getSkills(SKILL.TYPE.unActive);//获取到非主动技能
			if (unActiveSkills&&unActiveSkills.length>0){
				for (var i=0; i < unActiveSkills.length; i++) {
					var tempAttr = unActiveSkills[i].getAttr();
					//判断attr存在
					if(tempAttr&&tempAttr!=undefined&&tempAttr!=null){
						//判断获取到的hp属性为数字
						if(attrType in tempAttr
							//&&tempAttr[attrType]!=undefined
							//&&tempAttr[attrType]!=null
							&& typeof Number(tempAttr[attrType])=="number" 
							&& typeof Number(tempAttr[attrType])!=NaN){
							tempAttrType+=Number(tempAttr[attrType]);
						}
						//判断获取到的defPercent属性为数字
						if((attrType+"Percent") in tempAttr
							//&&tempAttr[(attrType+"Percent")]!=undefined
							//&&tempAttr[(attrType+"Percent")]!=null
							&& typeof Number(tempAttr[(attrType+"Percent")])=="number"
							&& typeof Number(tempAttr[(attrType+"Percent")])!=NaN){
							tempAttrTypePercent+=Number(tempAttr[(attrType+"Percent")]);
						}
					}
				};
			}
			//遍历所有已装备物品
			for (var i=0; i < items.length; i++) {
				//判断是装备，且已装备上
				if(items[i].getType()==ITEM.TYPE.equip&&items[i].getIsPutOn()==true){
					//判断attr存在
					var tempAttr = items[i].getAttr();
					if(tempAttr&&tempAttr!=undefined&&tempAttr!=null){
						//判断获取到的hp属性为数字
						if(attrType in tempAttr&&tempAttr[attrType]!=undefined
							//&&tempAttr[attrType]!=null
							//&& typeof Number(tempAttr[attrType])=="number"
							&& typeof Number(tempAttr[attrType])!=NaN){
							tempAttrType+=Number(tempAttr[attrType]);
						}
						//判断获取到的defPercent属性为数字
						if((attrType+"Percent") in tempAttr
							//&&tempAttr[(attrType+"Percent")]!=undefined
							//&&tempAttr[(attrType+"Percent")]!=null
							&& typeof Number(tempAttr[(attrType+"Percent")])=="number"
							&& typeof Number(tempAttr[(attrType+"Percent")])!=NaN){
							tempAttrTypePercent+=Number(tempAttr[(attrType+"Percent")]);
						}
					}
				}
			};
			var tempBuffAttrType=0;//buff直接加成
			var tempBuffAttrTypePercent=0;//buff百分比
			//遍历buff加成，包括增益减益
			for (var i=0; i < buffs.length; i++) {
				var tempAttr = buffs[i].getAttr();
				if (tempAttr&&tempAttr!=undefined&&tempAttr!=null) {
					if(attrType in tempAttr
						//&&tempAttr[attrType]!=undefined
						//&&tempAttr[attrType]!=null
						&& typeof Number(tempAttr[attrType])=="number"
						&& typeof Number(tempAttr[attrType])!=NaN){
						tempBuffAttrType+=Number(tempAttr[attrType]);
					}
					//判断获取到的defPercent属性为数字
					if((attrType+"Percent") in tempAttr
						//&&tempAttr[(attrType+"Percent")]!=undefined
						//&&tempAttr[(attrType+"Percent")]!=null
						&& typeof Number(tempAttr[(attrType+"Percent")])=="number"
						&& typeof Number(tempAttr[(attrType+"Percent")])!=NaN){
						tempBuffAttrTypePercent+=Number(tempAttr[(attrType+"Percent")]);
					}
				};
			};
			//计算顺序:基础>技能百分比加成+装备百分比加成>技能直接加成+装备直接加成
			nowAttrType = Number(baseAttrType)+ Number(baseAttrType)*tempAttrTypePercent+tempAttrType;
			//计算buff加成:先计算百分比，后计算直接加成
			return nowAttrType+nowAttrType*tempBuffAttrTypePercent+tempBuffAttrType;
		}
		
		/**
		 * 角色基础MaxHP
		 */
		var baseMaxHp=100;
		role.getBaseMaxHp  = function() {
			return baseMaxHp;
		};
		role.setBaseMaxHp = function(pram) {
			if(!isNaN(Number(pram))){
				baseMaxHp = Number(pram);
			}
			return this;
		};
		/**
		 * 角色最大HP（包含计算加成）
		 * 计算顺序:基础>技能百分比+装备百分比>技能直接加成+装备直接加成
		 */
		role.getMaxHp  = function() {
			return compute("maxHp",baseMaxHp);
		};
		
		
		/**
		 * 角色基础Att
		 */
		var baseAtt;
		role.getBaseAtt  = function() {
			return baseAtt;
		};
		role.setBaseAtt = function(pram) {
			if(!isNaN(Number(pram))){
				baseAtt = Number(pram);
			}
			return this;
		};
		/**
		 * 角色当前Att
		 */
		role.getAtt  = function() {
			return compute("att",baseAtt);
		};
		
		
		/**
		 * 角色基础Def
		 */
		var baseDef;
		role.getBaseDef  = function() {
			return baseDef;
		};
		role.setBaseDef = function(pram) {
			baseDef = pram;
			return this;
		};
		/**
		 * 角色当前Def
		 */
		role.getDef  = function() {
			return compute("def",baseDef);
		};
		
		
		/**
		 * 角色基础Cri(暴击率)
		 */
		var baseCri;
		role.getBaseCri  = function() {
			return baseCri;
		};
		role.setBaseCri = function(pram) {
			baseCri = pram;
			return this;
		};
		/**
		 * 角色当前Cri
		 */
		role.getCri  = function() {
			return compute("cri",baseCri);
		};
		
		
		/**
		 * 角色基础criStrike(暴击伤害)
		 */
		var baseCriStrike;
		role.getBaseCriStrike  = function() {
			return baseCriStrike;
		};
		role.setBaseCriStrike = function(pram) {
			baseCriStrike = pram;
			return this;
		};
		/**
		 * 角色当前CriStrike
		 */
		role.getCriStrike  = function() {
			return compute("criStrike",baseCriStrike);
		};
		
		
		/**
		 * 角色基础Avd(闪避率)
		 */
		var baseAvd;
		role.getBaseAvd  = function() {
			return baseAvd;
		};
		role.setBaseAvd = function(pram) {
			baseAvd = pram;
			return this;
		};
		/**
		 * 角色当前Avd
		 */
		role.getAvd  = function() {
			return compute("avd",baseAvd);
		};
		
		
		/**
		 * 角色基础Hit(命中率)
		 */
		var baseHit;
		role.getBaseHit  = function() {
			return baseHit;
		};
		role.setBaseHit = function(pram) {
			baseHit = pram;
			return this;
		};
		/**
		 * 角色当前Hit
		 */
		role.getHit  = function() {
			return compute("hit",baseHit);
		};
		
		
		/**
		 * 所有技能
		 */
		var skills=[];
		role.getSkill = function(num){
			return skills[num];
		};
		role.getSkills = function(pram){
			if(pram&&pram!=null&&pram!=undefined){
				var tempSkills = skills.slice(0);
				if (pram==SKILL.TYPE.active) {//判断传参是"active",只获取主动技能
					for (var i=0; i < tempSkills.length; i++) {
						if(tempSkills[i].getType()!=SKILL.TYPE.active){
							//遍历到非主动技能，去掉
							tempSkills.splice(i,1);
							i--;
						}
					};
				}else if(pram==SKILL.TYPE.unActive){//判断传参是"unActive",只获取非主动技能
					for (var i=0; i < tempSkills.length; i++) {
						if(tempSkills[i].getType()!=SKILL.TYPE.unActive){
							//遍历，去掉
							tempSkills.splice(i,1);
							i--;
						}
					};
				}
				return tempSkills;
			}
			return skills;
		};
		/**
		 * 传参：Skill对象
		 */
		role.addSkill = function(pram){
			if(!skills){
				skills = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="skill"){
				//判断传入参数不为空 且是 skill对象
				skills.push(pram);
			}
			return this;						
		};
		/**
		 * 传参：Number 或   Skill对象
		 */
		role.delSkill = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				skills.splice(pram,1);
			} else {
				for (var i=0; i < skills.length; i++) {
					if(skills[i] == pram){
						skills.splice(i,1);
					};
				};
			};
			return this;
		};
		
		
		/**
		 * 增益减益
		 */
		var buffs=[];
		role.getBuff = function(num){
			return buffs[num];
		};
		role.getBuffs = function(pram){
			return buffs;
		};
		role.addBuff = function(pram){
			if(!buffs){
				buffs = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="buff"){
				//判断传入参数不为空 且是 buff对象
				//校验buff的堆叠
				var superposition = 0;
				var tempArr=[];
				for (var i=0; i < buffs.length; i++) {
					if(compareBuff(pram,buffs[i])){//判断为同一种
						superposition++;//堆叠+1
						tempArr.push(buffs[i]);//暂存进数组
					}else{
						//判断是不是同一种buff但是同一ID,替换
						if(pram.getBuffId() == buffs[i].getId()){
							superposition++;//堆叠+1
							this.delBuff(buffs[i]);//去掉之前的
						}
					}
				};
				if(superposition>=pram.getSuperposition()){//判断堆叠已超出
					//去掉剩余时间最短的一个
					var tempRound=tempArr[0];
					for (var i=0; i < tempArr.length; i++) {
						if(tempRound.getRound()>tempArr[i].getRound()){
							tempRound=tempArr[i];
						}
					};
					this.delBuff(tempRound);
				}//堆叠未超出直接加入
				buffs.push(pram);
			}
			return this;						
		};
		/**
		 * 传参：Number 或   Buff对象
		 */
		role.delBuff = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				buffs.splice(pram,1);
			} else {
				for (var i=0; i < buffs.length; i++) {
					if(buffs[i] === pram){
						buffs.splice(i,1);
					};
				};
			};
			return this;
		};
		/**
		 * 清空增益减益
		 */
		role.clearBuffs = function() {
			buffs = [];
			return this;
		};
		
		
		/**
		 * 所有物品数据（价格）
		 */
		var itemInfos;
		role.getItemInfo = function(num){
			return itemInfos[num];
		};
		role.getItemInfos = function(){
			return itemInfos;
		};
		/**
		 * 传参：Item对象
		 */
		role.addItemInfo = function(pram){
			if(!itemInfos){
				itemInfos = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="item"){
				//判断传入参数不为空 且是 item 对象
				itemInfos.push(pram);
			}
			return this;						
		};
		/**
		 * 传参：Number 或   Item对象
		 */
		role.delItemInfo = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				itemInfos.splice(pram,1);
			} else {
				for (var i=0; i < itemInfos.length; i++) {
					if(itemInfos[i] === pram){
						itemInfos.splice(i,1);
					};
				};
			};
			return this;
		};
		
		
		/**
		 * 所有物品
		 */
		var items=[];
		role.getItem = function(num){
			return items[num];
		};
		/**
		 * 传参："useRoleBag-Consumable":过滤出消耗品 ; "useRoleBag-Equip":过滤出装备
		 */
		role.getItems = function(pram){
			if(pram&&items&&items.length>0){
				var tempItems = items.slice(0);
				if(pram=="useRoleBag-Consumable"){
					//判断是只显示消耗品
					for (var i=0; i < tempItems.length; i++) {
						if(tempItems[i].getType()!=ITEM.TYPE.consumable){
							//遍历到非消耗品类型，去掉
							tempItems.splice(i,1);
							i--;
						}
					};
				}else if(pram=="useRoleBag-Equip"){
					//判断是只显示装备
					for (var i=0; i < tempItems.length; i++) {
						if(tempItems[i].getType()!=ITEM.TYPE.equip){
							//遍历到非消耗品类型，去掉
							tempItems.splice(i,1);
							i--;
						}
					};
				}
				return tempItems;
			}
			return items;
		};
		role.addItem = function(pram){
			if(!items){
				items = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="item"){
				//判断传入参数不为空  且是 item 对象
				//修改Item中某些值为默认值
				//遍历对比传入的item和itemInfos中的Item，遍历出对应的Item信息
					var tempItemInfos = this.getItemInfos();
					for (var i=0; i < tempItemInfos.length; i++) {
						if (compareItem(pram,tempItemInfos[i])) {
							//清除原有Actions
							pram.clearActions();
							//将角色Item信息中的Actions存入传参物品
							var tempActions = tempItemInfos[i].getActions();
							for (var k=0; k < tempActions.length; k++) {
								pram.addAction(tempActions[k]);
							};
							break;
						};
					};
				pram.supper = this;
				items.push(pram);
			}
			return this;						
		};
		/**
		 * 传参：Number 或   Item对象
		 */
		role.delItem = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				items.splice(pram,1);
			} else {
				for (var i=0; i < items.length; i++) {
					if(items[i] === pram){
						items.splice(i,1);
					};
				};
			};
			return this;
		};
		
		return role;
	},
	createDomain:function() {
		var domain = new DataModle.Domain();
		/**
		 * 名称 
		 */
		var name;
		domain.getName = function() {
			return name;
		};
		domain.setName = function(pram) {
			name = pram;
			return this;
		};
		/**
		 * 标识ID
		 */
		var signId;
		domain.getSignId = function() {
			return signId;
		};
		domain.setSignId = function(pram) {
			signId = pram;
			return this;
		};
		/**
		 * Type Array [class InteractiveObject]
		 * 可交互对象
		 */
		var interactiveObjects=[];
		domain.getInteractiveObject = function(num) {
			return interactiveObjects[num];
		};
		domain.getInteractiveObjects = function() {
			return interactiveObjects;
		};
		domain.addInteractiveObject = function(pram){
			if(!interactiveObjects){
				interactiveObjects = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="interactiveObject"){
				//判断传入参数不为空 且是 interactiveObject 对象
				pram.supper = this;
				interactiveObjects.push(pram);
			}
			return this;
		};
		/**
		 * 传参：Number 或   interactiveObject对象
		 */
		domain.delInteractiveObject = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				interactiveObjects.splice(pram,1);
			} else {
				for (var i=0; i < interactiveObjects.length; i++) {
					if(interactiveObjects[i] === pram){
						interactiveObjects.splice(i,1);
					};
				};
			};
			return this;
		};
		/**
		 * 所有物品数据（价格）
		 */
		var itemInfos=[];
		domain.getItemInfo = function(num){
			return itemInfos[num];
		};
		domain.getItemInfos = function(){
			return itemInfos;
		};
		/**
		 * 传参：Item对象
		 */
		domain.addItemInfo = function(pram){
			if(!itemInfos){
				itemInfos = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="item"){
				//判断传入参数不为空 且是 item 对象
				itemInfos.push(pram);
			}
			return this;						
		};
		/**
		 * 传参：Number 或   Item对象
		 */
		domain.delItemInfo = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				itemInfos.splice(pram,1);
			} else {
				for (var i=0; i < itemInfos.length; i++) {
					if(itemInfos[i] === pram){
						itemInfos.splice(i,1);
					};
				};
			};
			return this;
		};
		/**
		 * 清除当前对象全部数据 
		 */
		domain.clear = function(){
			this.setName(null);
			this.setSignId(null);
			this.getInteractiveObjects().splice(0,interactiveObjects.length);
			this.getItemInfos.splice(0,itemInfo.length);
		};
		return domain;
	},
	createInteractiveObject:function() {
		var interactiveObject = new DataModle.InteractiveObject();
		/**
		 * 显示名称 
		 */
		var name;
		interactiveObject.getName = function() {
			return name;
		};
		interactiveObject.setName = function(pram) {
			name = pram;
			return this;
		};
		var Hp=100;
		interactiveObject.getHp  = function() {
			return Hp;
		};
		interactiveObject.setHp = function(pram) {
			if(!isNaN(Number(pram))){
				Hp = Number(pram);
			}
			return this;
		};
		
		/**
		 * 计算属性数值
		 */
		function compute (attrType,baseAttrType) {
			var tempBuffAttrType=0;//buff直接加成
			var tempBuffAttrTypePercent=0;//buff百分比
			//遍历buff加成，包括增益减益
			if (typeof buffs!="undefined") {
				for (var i=0; i < buffs.length; i++) {
					var tempAttr = buffs[i].getAttr();
					if (tempAttr&&tempAttr!=undefined&&tempAttr!=null) {
						if(attrType in tempAttr
							//&&tempAttr[attrType]!=undefined
							//&&tempAttr[attrType]!=null
							&& typeof Number(tempAttr[attrType])=="number"
							&& typeof Number(tempAttr[attrType])!=NaN){
							tempBuffAttrType+=Number(tempAttr[attrType]);
						}
						//判断获取到的defPercent属性为数字
						if((attrType+"Percent") in tempAttr
							//&&tempAttr[(attrType+"Percent")]!=undefined
							//&&tempAttr[(attrType+"Percent")]!=null
							&& typeof Number(tempAttr[(attrType+"Percent")])=="number"
							&& typeof Number(tempAttr[(attrType+"Percent")])!=NaN){
							tempBuffAttrTypePercent+=Number(tempAttr[(attrType+"Percent")]);
						}
					};
				};
			};
			//计算buff加成:先计算百分比，后计算直接加成
			return Number(baseAttrType)+Number(baseAttrType)*tempBuffAttrTypePercent+tempBuffAttrType;
		}
		
		/**
		 * 基础MaxHP
		 */
		var MaxHp=100;
		/**
		 * MaxHP（包含计算加成）
		 */
		interactiveObject.getMaxHp  = function() {
			return compute("maxHp",MaxHp);
		};
		interactiveObject.setMaxHp = function(pram) {
			if(!isNaN(Number(pram))){
				MaxHp = Number(pram);
			}
			return this;
		};
		
		/**
		 * 基础Att
		 */
		var Att=1;
		/**
		 * 当前Att（包含计算加成）
		 */
		interactiveObject.getAtt  = function() {
			return compute("att",Att);
		};
		interactiveObject.setAtt = function(pram) {
			if(!isNaN(Number(pram))){
				Att = Number(pram);
			}
			return this;
		};
		
		/**
		 * 基础Def
		 */
		var Def=1;
		/**
		 * 当前Def（包含计算加成）
		 */
		interactiveObject.getDef  = function() {
			return compute("def",Def);
		};
		interactiveObject.setBaseDef = function(pram) {
			Def = pram;
			return this;
		};
		
		/**
		 * 角色基础Cri(暴击率)
		 */
		var Cri=0;
		/**
		 * 当前Cri（包含计算加成）
		 */
		interactiveObject.getCri  = function() {
			return compute("cri",baseCri);
		};
		interactiveObject.setCri = function(pram) {
			Cri = pram;
			return this;
		};
		
		/**
		 * 基础criStrike(暴击伤害)
		 */
		var CriStrike=1;
		/**
		 * 当前CriStrike（包含计算加成）
		 */
		interactiveObject.getCriStrike  = function() {
			return compute("criStrike",CriStrike);
		};
		interactiveObject.setCriStrike = function(pram) {
			CriStrike = pram;
			return this;
		};
		
		/**
		 * 基础Avd(闪避率)
		 */
		var Avd=0;
		/**
		 * 当前Avd（包含计算加成）
		 */
		interactiveObject.getAvd  = function() {
			return compute("avd",Avd);
		};
		interactiveObject.setAvd = function(pram) {
			Avd = pram;
			return this;
		};
		
		/**
		 * 基础Hit(命中率)
		 */
		var Hit=0;
		/**
		 * 当前Hit（包含计算加成）
		 */
		interactiveObject.getHit  = function() {
			return compute("hit",Hit);
		};
		interactiveObject.setHit = function(pram) {
			Hit = pram;
			return this;
		};
		
		
		/**
		 * 交互动作
		 */
		var actions=[];
		interactiveObject.getAction = function(num){
			return actions[num];
		};
		interactiveObject.getActions = function(){
			return actions;
		};
		interactiveObject.addAction = function(pram){
			if(!actions){
				actions = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="action"){
				//判断传入参数不为空 且是 action 对象
				actions.push(pram);
			}
			return this;
		};
		/**
		 * 传参：Number 或   Action对象
		 */
		interactiveObject.delAction = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				actions.splice(pram,1);
			} else {
				for (var i=0; i < actions.length; i++) {
					if(actions[i] === pram){
						actions.splice(i,1);
					};
				};
			};
			return this;
		};
		/**
		 * 所有物品数据（价格）
		 */
		var itemInfos=[];
		interactiveObject.getItemInfo = function(num){
			return itemInfos[num];
		};
		interactiveObject.getItemInfos = function(){
			return itemInfos;
		};
		/**
		 * 传参：Item对象
		 */
		interactiveObject.addItemInfo = function(pram){
			if(!itemInfos){
				itemInfos = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="item"){
				//判断传入参数不为空 且是 item 对象
				itemInfos.push(item);
			}
			return this;						
		};
		/**
		 * 传参：Number 或   Item对象
		 */
		interactiveObject.delItemInfo = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				itemInfos.splice(pram,1);
			} else {
				for (var i=0; i < itemInfos.length; i++) {
					if(itemInfos[i] === pram){
						itemInfos.splice(i,1);
					};
				};
			};
			return this;
		};
		/**
		 * 所有物品
		 */
		var items=[];
		interactiveObject.getItem = function(num){
			return items[num];
		};
		interactiveObject.getItems = function(){
			return items;
		};
		interactiveObject.addItem = function(pram){
			if(!items){
				items = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="item"){
				//判断传入参数不为空 且是 item 对象
				//修改Item中某些值为默认值
				//依次读取itemInfos，优先级：自身>domain>全局
				var flag = false;
				function fn1 (obj){
					itemInfos = obj.getItemInfos();
					//判断itemInfo存在且不为空数组
					if(itemInfos!=null&&itemInfos!=undefined&&itemInfos.lenght>0){
						//遍历出和传入Item对应的数据
						for (var i=0; i < itemInfos.length; i++) {
							if(compareItem(pram,itemInfos[i])){
								//从中读取到对应数据，对传入的item处理
								//清除原有Actions
								pram.clearActions();
								//将角色Item信息中的Actions存入传参物品
								var tempActions = itemInfos[i].getActions();
								if (tempActions) {
									for (var k=0; k < itemInfos.length; k++) {
										if (tempActions[k]) {
											pram.addAction(tempActions[k]);
										}
									};
								};
								flag=true;//标记为已处理
								break;
							}
						};
					}
					if(!flag){
						if(obj.supper!=null&&obj.supper!=undefined){
							fn1(obj.supper);
						}else{
							itemInfos = publicItemInfo;
							//if(itemInfos&&itemInfos.lenght>0){
								//遍历出和传入Item对应的数据
								for (var i=0; i < itemInfos.length; i++) {
									if(compareItem(pram,itemInfos[i])){
										//从中读取到对应数据，对传入的item处理
										//清除原有Actions
										pram.clearActions();
										//将角色Item信息中的Actions存入传参物品
										var tempActions = itemInfos[i].getActions();
										if (tempActions) {
											for (var k=0; k < itemInfos.length; k++) {
												if (tempActions[k]) {
													pram.addAction(tempActions[k]);
												};
											};
										};
										flag=true;//标记为已处理
										break;
									}
								};
							//}
						}
					}
				}
				fn1(this);
				pram.supper = this;
				items.push(pram);
			}
			
			/**
			 * 增益减益
			 */
			var buffs=[];
			interactiveObject.getBuff = function(num){
				return buffs[num];
			};
			interactiveObject.getBuffs = function(pram){
				return buffs;
			};
			interactiveObject.addBuff = function(pram){
				if(!buffs){
					buffs = new Array();
				}
				if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="buff"){
					//判断传入参数不为空 且是 buff对象
					//校验buff的堆叠
					var superposition = 0;
					var tempArr=[];
					for (var i=0; i < buffs.length; i++) {
						if(compareBuff(pram,buffs[i])){//判断为同一种
							superposition++;//堆叠+1
							tempArr.push(buffs[i]);//暂存进数组
						}else{
							//判断是不是同一种buff但是同一ID,替换
							if(pram.getBuffId() == buffs[i].getId()){
								superposition++;//堆叠+1
								this.delBuff(buffs[i]);//去掉之前的
							}
						}
					};
					if(superposition>=pram.getSuperposition()){//判断堆叠已超出
						//去掉剩余时间最短的一个
						var tempRound=tempArr[0];
						for (var i=0; i < tempArr.length; i++) {
							if(tempRound.getRound()>tempArr[i].getRound()){
								tempRound=tempArr[i];
							}
						};
						this.delBuff(tempRound);
					}//堆叠未超出直接加入
					buffs.push(pram);
				}
				return this;						
			};
			/**
			 * 传参：Number 或   Buff对象
			 */
			interactiveObject.delBuff = function(pram) {
				if (Object.prototype.toString.call(pram)==="[object Number]") {
					buffs.splice(pram,1);
				} else {
					for (var i=0; i < buffs.length; i++) {
						if(buffs[i] === pram){
							buffs.splice(i,1);
						};
					};
				};
				return this;
			};
			/**
			 * 清空增益减益
			 */
			interactiveObject.clearBuffs = function() {
				buffs = [];
				return this;
			};
		
			
			return this;						
		};
		/**
		 * 传参：Number 或   Item对象
		 */
		interactiveObject.delItem = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				items.splice(pram,1);
			} else {
				for (var i=0; i < items.length; i++) {
					if(items[i] === pram){
						items.splice(i,1);
					};
				};
			};
			return this;
		};
		return interactiveObject;
	},
	createAction:function() {
		var action = new DataModle.Action();
		/**
		 * 显示名称 
		 */
		var name;
		action.getName = function() {
			return name;
		};
		action.setName = function(pram) {
			name = pram;
			return this;
		};
		/**
		 * 动作类型 
		 */
		var type;
		action.getType = function() {
			return type;
		};
		action.setType = function(pram) {
			type = pram;
			return this;
		};
		/**
		 * 对话内容 
		 */
		var content;
		action.getContent = function() {
			return content;
		};
		action.setContent = function(pram) {
			content = pram;
			return this;
		};
		/**
		 * 移动类型跳转目标 
		 */
		var target;
		action.getTarget = function() {
			return target;
		};
		action.setTarget = function(pram) {
			target = pram;
			return this;
		};
		return action;
	},
	createItem:function() {
		var item = new DataModle.Item();
		/**
		 * 显示名称 
		 */
		var name;
		item.getName = function() {
			return name;
		};
		item.setName = function(pram) {
			name = pram;
			return this;
		};
		/**
		 * 类型 
		 */
		var type;
		item.getType = function() {
			return type;
		};
		item.setType = function(pram) {
			type = pram;
			return this;
		};
		/**
		 * 类型2
		 */
		var type2;
		item.getType2 = function() {
			return type2;
		};
		item.setType2 = function(pram) {
			type2 = pram;
			return this;
		};
		/**
		 * 属性
		 */
		var attr;
		item.getAttr = function() {
			return attr;
		};
		item.setAttr = function(pram) {
			attr = pram;
			return this;
		};
		/**
		 * 增益减益
		 */
		var buffs=[];
		item.getBuff = function(num){
			return buffs[num];
		};
		item.getBuffs = function(pram){
			return buffs;
		};
		item.addBuff = function(pram){
			if(!buffs){
				buffs = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="buff"){
				//判断传入参数不为空 且是 buff 对象
				buffs.push(pram);
			}
			return this;						
		};
		/**
		 * 传参：Number 或   Buff对象
		 */
		item.delBuff = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				buffs.splice(pram,1);
			} else {
				for (var i=0; i < buffs.length; i++) {
					if(buffs[i] === pram){
						buffs.splice(i,1);
					};
				};
			};
			return this;
		};
		/**
		 * 清空增益减益
		 */
		item.clearBuffs = function() {
			buffs = [];
			return this;
		};
		
		/**
		 * 说明内容
		 */
		var content;
		item.getContent = function() {
			return content;
		};
		item.setContent = function(pram) {
			content = pram;
			return this;
		};
		/**
		 * 堆叠数量 
		 */
		var totalNum=0;
		item.getTotalNum = function() {
			return totalNum;
		};
		item.setTotalNum = function(pram) {
			if(!isNaN(Number(pram))){
				totalNum = Number(pram);
			}
			return this;
		};
		/**
		 * 卖出价 
		 */
		var sellCost=0;
		item.getSellCost = function() {
			return sellCost;
		};
		item.setSellCost = function(pram) {
			if(!isNaN(Number(pram))){
				sellCost = Number(pram);
			}
			return this;
		};
		/**
		 * 购入价
		 */
		var buyCost=9999;
		item.getBuyCost = function() {
			return buyCost;
		};
		item.setBuyCost = function(pram) {
			if(!isNaN(Number(pram))){
				buyCost = Number(pram);
			}
			return this;
		};
		/**
		 * 是否已装备
		 */
		var isPutOn;
		item.getIsPutOn = function() {
			return isPutOn;
		};
		item.setIsPutOn = function(pram) {
			if(pram==true||pram==false){
				isPutOn = pram;
			}
			return this;
		};
		/**
		 * 交互动作
		 */
		var actions=[];
		item.getAction = function(num){
			return actions[num];
		};
		/**
		 * 根据传参过滤 
		 */
		item.getActions = function(pram){
			//判断父对象是role
			if(this.supper&&this.supper.constructor==DataModle.Role){
				if ("useRoleBag"==pram) {//判断是使用包裹，过滤掉堆叠的动作
					tempActions = actions.slice(0);
					//用于对比的堆叠动作
					var action = loadData(dictionaryData.action.role_itemToInteractiveObject,"action");
					//用于对比的穿上装备选项
					var action4 = loadData(dictionaryData.action.role_putOn,"action");
					//用于对比的卸下装备选项
					var action5 = loadData(dictionaryData.action.role_takeOff,"action");
					//用于对比的显示已装备选项
					var action6 = loadData(dictionaryData.action.role_alreadyEquipped,"action");
					for (var i=0; i < tempActions.length; i++) {
						//对比出堆叠动作，去掉
						if(compareAction(tempActions[i],action)){
							tempActions.splice(i,1);
							i--;
						}else if(compareAction(tempActions[i],action6)) {
							//对比去掉显示已装备选项
							tempActions.splice(i,1);
							i--;
						}else{
							//判断是否有装备属性
							if(isPutOn==null||isPutOn==undefined){
							}else if(isPutOn==true){
								//判断为已装备，去掉穿上装备选项
								if(compareAction(tempActions[i],action4)){
									tempActions.splice(i,1);
									i--;
								}
							}else if(isPutOn==false){
								//判断为已装备，去掉卸下装备选项
								if(compareAction(tempActions[i],action5)){
									tempActions.splice(i,1);
									i--;
								}
							}
						}
					};
					return tempActions;
				}else if("transaction"==pram||"useWarehouse"==pram){//判断是交易或使用仓库，只取出堆叠动作
					//判断是否有装备属性
					if(isPutOn==null||isPutOn==undefined||isPutOn==false){
						//未装备，没有该属性，则不为装备，只取出堆叠动作
						tempActions = actions.slice(0);
						var action = loadData(dictionaryData.action.role_itemToInteractiveObject,"action");
						for (var i=0; i < tempActions.length; i++) {
							if(compareAction(tempActions[i],action)){
								tempActions = [tempActions[i]];
							};
						};
					}else if(isPutOn==true){
						//已装备，不可交易，只取出显示已装备选项
						tempActions = actions.slice(0);
						var action = loadData(dictionaryData.action.role_alreadyEquipped,"action");
						for (var i=0; i < tempActions.length; i++) {
							if(compareAction(tempActions[i],action)){
								tempActions = [tempActions[i]];
							};
						};
					}
					return tempActions;
				};
			}
			return actions;
		};
		item.addAction = function(pram){
			if(!actions){
				actions = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="action"){
				//判断传入参数不为空 且是 action 对象
				actions.push(pram);
			}
			return this;						
		};
		/**
		 * 传参：Number 或   Action对象
		 */
		item.delAction = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				actions.splice(pram,1);
			} else {
				for (var i=0; i < actions.length; i++) {
					if(actions[i] === pram){
						actions.splice(i,1);
					};
				};
			};
			return this;
		};
		/**
		 * 清空交互动作
		 */
		item.clearActions = function() {
			actions = [];
			return this;
		};
		return item;
	},
	createSkill:function() {
		var skill = new DataModle.Skill();
		/**
		 * 显示名称 
		 */
		var name;
		skill.getName = function() {
			return name;
		};
		skill.setName = function(pram) {
			name = pram;
			return this;
		};
		/**
		 * 说明 
		 */
		var content;
		skill.getContent = function() {
			return content;
		};
		skill.setContent = function(pram) {
			content = pram;
			return this;
		};
		/**
		 * 类型 
		 */
		var type;
		skill.getType = function() {
			return type;
		};
		skill.setType = function(pram) {
			type = pram;
			return this;
		};
		/**
		 * 第二类型 
		 */
		var type2;
		skill.getType2 = function() {
			return type2;
		};
		skill.setType2 = function(pram) {
			type2 = pram;
			return this;
		};
		/**
		 * 效果
		 */
		var attr;
		skill.getAttr = function() {
			return attr;
		};
		skill.setAttr = function(pram) {
			attr = pram;
			return this;
		};
		/**
		 * 增益减益
		 */
		var buffs=[];
		skill.getBuff = function(num){
			return buffs[num];
		};
		skill.getBuffs = function(pram){
			return buffs;
		};
		skill.addBuff = function(pram){
			if(!buffs){
				buffs = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="buff"){
				//判断传入参数不为空 且是 buff 对象
				buffs.push(pram);
			}
			return this;						
		};
		/**
		 * 传参：Number 或   Buff对象
		 */
		skill.delBuff = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				buffs.splice(pram,1);
			} else {
				for (var i=0; i < buffs.length; i++) {
					if(buffs[i] === pram){
						buffs.splice(i,1);
					};
				};
			};
			return this;
		};
		return skill;
	},
	createBuff:function() {
		var buff = new DataModle.Buff();
		/**
		 * buffId 用于判断是否为同种类型（覆盖、叠加）
		 */
		var buffId;
		buff.getBuffId = function() {
			return buffId;
		};
		buff.setBuffId = function(pram) {
			buffId = pram;
			return this;
		};
		/**
		 * 显示名称 
		 */
		var name;
		buff.getName = function() {
			return name;
		};
		buff.setName = function(pram) {
			name = pram;
			return this;
		};
		/**
		 * 说明 
		 */
		var content;
		buff.getContent = function() {
			return content;
		};
		buff.setContent = function(pram) {
			content = pram;
			return this;
		};
		/**
		 * 类型 
		 */
		var type;
		buff.getType = function() {
			return type;
		};
		buff.setType = function(pram) {
			type = pram;
			return this;
		};
		/**
		 * 属性
		 */
		var attr;
		buff.getAttr = function() {
			return attr;
		};
		buff.setAttr = function(pram) {
			attr = pram;
			return this;
		};
		/**
		 * 持续回合数
		 */
		var round=1;
		buff.getRound = function() {
			return round;
		};
		buff.setRound = function(pram) {
			if(!isNaN(Number(pram))){
				round = Number(pram);
			}
			return this;
		};
		/**
		 * 可叠加次数
		 */
		var superposition=1;
		buff.getSuperposition = function() {
			return superposition;
		};
		buff.setSuperposition = function(pram) {
			if(!isNaN(Number(pram))){
				superposition =  Number(pram);
			}
			return this;
		};
		return buff;
	},
};
DataModleFactory.createItemInfo = DataModleFactory.createItem;
/**
 * 复制buff对象
 * @param {Object} buff
 */
function copyBuff(buff){
	tempbuff = DataModleFactory.createBuff();
	tempbuff.setName(buff.getName())
			.setContent(buff.getContent())
			.setType(buff.getType())
			.setAttr(buff.getAttr())
			.setRound(buff.getRound())
			.setSuperposition(buff.getSuperposition());
	return tempbuff;
};
