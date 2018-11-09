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
	/**
	 * 任务
	 */
	Mission:function mission () {},
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
		 * 最大包裹空间
		 */
		var bagSpace=10;
		role.getBagSpace = function() {
			return bagSpace;
		};
		role.setBagSpace = function(pram) {
			if(!isNaN(Number(pram))){
				bagSpace = Number(pram);
			}
			return this;
		};
		/**
		 * 获取当前已使用空间
		 */
		role.getOccupySpace = function() {
			var num = 0;
			for (var i=0; i < items.length; i++) {
				if(!isNaN(Number(items[i].getTotalNum()))){
					if(!isNaN(Number(items[i].getBagSpace()))){
						num += (Number(items[i].getTotalNum())*Number(items[i].getBagSpace()));
					}else{
						num += Number(items[i].getTotalNum());
					}
				}
			};
			return num;
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
							&& typeof !isNaN(Number(tempAttr[attrType]))){
							tempAttrType+=Number(tempAttr[attrType]);
						}
						//判断获取到的defPercent属性为数字
						if((attrType+"Percent") in tempAttr
							//&&tempAttr[(attrType+"Percent")]!=undefined
							//&&tempAttr[(attrType+"Percent")]!=null
							&& typeof Number(tempAttr[(attrType+"Percent")])=="number"
							&& typeof !isNaN(Number(tempAttr[(attrType+"Percent")]))){
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
							&& typeof !isNaN(Number(tempAttr[attrType]))){
							tempAttrType+=Number(tempAttr[attrType]);
						}
						//判断获取到的defPercent属性为数字
						if((attrType+"Percent") in tempAttr
							//&&tempAttr[(attrType+"Percent")]!=undefined
							//&&tempAttr[(attrType+"Percent")]!=null
							&& typeof Number(tempAttr[(attrType+"Percent")])=="number"
							&& typeof !isNaN(Number(tempAttr[(attrType+"Percent")]))){
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
						&& typeof !isNaN(Number(tempAttr[attrType]))){
						tempBuffAttrType+=Number(tempAttr[attrType]);
					}
					//判断获取到的defPercent属性为数字
					if((attrType+"Percent") in tempAttr
						//&&tempAttr[(attrType+"Percent")]!=undefined
						//&&tempAttr[(attrType+"Percent")]!=null
						&& typeof Number(tempAttr[(attrType+"Percent")])=="number"
						&& typeof !isNaN(Number(tempAttr[(attrType+"Percent")]))){
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
		 * 角色基础MaxEP
		 */
		var baseMaxEp=100;
		role.getBaseMaxEp  = function() {
			return baseMaxEp;
		};
		role.setBaseMaxEp = function(pram) {
			if(!isNaN(Number(pram))){
				baseMaxEp = Number(pram);
			}
			return this;
		};
		/**
		 * 角色最大EP（包含计算加成）
		 * 计算顺序:基础>技能百分比+装备百分比>技能直接加成+装备直接加成
		 */
		role.getMaxEp  = function() {
			return compute("maxEp",baseMaxEp);
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
		 * 角色当前EP
		 */
		var Ep=100;
		role.getEp  = function() {
			return Ep;
		};
		role.setEp = function(pram) {
			if(!isNaN(Number(pram))){
				Ep = Math.round(Number(pram));//舍去小数
				var tempMaxEp = this.getMaxEp();
				if(Ep>tempMaxEp){
					Ep=tempMaxEp;
				}
				if(Ep<0){Ep=0;}
			}
			return this;
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
			if(!isNaN(Number(pram))){
				baseDef = pram;
			}
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
			if(!isNaN(Number(pram))){
				baseCri = pram;
			}
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
			if(!isNaN(Number(pram))){
				baseCriStrike = pram;
			}
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
			if(!isNaN(Number(pram))){
				baseAvd = pram;
			}
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
			if(!isNaN(Number(pram))){
				baseHit = pram;
			}
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
			//获取技能模型中的技能安装情况
			function fn(){
				tempCurrentSkillChain = currentSkillChain.slice(0);
				for (var i=0; i < items.length; i++) {
					if(items[i].getIndex()==tempCurrentSkillChain[0].index){
						//items[i]//D4
						tempCurrentSkillChain[0].item = items[i];
						for (var i2=0; i2 < tempCurrentSkillChain[0].link.length; i2++) {
							for (var j=0; j < items.length; j++) {
								if(items[j].getIndex()==tempCurrentSkillChain[0].link[i2].index){
									//items[j]//第一圈
									tempCurrentSkillChain[0].link[i2].item = items[j];
									break;
								}
							};
							for (var i3=0; i3 < tempCurrentSkillChain[0].link[i2].link.length; i3++) {
								for (var j2=0; j2 < items.length; j2++) {
									if(items[j2].getIndex()==tempCurrentSkillChain[0].link[i2].index){
										//items[j2]//第2圈
										tempCurrentSkillChain[0].link[i2].link[i3].item = items[j2];
										break;
									}
								};
								for (var i4=0; i4 < tempCurrentSkillChain[0].link[i2].link[i3].link.length; i4++) {
									for (var j3=0; j3 < items.length; j3++) {
										if(items[j3].getIndex()==tempCurrentSkillChain[0].link[i2].link[i3].index){
											//items[j3]//第3圈
											tempCurrentSkillChain[0].link[i2].link[i3].link[i4].item = items[j3];
											break;
										}
									};
								};
							};
						};
						break;
					}
				};
				return tempCurrentSkillChain;
			}
			var tempCurrentSkillChain = fn();
			//获取当前技能链技能
			var skillArr = [];
			var item0 = null;
			if(tempCurrentSkillChain[0].item!=null){
				var item0 = tempCurrentSkillChain[0].item;
				//读取中心位置
				skillArr.push([item0]);
			}
			for (var i=0; i < tempCurrentSkillChain[0].link.length; i++) {
				//读取第一圈
				var item1 = tempCurrentSkillChain[0].link[i].item;
				var tempArr = null;
				if(item1!=null&&item1!=undefined){
					if (item0!=null&&item0!=undefined) {
						tempArr = [item0,item1];
					}else{
						tempArr = [item1];
					}
					skillArr.push(tempArr);
				}
				for (var i2=0; i2 < tempCurrentSkillChain[0].link[i].link.length; i2++) {
					//读取第二圈
					var item2 = tempCurrentSkillChain[0].link[i].link[i2].item;
					var tempArr2 = null;
					if(item2!=null&&item2!=undefined){
						if(tempArr!=null){
							tempArr2 = tempArr.push(item2);
						}
					}
					skillArr.push(tempArr2);
					for (var i3=0; i3 < tempCurrentSkillChain[0].link[i].link[i2].link.length; i3++) {
						//读取第三圈
						var item3 = tempCurrentSkillChain[0].link[i].link[i2].link[i3].item;
						var tempArr3 = null;
						if(item3!=null&&item3!=undefined){
						if(tempArr2!=null){
							tempArr3 = tempArr2.push(item3);
						}
					}
				};
			};
			//=====skillArr[]技能链获取完毕======
			//解析技能链获取技能
			skillAttrArr = [];
			for (var i=0; i < skillArr.length; i++) {
				//遍历每一条技能链
				var attr={skill1:0,skill2:0};
				for (var j=0; j < skillArr[i].length; j++) {
					//遍历技能链中每一个元素
					var tempAttr = skillArr[i][j].getAttr();
					if(!isNaN(Number(tempAttr.skill1))){
						attr.skill1 += Number(tempAttr.skill1);
					}
					if(!isNaN(Number(tempAttr.skill1))){
						attr.skill2 += Number(tempAttr.skill2);
					}
				};
				skillAttrArr.push(attr);
			};
			//skillAttrArr去重
			//获取技能
			in
			//============================
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
				//任务校验
				checkMissionsFn();
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
			//任务校验
			checkMissionsFn();
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
						if(pram.getBuffId() == buffs[i].getBuffId()){
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
		role.getItem = function(num,type){
			if(type=="useRoleBag-Equip"){
				for (var i=0; i < items.length; i++) {
					if (items[i].getType()==ITEM.TYPE.equip && items[i].getType2()==num && items[i].getIsPutOn()==true) {
						return items[i];
					};
				};
				return null;
			}else if(type=="useRoleBag-SkillUnit"){
				for (var i=0; i < items.length; i++) {
					if (items[i].getType()==ITEM.TYPE.skillUnit && items[i].getIndex()==num) {
						return items[i];
					};
				};
				return null;
			}
			return items[num];
		};
		/**
		 * 传参："useRoleBag-Consumable":过滤出消耗品 ; "useRoleBag-Equip":过滤出装备; "useRoleBag-SkillUnit"过滤出技能单元
		 * type2num:装备位置
		 */
		role.getItems = function(pram,type2num){
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
							//遍历到非装备类型，去掉
							tempItems.splice(i,1);
							i--;
						}else if(type2num!=undefined&&type2num!=null&&tempItems[i].getType2()!=type2num){
							//判断有传入装备类型，且不是该装备类型，去掉
							tempItems.splice(i,1);
							i--;
						}
					};
				}else if(pram=="useRoleBag-SkillUnit"){
					//判断是只显示技能模块
					for (var i=0; i < tempItems.length; i++) {
						if(tempItems[i].getType()!=ITEM.TYPE.skillUnit){
							//遍历到非技能单元类型，去掉
							tempItems.splice(i,1);
							i--;
						}else if(tempItems[i].getIndex()!=null&&tempItems[i].getIndex()!=undefined&&tempItems[i].getIndex()!=""){
							//遍历到已经安装的技能单元，去掉
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
			/*---增加对任务完成情况的处理---*/
			checkMissionsFn();
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
			/*---增加对任务完成情况的处理---*/
			checkMissionsFn();
			return this;
		};
		
		
		
		/**
		 * 所有任务
		 */
		var missions=[];
		role.getMission = function(num){
			return missions[num];
		};
		role.getMissions = function(pram1,pram2,pram3,pram4,pram5){
			var tempMissions = missions.slice(0);
			//pram==MISSION.STATUS.accept||pram==MISSION.STATUS.unAccept||pram==MISSION.STATUS.ongoing||pram==MISSION.STATUS.completed||pram==MISSION.STATUS.failed
			if(typeof pram1 == "string"&&pram1!=""){
				for (var i=0; i < tempMissions.length; i++) {
					if(!tempMissions[i].getDisplay()//不可见的
					   ||(tempMissions[i].getStatus()!=pram1
					   &&tempMissions[i].getStatus()!=pram2
					   &&tempMissions[i].getStatus()!=pram3
					   &&tempMissions[i].getStatus()!=pram4
					   &&tempMissions[i].getStatus()!=pram5)){
						tempMissions.splice(i,1);
						i--;
					}
				};
			}
			if(tempMissions.length==0){
				//tempMissions.push(noneMissionObj);
			}
			return tempMissions;
		};
		/**
		 * 传参：Mission对象
		 */
		role.addMission = function(pram){
			if(!missions){
				missions = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="mission"){
				//判断传入参数不为空 且是 mission对象
				missions.push(pram);
			}
			/*---增加对任务完成情况的处理---*/
			checkMissionsFn();
			return this;						
		};
		/**
		 * 传参：Number 或   Mission对象
		 */
		role.delMission = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				missions.splice(pram,1);
			} else {
				for (var i=0; i < missions.length; i++) {
					if(missions[i] == pram){
						missions.splice(i,1);
					};
				};
			};
			return this;
		};
		
		/**
		 * 检查当前任务，并修改任务完成状态
		 */
		checkMissionsFn = function(){
			if(missions.length>0){
				for (var i=0; i < missions.length; i++) {
					//检查进行中的任务 和 可交付任务
					if(missions[i].getStatus()==MISSION.STATUS.ongoing||missions[i].getStatus()==MISSION.STATUS.deliverable){
						//校验是否满足完成条件
						if(missions[i].checkComplete()){
							missions[i].setStatus(MISSION.STATUS.deliverable);
						}else{
							missions[i].setStatus(MISSION.STATUS.ongoing);
						};
					}
				};
			}
		};
		/**
		 * 检查当前任务，并修改任务完成状态
		 */
		role.checkMissions = checkMissionsFn;
		
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
		 * 坐标
		 */
		var x;
		domain.getX = function() {
			return x;
		};
		domain.setX = function(pram) {
			x = pram;
			return this;
		};
		var y;
		domain.getY = function() {
			return y;
		};
		domain.setY = function(pram) {
			y = pram;
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
		domain.addInteractiveObject = function(pram,arrayFn){
			if(!interactiveObjects){
				interactiveObjects = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="interactiveObject"){
				//判断传入参数不为空 且是 interactiveObject 对象
				pram.supper = this;
				if(arrayFn!="unshift"){//判断是在开头添加元素
					interactiveObjects.push(pram);
				}else{
					interactiveObjects.unshift(pram);
				}
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
		 * 任务用:标记是否到达
		 */
		var arrive=null;
		/**
		 * 任务用:标记是否到达
		 * true:已到达
		 * false:未到达
		 * 空:不需要该条件
		 */
		domain.getArrive = function(){
			return arrive;
		};
		/**
		 * 任务用:标记是否到达
		 * true:已到达
		 * false:未到达
		 * 空:不需要该条件
		 */
		domain.setArrive = function(pram){
			arrive = pram;
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
			this.arrive=null;
		};
		return domain;
	},
	createInteractiveObject:function() {
		var interactiveObject = new DataModle.InteractiveObject();
		/**
		 * 名称
		 */
		var name;
		interactiveObject.getName = function() {
			return name;
		};
		interactiveObject.setName = function(pram) {
			name = pram;
			return this;
		};
		interactiveObject.getNameLength = function() {
			return name.length+name.match(/[\u4e00-\u9fa5]/g).length;
		};
		
		/**
		 * 最大包裹空间
		 */
		var bagSpace;
		interactiveObject.getBagSpace = function() {
			return bagSpace;
		};
		interactiveObject.setBagSpace = function(pram) {
			if(!isNaN(Number(pram))){
				bagSpace = Number(pram);
			}
			return this;
		};
		/**
		 * 获取当前已使用空间
		 */
		interactiveObject.getOccupySpace = function() {
			var num = 0;
			for (var i=0; i < items.length; i++) {
				if(!isNaN(Number(items[i].getTotalNum()))){
					if(!isNaN(Number(items[i].getBagSpace()))){
						num += (Number(items[i].getTotalNum())*Number(items[i].getBagSpace()));
					}else{
						num += Number(items[i].getTotalNum());
					}
				}
			};
			return num;
		};
		
		/**
		 * 战斗后是否消失
		 */
		var disappear = true;
		interactiveObject.getDisappear = function() {
			return disappear;
		};
		interactiveObject.setDisappear = function(pram) {
			disappear = pram;
			return this;
		};
		
		/**
		 * 计算属性数值
		 */
		function compute (attrType,baseAttrType) {
			var tempBuffAttrType=0;//buff直接加成
			var tempBuffAttrTypePercent=0;//buff百分比
			interactiveObject.getBuffs();
			//遍历buff加成，包括增益减益
			if (typeof interactiveObject.getBuffs()!="undefined") {
				for (var i=0; i < interactiveObject.getBuffs().length; i++) {
					var tempAttr = interactiveObject.getBuffs()[i].getAttr();
					if (tempAttr&&tempAttr!=undefined&&tempAttr!=null) {
						if(attrType in tempAttr
							//&&tempAttr[attrType]!=undefined
							//&&tempAttr[attrType]!=null
							&& typeof Number(tempAttr[attrType])=="number"
							&& typeof !isNaN(Number(tempAttr[attrType]))){
							tempBuffAttrType+=Number(tempAttr[attrType]);
						}
						//判断获取到的defPercent属性为数字
						if((attrType+"Percent") in tempAttr
							//&&tempAttr[(attrType+"Percent")]!=undefined
							//&&tempAttr[(attrType+"Percent")]!=null
							&& typeof Number(tempAttr[(attrType+"Percent")])=="number"
							&& typeof !isNaN(Number(tempAttr[(attrType+"Percent")]))){
							tempBuffAttrTypePercent+=Number(tempAttr[(attrType+"Percent")]);
						}
					};
				};
			};
			//计算buff加成:先计算百分比，后计算直接加成
			return Number(baseAttrType)+Number(baseAttrType)*tempBuffAttrTypePercent+tempBuffAttrType;
		};
		
		/**
		 * 角色基础MaxHP
		 */
		var MaxHp=100;
		interactiveObject.getMaxHp  = function() {
			return MaxHp;
		};
		interactiveObject.setMaxHp = function(pram) {
			if(!isNaN(Number(pram))){
				MaxHp = Number(pram);
			}
			return this;
		};
		/**
		 * 角色最大HP（包含计算加成）
		 * 计算顺序:基础>技能百分比+装备百分比>技能直接加成+装备直接加成
		 */
		interactiveObject.getMaxHp  = function() {
			return compute("maxHp",MaxHp);
		};
		
		
		/**
		 * 角色基础MaxEP
		 */
		var MaxEp=100;
		interactiveObject.getMaxEp  = function() {
			return MaxEp;
		};
		interactiveObject.setMaxEp = function(pram) {
			if(!isNaN(Number(pram))){
				MaxEp = Number(pram);
			}
			return this;
		};
		/**
		 * 角色最大EP（包含计算加成）
		 * 计算顺序:基础>技能百分比+装备百分比>技能直接加成+装备直接加成
		 */
		interactiveObject.getMaxEp  = function() {
			return compute("maxEp",MaxEp);
		};
		
		/**
		 * 角色当前HP
		 */
		var Hp=100;
		interactiveObject.getHp  = function() {
			return Hp;
		};
		interactiveObject.setHp = function(pram) {
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
		 * 角色基础Att
		 */
		var Att=1;
		interactiveObject.getAtt  = function() {
			return Att;
		};
		interactiveObject.setAtt = function(pram) {
			if(!isNaN(Number(pram))){
				Att = Number(pram);
			}
			return this;
		};
		/**
		 * 角色当前Att
		 */
		interactiveObject.getAtt  = function() {
			return compute("att",Att);
		};
		
		
		/**
		 * 角色基础Def
		 */
		var Def=1;
		interactiveObject.getDef  = function() {
			return Def;
		};
		interactiveObject.setDef = function(pram) {
			if(!isNaN(Number(pram))){
				Def = pram;
			}
			return this;
		};
		/**
		 * 角色当前Def
		 */
		interactiveObject.getDef  = function() {
			return compute("def",Def);
		};
		
		
		/**
		 * 角色基础Cri(暴击率)
		 */
		var Cri=0.1;
		interactiveObject.getCri  = function() {
			return Cri;
		};
		interactiveObject.setCri = function(pram) {
			if(!isNaN(Number(pram))){
				Cri = pram;
			}
			return this;
		};
		/**
		 * 角色当前Cri
		 */
		interactiveObject.getCri  = function() {
			return compute("cri",Cri);
		};
		
		
		/**
		 * 角色基础criStrike(暴击伤害)
		 */
		var CriStrike=1;
		interactiveObject.getCriStrike  = function() {
			return CriStrike;
		};
		interactiveObject.setCriStrike = function(pram) {
			if(!isNaN(Number(pram))){
				CriStrike = pram;
			}
			return this;
		};
		/**
		 * 角色当前CriStrike
		 */
		interactiveObject.getCriStrike  = function() {
			return compute("criStrike",CriStrike);
		};
		
		
		/**
		 * 角色基础Avd(闪避率)
		 */
		var Avd=0;
		interactiveObject.getAvd  = function() {
			return Avd;
		};
		interactiveObject.setAvd = function(pram) {
			if(!isNaN(Number(pram))){
				Avd = pram;
			}
			return this;
		};
		/**
		 * 角色当前Avd
		 */
		interactiveObject.getAvd  = function() {
			return compute("avd",Avd);
		};
		
		
		/**
		 * 角色基础Hit(命中率)
		 */
		var Hit=1;
		interactiveObject.getHit  = function() {
			return Hit;
		};
		interactiveObject.setHit = function(pram) {
			if(!isNaN(Number(pram))){
				Hit = pram;
			}
			return this;
		};
		/**
		 * 角色当前Hit
		 */
		interactiveObject.getHit  = function() {
			return compute("hit",Hit);
		};
		
		
		/**
		 * 所有技能
		 */
		var skills=[];
		interactiveObject.getSkill = function(num){
			return skills[num];
		};
		interactiveObject.getSkills = function(pram){
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
		interactiveObject.addSkill = function(pram){
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
		interactiveObject.delSkill = function(pram) {
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
						if(pram.getBuffId() == buffs[i].getBuffId()){
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
		
		
		/**
		 * 交互动作
		 */
		var actions=[];
		interactiveObject.getAction = function(num){
			return actions[num];
		};
		interactiveObject.getActions = function(){
			//判定有任务，则追加显示任务选项
			var flag = false;
			if(missions.length>0){
				for (var i=0; i < actions.length; i++) {
					if(compareAction(actions[i],missionActionObj)){
						break;
					}else{
						flag = true;
					};
				};
			}
			if (flag) {
				var tempActions = actions.slice(0);
				tempActions.push(missionActionObj);
				return tempActions;
			};
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
				itemInfos.push(pram);
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
		 * 掉落数量
		 */
		var dropNum=1;
		interactiveObject.getDropNum  = function() {
			return dropNum;
		};
		interactiveObject.setDropNum = function(pram) {
			if(!isNaN(Number(pram))){
				dropNum = pram;
			}
			return this;
		};
		
		/**
		 * 所有物品
		 */
		var items=[];
		interactiveObject.getItem = function(num){
			return items[num];
		};
		/**
		 * 传参："useRoleBag-Consumable":过滤出消耗品 ; "useRoleBag-Equip":过滤出装备
		 */
		interactiveObject.getItems = function(pram){
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
		
		
		/**
		 * 所有任务
		 */
		var missions=[];
		interactiveObject.getMission = function(num){
			return missions[num];
		};
		/**
		 * 传参：pram12345:status--可接取:accept|不可接取:unAccept|进行中:ongoing|可交付:deliverable|已完成:completed|失败:failed
		 */
		interactiveObject.getMissions = function(pram1,pram2,pram3,pram4,pram5){
			var tempMissions = missions.slice(0);
			//pram==MISSION.STATUS.accept||pram==MISSION.STATUS.unAccept||pram==MISSION.STATUS.ongoing||pram==MISSION.STATUS.completed||pram==MISSION.STATUS.failed
			if(typeof pram1 == "string"&&pram1!=""){
				for (var i=0; i < tempMissions.length; i++) {
					if(!tempMissions[i].getDisplay()//不可见的
					   ||(tempMissions[i].getStatus()!=pram1
					   &&tempMissions[i].getStatus()!=pram2
					   &&tempMissions[i].getStatus()!=pram3
					   &&tempMissions[i].getStatus()!=pram4
					   &&tempMissions[i].getStatus()!=pram5)){
						tempMissions.splice(i,1);
						i--;
					}
				};
			}
			return tempMissions;
		};
		/**
		 * 传参：Mission对象
		 */
		interactiveObject.addMission = function(pram){
			if(!missions){
				missions = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="mission"){
				//判断传入参数不为空 且是 mission对象
				pram.supper = this;
				missions.push(pram);
			}
			return this;						
		};
		/**
		 * 传参：Number 或   Mission对象
		 */
		interactiveObject.delMission = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				missions.splice(pram,1);
			} else {
				for (var i=0; i < missions.length; i++) {
					if(missions[i] == pram){
						missions.splice(i,1);
					};
				};
			};
			return this;
		};
		
		/*-------------任务判定属性-------------*/
		/**
		 * 触发对话是否完成
		 */
		var triggerTalk;
		interactiveObject.getTriggerTalk  = function() {
			return triggerTalk;
		};
		/**
		 * 记录触发对话是否完成,
		 * false:(需要对话但)未完成
		 * true:已完成对话
		 * 空:没有这个条件，无需完成对话
		 */
		interactiveObject.setTriggerTalk = function(pram) {
			triggerTalk = pram;
			return this;
		};
		
		
		/**
		 * 触发所需对战次数
		 */
		var triggerBattleTotalNum;
		interactiveObject.getTriggerBattleTotalNum  = function() {
			return triggerBattleTotalNum;
		};
		/**
		 * NaN 或 非Number,如空值,则代表没有该条件,无需对战
		 */
		interactiveObject.setTriggerBattleTotalNum = function(pram) {
			triggerBattleTotalNum = pram;
			return this;
		};
		
		/**
		 * 触发 当前对战次数
		 */
		var triggerBattleNum=0;
		interactiveObject.getTriggerBattleNum  = function() {
			return triggerBattleNum;
		};
		/**
		 * NaN 或 非Number,如空值,则代表没有该条件,无需对战
		 */
		interactiveObject.setTriggerBattleNum = function(pram) {
			triggerBattleNum = pram;
			return this;
		};
		
		
		/**
		 * 完成对话是否完成
		 */
		var completeTalk;
		interactiveObject.getCompleteTalk  = function() {
			return completeTalk;
		};
		/**
		 * 记录完成对话是否完成,
		 * false:(需要对话但)未完成
		 * true:已完成对话
		 * 空:没有这个条件，无需完成对话
		 */
		interactiveObject.setCompleteTalk = function(pram) {
			completeTalk = pram;
			return this;
		};
		
		/**
		 * 完成对话时显示的对话内容
		 */
		var completeTalkContent="";
		interactiveObject.getCompleteTalkContent  = function() {
			return completeTalk;
		};
		interactiveObject.setCompleteTalkContent = function(pram) {
			completeTalkContent = pram;
			return this;
		};
		
		
		/**
		 * 完成所需对战次数
		 */
		var completeBattleTotalNum;
		interactiveObject.getCompleteBattleTotalNum  = function() {
			return completeBattleTotalNum;
		};
		/**
		 * NaN 或 非Number,如空值,则代表没有该条件,无需对战
		 */
		interactiveObject.setCompleteBattleTotalNum = function(pram) {
			completeBattleTotalNum = pram;
			return this;
		};
		
		/**
		 * 完成 当前对战次数
		 */
		var completeBattleNum=0;
		interactiveObject.getCompleteBattleNum  = function() {
			return completeBattleNum;
		};
		/**
		 * NaN 或 非Number,如空值,则代表没有该条件,无需对战
		 */
		interactiveObject.setCompleteBattleNum = function(pram) {
			completeBattleNum = pram;
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
		/**
		 * 移动类型跳转目标的坐标
		 */
		var targetX;
		action.getTargetX = function() {
			return targetX;
		};
		action.setTargetX = function(pram) {
			targetX = pram;
			return this;
		};
		var targetY;
		action.getTargetY = function() {
			return targetY;
		};
		action.setTargetY = function(pram) {
			targetY = pram;
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
		item.getNameLength = function() {
			return name.length+name.match(/[\u4e00-\u9fa5]/g).length;
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
		 * 占用包裹空间，默认1
		 */
		var bagSpace=1;
		item.getBagSpace = function() {
			return bagSpace;
		};
		item.setBagSpace = function(pram) {
			if(!isNaN(Number(pram))){
				bagSpace = Number(pram);
			}
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
				//判断父对象是role
				if(this.supper&&this.supper.constructor==DataModle.Role){
					/*---增加对任务完成情况的处理---*/
					this.supper.checkMissions();
				}
			}
			return this;
		};
		
		/**
		 * 当前拥有数量，任务对象专用
		 */
		var haveNum=0;
		item.getHaveNum = function() {
			return haveNum;
		};
		item.setHaveNum = function(pram) {
			if(!isNaN(Number(pram))){
				haveNum = Number(pram);
			}
			return this;
		};
		
		/**
		 * 掉落概率
		 */
		var dropChance=0;
		item.getDropChance = function() {
			return dropChance;
		};
		item.setDropChance = function(pram) {
			if(!isNaN(Number(pram))){
				dropChance = Number(pram);
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
		 * 技能单元索引
		 */
		var index;
		item.getIndex = function() {
			return index;
		};
		item.setIndex = function(pram) {
			index = pram;
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
				}else if("useSkillPanle"==pram){//判断是使用技能面板
					//根据index 判断是否已使用
					if(index==null||index==undefined||index==""){
						//未使用，只取出显示安装动作
						//in
						tempActions = actions.slice(0);
						var action = loadData(dictionaryData.action.role_install,"action");
						for (var i=0; i < tempActions.length; i++) {
							if(compareAction(tempActions[i],action)){
								tempActions = [tempActions[i]];
							};
						};
					}else{
						//已使用，只取出显示卸下动作
						tempActions = actions.slice(0);
						var action = loadData(dictionaryData.action.role_uninstall,"action");
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
		skill.getNameLength = function() {
			return name.length+name.match(/[\u4e00-\u9fa5]/g).length;
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
		
		
		/**
		 * 使用概率
		 */
		var useChance;
		skill.getUseChance = function() {
			return useChance;
		};
		skill.setUseChance = function(pram) {
			useChance = pram;
			return this;
		};
		
		
		/**
		 * 交互动作
		 */
		var actions=[];
		skill.getAction = function(num){
			return actions[num];
		};
		skill.getActions = function(){
			return actions;
		};
		skill.addAction = function(pram){
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
		skill.delAction = function(pram) {
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
		 * buff图标
		 */
		var img;
		buff.getImg = function() {
			return img;
		};
		buff.setImg = function(pram) {
			img = pram;
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
		 * 目标对象
		 */
		var target;
		buff.getTarget = function() {
			return target;
		};
		buff.setTarget = function(pram) {
			target = pram;
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
	createMission:function() {
		var mission = new DataModle.Mission();
		/**
		 * 显示名称 
		 */
		var name;
		mission.getName = function() {
			return name;
		};
		mission.setName = function(pram) {
			name = pram;
			return this;
		};
		/**
		 * 说明 
		 */
		var content;
		mission.getContent = function() {
			return content;
		};
		mission.setContent = function(pram) {
			content = pram;
			return this;
		};
		/**
		 * 类型 
		 */
		var type;
		mission.getType = function() {
			return type;
		};
		mission.setType = function(pram) {
			type = pram;
			return this;
		};
		/**
		 * 状态
		 */
		var status;
		mission.getStatus = function() {
			return status;
		};
		mission.setStatus = function(pram) {
			status = pram;
			return this;
		};
		/**
		 * 是否可见(true,false)
		 */
		var display;
		mission.getDisplay = function() {
			return display;
		};
		mission.setDisplay = function(pram) {
			display = pram;
			return this;
		};
		
		
		/**
		 * 触发可接受所需拥有物品
		 */
		var triggerItems=[];
		mission.getTriggerItem = function(num){
			return triggerItems[num];
		};
		mission.getTriggerItems = function(pram){
			return triggerItems;
		};
		/**
		 * 传参：Item对象
		 */
		mission.addTriggerItem = function(pram){
			if(!triggerItems){
				triggerItems = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="item"){
				//判断传入参数不为空 且是item对象
				triggerItems.push(pram);
			}
			return this;						
		};
		/**
		 * 传参：Number 或  Item对象
		 */
		mission.delTriggerItem = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				triggerItems.splice(pram,1);
			} else {
				for (var i=0; i < triggerItems.length; i++) {
					if(triggerItems[i] == pram){
						triggerItems.splice(i,1);
					};
				};
			};
			return this;
		};
		
		
		/**
		 * 触发可接受所需拥有技能
		 */
		var triggerSkills=[];
		mission.getTriggerSkill = function(num){
			return triggerSkills[num];
		};
		mission.getTriggerSkills = function(pram){
			return triggerSkills;
		};
		/**
		 * 传参：Skill对象
		 */
		mission.addTriggerSkill = function(pram){
			if(!triggerSkills){
				triggerSkills = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="skill"){
				//判断传入参数不为空 且是Skill对象
				triggerSkills.push(pram);
			}
			return this;						
		};
		/**
		 * 传参：Number 或  Skill对象
		 */
		mission.delTriggerSkill = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				triggerSkills.splice(pram,1);
			} else {
				for (var i=0; i < triggerSkills.length; i++) {
					if(triggerSkills[i] == pram){
						triggerSkills.splice(i,1);
					};
				};
			};
			return this;
		};
		
		/**
		 * 触发可接受所需(对话/战斗)对象
		 */
		var triggerInteractiveObjects=[];
		mission.getTriggerInteractiveObject = function(num){
			return triggerInteractiveObjects[num];
		};
		mission.getTriggerInteractiveObjects = function(pram){
			return triggerInteractiveObjects;
		};
		/**
		 * 传参：InteractiveObject对象
		 */
		mission.addTriggerInteractiveObject = function(pram){
			if(!triggerTalks){
				triggerTalks = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="interactiveObject"){
				//判断传入参数不为空 且是InteractiveObject对象
				triggerInteractiveObjects.push(pram);
			}
			return this;						
		};
		/**
		 * 传参：Number 或  InteractiveObject对象
		 */
		mission.delTriggerInteractiveObject = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				triggerInteractiveObjects.splice(pram,1);
			} else {
				for (var i=0; i <triggerInteractiveObjects.length; i++) {
					if(triggerInteractiveObjects[i] == pram){
						triggerInteractiveObjects.splice(i,1);
					};
				};
			};
			return this;
		};
		
		
		/**
		 * 触发可接受所需到达地点
		 */
		var triggerDomains=[];
		mission.getTriggerDomain = function(num){
			return triggerDomains[num];
		};
		mission.getTriggerDomains = function(pram){
			return triggerDomains;
		};
		/**
		 * 传参：Domain对象
		 */
		mission.addTriggerDomain = function(pram){
			if(!triggerDomains){
				triggerDomains = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="domain"){
				//判断传入参数不为空 且是Domain对象
				triggerDomains.push(pram);
			}
			return this;						
		};
		/**
		 * 传参：Number 或  Domain对象
		 */
		mission.delTriggerDomain = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				triggerDomains.splice(pram,1);
			} else {
				for (var i=0; i < triggerDomains.length; i++) {
					if(triggerDomains[i] == pram){
						triggerDomains.splice(i,1);
					};
				};
			};
			return this;
		};
		
		
		
		/**
		 * 完成所需物品
		 */
		var completeItems=[];
		mission.getCompleteItem = function(num){
			return triggerItems[num];
		};
		mission.getCompleteItems = function(pram){
			return completeItems;
		};
		/**
		 * 传参：Item对象
		 */
		mission.addCompleteItem = function(pram){
			if(!completeItems){
				completeItems = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="item"){
				//判断传入参数不为空 且是item对象
				completeItems.push(pram);
			}
			return this;						
		};
		/**
		 * 传参：Number 或  Item对象
		 */
		mission.delCompleteItem = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				completeItems.splice(pram,1);
			} else {
				for (var i=0; i < completeItems.length; i++) {
					if(completeItems[i] == pram){
						completeItems.splice(i,1);
					};
				};
			};
			return this;
		};
		
		
		/**
		 * 完成所需拥有技能
		 */
		var completeSkills=[];
		mission.getCompleteSkill = function(num){
			return completeSkills[num];
		};
		mission.getCompleteSkills = function(pram){
			return completeSkills;
		};
		/**
		 * 传参：Skill对象
		 */
		mission.addCompleteSkill = function(pram){
			if(!completeSkills){
				completeSkills = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="skill"){
				//判断传入参数不为空 且是Skill对象
				completeSkills.push(pram);
			}
			return this;						
		};
		/**
		 * 传参：Number 或  Skill对象
		 */
		mission.delCompleteSkill = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				completeSkills.splice(pram,1);
			} else {
				for (var i=0; i < completeSkills.length; i++) {
					if(completeSkills[i] == pram){
						completeSkills.splice(i,1);
					};
				};
			};
			return this;
		};
		
		/**
		 * 完成所需(对话/战斗)对象
		 */
		var completeInteractiveObjects=[];
		mission.getCompleteInteractiveObject = function(num){
			return completeInteractiveObjects[num];
		};
		mission.getCompleteInteractiveObjects = function(pram){
			return completeInteractiveObjects;
		};
		/**
		 * 传参：InteractiveObject对象
		 */
		mission.addCompleteInteractiveObject = function(pram){
			if(!completeTalks){
				completeTalks = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="interactiveObject"){
				//判断传入参数不为空 且是InteractiveObject对象
				completeInteractiveObjects.push(pram);
			}
			return this;						
		};
		/**
		 * 传参：Number 或  InteractiveObject对象
		 */
		mission.delCompleteInteractiveObject = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				completeInteractiveObjects.splice(pram,1);
			} else {
				for (var i=0; i <completeInteractiveObjects.length; i++) {
					if(completeInteractiveObjects[i] == pram){
						completeInteractiveObjects.splice(i,1);
					};
				};
			};
			return this;
		};
		
		
		/**
		 * 完成所需到达地点
		 */
		var completeDomains=[];
		mission.getCompleteDomain = function(num){
			return completeDomains[num];
		};
		mission.getCompleteDomains = function(pram){
			return completeDomains;
		};
		/**
		 * 传参：Domain对象
		 */
		mission.addCompleteDomain = function(pram){
			if(!completeDomains){
				completeDomains = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="domain"){
				//判断传入参数不为空 且是Domain对象
				completeDomains.push(pram);
			}
			return this;
		};
		/**
		 * 传参：Number 或  Domain对象
		 */
		mission.delCompleteDomain = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				completeDomains.splice(pram,1);
			} else {
				for (var i=0; i < completeDomains.length; i++) {
					if(completeDomains[i].domain == pram){
						completeDomains.splice(i,1);
					};
				};
			};
			return this;
		};
		
		
		/**
		 * 任务奖励物品
		 */
		var rewardItems=[];
		mission.getRewardItem = function(num){
			return rewardItems[num];
		};
		mission.getRewardItems = function(pram){
			return rewardItems;
		};
		/**
		 * 传参：Item对象
		 */
		mission.addRewardItem = function(pram){
			if(!rewardItems){
				rewardItems = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="item"){
				//判断传入参数不为空 且是Domain对象
				rewardItems.push(pram);
			}
			return this;						
		};
		/**
		 * 传参：Number 或  Item对象
		 */
		mission.delRewardItem = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				rewardItems.splice(pram,1);
			} else {
				for (var i=0; i < rewardItems.length; i++) {
					if(rewardItems[i] == pram){
						rewardItems.splice(i,1);
					};
				};
			};
			return this;
		};
		
		
		/**
		 * 任务奖励技能
		 */
		var rewardSkills=[];
		mission.getRewardSkill = function(num){
			return rewardSkills[num];
		};
		mission.getRewardSkills = function(pram){
			return rewardSkills;
		};
		/**
		 * 传参：Skill对象
		 */
		mission.addRewardSkill = function(pram){
			if(!rewardSkills){
				rewardSkills = new Array();
			}
			if(pram&&pram!=null&&pram!=undefined&&pram.constructor.name=="skill"){
				//判断传入参数不为空 且是Skill对象
				rewardSkills.push(pram);
			}
			return this;						
		};
		/**
		 * 传参：Number 或 Skill对象
		 */
		mission.delRewardSkill = function(pram) {
			if (Object.prototype.toString.call(pram)==="[object Number]") {
				rewardSkills.splice(pram,1);
			} else {
				for (var i=0; i < rewardSkills.length; i++) {
					if(rewardSkills[i] == pram){
						rewardSkills.splice(i,1);
					};
				};
			};
			return this;
		};
		
		
		/**
		 * 任务奖励情报
		 */
		var rewardInformation;
		mission.getRewardInformation = function() {
			return rewardInformation;
		};
		mission.setRewardInformation = function(pram) {
			rewardInformation = pram;
			return this;
		};
		
		/*
		 * 传参:[Item] Item对象数组
		 * return:true(满足完成条件)、false(不满足完成条件)
		mission.checkCompleteItem = function(pramArr){
			if(pramArr.length>0){
				//遍历完成任务所需物品
				for (var i=0; i < completeItems.length; i++) {
					//遍历当前拥有物品
					for (var i1=0; i1 < pramArr.length; i1++) {
						//对比出同物品
						if(compareItem(completeItems[i],pramArr[i1])){
							//判断数量是否达标
							if(Number(items[i2].getTotalNum())>=Number(tempItems[i1].getTotalNum())){
								//数量达标,返回true
								return true;
							}
						};
					};
				};
			}
		};
		*/
		
		/**
		 * 校验是否触发
		 * return:true(满足完成条件)、false(不满足完成条件)
		 */
		mission.checkTrigger = function(){
			//完成所需物品条件校验
			var checkItems = true;
			var roleItems = dataRoleObj[0].getItems();
			//首先判断有需要物品的条件
			if(triggerItems.length>0){
				//其次判断角色拥有物品
				if (roleItems.length>0) {
					//遍历完成任务所需物品
					for (var i=0; i < triggerItems.length; i++) {
						//标记，false为遍历完都未匹配上
						var flag = false;
						//遍历当前拥有物品
						for (var i1=0; i1 < roleItems.length; i1++) {
							//对比出同种物品
							if(compareItem(triggerItems[i],roleItems[i1])){
								triggerItems[i].setHaveNum(roleItems[i1].getTotalNum());
								//判断数量是否达标
								if(Number(roleItems[i1].getTotalNum())>=Number(triggerItems[i].getTotalNum())){
									//数量达标,返回true(checkItems不做变更)
									flag = true;
								}else{
									//数量不达标,返回false(只要有一个不足，则全部为false),无需继续遍历break;
									checkItems=false;
									break;
								}
							};
						}
						if(flag==false){//遍历完都未匹配上
							//数量不达标,返回false,且无需继续遍历break;
							checkItems=false;
							break;
						}
					}
				}else{//没有物品则直接标记为false
					checkItems=false;
				}
			}else{//不需要物品则直接标记为true
				checkItems=true;
			}
			
			//完成所需拥有技能校验
			var checkSkills = true;
			roleSkills = dataRoleObj[0].getSkills();
			//首先判断有需要拥有技能的条件
			if(triggerSkills.length>0){
				//其次判断角色有技能
				if (roleSkills.length>0) {
					//遍历完成任务所需拥有技能
					for (var i=0; i < triggerSkills.length; i++) {
						//标记，false为遍历完都未匹配上
						var flag = false;
						//遍历当前拥有技能
						for (var i1=0; i1 < roleSkills.length; i1++) {
							//对比出同种技能
							if(compareItem(triggerSkills[i],roleSkills[i1])){
								//有对应技能,返回true(checkSkills不做变更)
								flag = true;
								break;
							};
						}
						if(flag==false){//遍历完都未匹配上
							//返回false,且无需继续遍历break;
							checkSkills=false;
							break;
						}
					}
				}else{//没有技能则直接标记为false
					checkSkills=false;
				}
			}else{//不需要拥有技能则直接标记为true
				checkSkills=true;
			}
			
			//完成所需对话对象
			var checkTalks = true;
			//完成所需战斗对象
			var checkBattles = true;
			//首先判断有需要对话/战斗对象的条件
			if(triggerInteractiveObjects.length>0){
				//遍历所有需要对话对象的条件
				for (var i=0; i < triggerInteractiveObjects.length; i++) {
					//检查是否已完成对话,如果不是false,则代表无此条件或已完成对话
					if(triggerInteractiveObjects[i].getTriggerTalk()==false){
						//如果有一个false,则直接break;
						checkTalks=false;
						break;
					}
					//检查所需战斗对象条件是否存在
					if (typeof triggerInteractiveObjects[i].getTriggerBattleTotalNum()=="number"
						&&typeof !isNaN(triggerInteractiveObjects[i].getTriggerBattleTotalNum())) {
						//检查所需战斗对象是否已达标,当前完成数量>=总共需要的数量
						if(triggerInteractiveObjects[i].getTriggerBattleNum()>=triggerInteractiveObjects[i].getTriggerBattleTotalNum()){
						}else{//如果有一个不达标，则为false,直接break;
							checkBattles=false;
							break;
						}
					};
				};
			}else{//不需要对话/战斗对象则直接标记为true
				checkTalks=true;
				checkBattles = true;
			}
			
			//完成所需到达地点
			var checkDomains = true;
			//首先判断有需要到达地点的条件
			if(triggerDomains.length>0){
				//遍历所有需要到达地点的条件
				for (var i=0; i < triggerDomains.length; i++) {
					//检查是否已完成到达地点,不为false(true或空或其他)则代表没有该条件或已完成
					if(triggerDomains[i].getArrive()==false){
						//如果有一个false,则直接break;
						checkDomains=false;
						break;
					}
				};
			}else{//不需要到达地点则直接标记为true
				checkDomains=true;
			}
			
			if(checkItems&&checkSkills&&checkTalks&&checkBattles&&checkDomains){
				//全部条件达成
				return true;
			}else{
				return false;
			}
		};
		
		
		/**
		 * 校验是否完成
		 * return:true(满足完成条件)、false(不满足完成条件)
		 */
		mission.checkComplete = function(){
			//完成所需物品条件校验
			var checkItems = true;
			var roleItems = dataRoleObj[0].getItems();
			//首先判断有需要物品的条件
			if(completeItems.length>0){
				//其次判断角色拥有物品
				if (roleItems.length>0) {
					//遍历完成任务所需物品
					for (var i=0; i < completeItems.length; i++) {
						//标记，false为遍历完都未匹配上
						var flag = false;
						//遍历当前拥有物品
						for (var i1=0; i1 < roleItems.length; i1++) {
							//对比出同种物品
							if(compareItem(completeItems[i],roleItems[i1])){
								completeItems[i].setHaveNum(roleItems[i1].getTotalNum());
								//判断数量是否达标
								if(Number(roleItems[i1].getTotalNum())>=Number(triggerItems[i].getTotalNum())){
									//数量达标,返回true(checkItems不做变更)
									flag = true;
								}else{
									//数量不达标,返回false(只要有一个不足，则全部为false),无需继续遍历break;
									checkItems=false;
									break;
								}
							};
						}
						if(flag==false){//遍历完都未匹配上
							//数量不达标,返回false,且无需继续遍历break;
							checkItems=false;
							break;
						}
					}
				}else{//没有物品则直接标记为false
					checkItems=false;
				}
			}else{//不需要物品则直接标记为true
				checkItems=true;
			}
			
			//完成所需拥有技能校验
			var checkSkills = true;
			roleSkills = dataRoleObj[0].getSkills();
			//首先判断有需要拥有技能的条件
			if(completeSkills.length>0){
				//其次判断角色有技能
				if (roleSkills.length>0) {
					//遍历完成任务所需拥有技能
					for (var i=0; i < completeSkills.length; i++) {
						//标记，false为遍历完都未匹配上
						var flag = false;
						//遍历当前拥有技能
						for (var i1=0; i1 < roleSkills.length; i1++) {
							//对比出同种技能
							if(compareItem(completeSkills[i],roleSkills[i1])){
								//有对应技能,返回true(checkSkills不做变更)
								flag = true;
								break;
							};
						}
						if(flag==false){//遍历完都未匹配上
							//返回false,且无需继续遍历break;
							checkSkills=false;
							break;
						}
					}
				}else{//没有技能则直接标记为false
					checkSkills=false;
				}
			}else{//不需要拥有技能则直接标记为true
				checkSkills=true;
			}
			
			//完成所需对话对象
			var checkTalks = true;
			//完成所需战斗对象
			var checkBattles = true;
			//首先判断有需要对话/战斗对象的条件
			if(completeInteractiveObjects.length>0){
				//遍历所有需要对话对象的条件
				for (var i=0; i < completeInteractiveObjects.length; i++) {
					//检查是否已完成对话,如果不是false,则代表无此条件或已完成对话
					if(completeInteractiveObjects[i].getCompleteTalk()==false){
						//如果有一个false,则直接break;
						checkTalks=false;
						break;
					}
					//检查所需战斗对象条件是否存在
					if (typeof completeInteractiveObjects[i].getCompleteBattleTotalNum()=="number"
						&&typeof !isNaN(completeInteractiveObjects[i].getCompleteBattleTotalNum())) {
						//检查所需战斗对象是否已达标,当前完成数量>=总共需要的数量
						if(completeInteractiveObjects[i].getCompleteBattleNum()>=completeInteractiveObjects[i].getCompleteBattleTotalNum()){
						}else{//如果有一个不达标，则为false,直接break;
							checkBattles=false;
							break;
						}
					};
				};
			}else{//不需要对话/战斗对象则直接标记为true
				checkTalks=true;
				checkBattles = true;
			}
			
			//完成所需到达地点
			var checkDomains = true;
			//首先判断有需要到达地点的条件
			if(completeDomains.length>0){
				//遍历所有需要到达地点的条件
				for (var i=0; i < completeDomains.length; i++) {
					//检查是否已完成到达地点,不为false(true或空或其他)则代表没有该条件或已完成
					if(completeDomains[i].getArrive()==false){
						//如果有一个false,则直接break;
						checkDomains=false;
						break;
					}
				};
			}else{//不需要到达地点则直接标记为true
				checkDomains=true;
			}
			
			if(checkItems&&checkSkills&&checkTalks&&checkBattles&&checkDomains){
				//全部条件达成
				return true;
			}else{
				return false;
			}
		};
		
		return mission;
	},
};
DataModleFactory.createItemInfo = DataModleFactory.createItem;
/**
 * 复制buff对象
 * @param {Object} buff
 */
function copyBuff(buff){
	tempbuff = DataModleFactory.createBuff();
	tempbuff.setBuffId(buff.getBuffId())
			.setName(buff.getName())
			.setImg(buff.getImg())
			.setContent(buff.getContent())
			.setType(buff.getType())
			.setTarget(buff.getTarget())
			.setAttr(buff.getAttr())
			.setRound(buff.getRound())
			.setSuperposition(buff.getSuperposition());
	return tempbuff;
};
