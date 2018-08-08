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
		};
		
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
		
		var hp=100;
		interactiveObject.getHp  = function() {
			return hp;
		};
		interactiveObject.setHp = function(pram) {
			if(!isNaN(Number(pram))){
				hp = Math.round(Number(pram));//舍去小数
				var tempMaxHp = this.getMaxHp();
				if(hp>tempMaxHp){
					hp=tempMaxHp;
				}
				if(hp<0){hp=0;}
			}
			return this;
		};
		
		
		/**
		 * 基础Att
		 */
		var att=1;
		/**
		 * 当前Att（包含计算加成）
		 */
		interactiveObject.getAtt  = function() {
			return compute("att",att);
		};
		interactiveObject.setAtt = function(pram) {
			if(!isNaN(Number(pram))){
				att = Number(pram);
			}
			return this;
		};
		
		/**
		 * 基础Def
		 */
		var def=1;
		/**
		 * 当前Def（包含计算加成）
		 */
		interactiveObject.getDef  = function() {
			return compute("def",def);
		};
		interactiveObject.setBaseDef = function(pram) {
			if(!isNaN(Number(pram))){
				def = pram;
			}
			return this;
		};
		
		/**
		 * 角色基础Cri(暴击率)
		 */
		var cri=0;
		/**
		 * 当前Cri（包含计算加成）
		 */
		interactiveObject.getCri  = function() {
			return compute("cri",cri);
		};
		interactiveObject.setCri = function(pram) {
			if(!isNaN(Number(pram))){
				cri = pram;
			}
			return this;
		};
		
		/**
		 * 基础criStrike(暴击伤害)
		 */
		var criStrike=1;
		/**
		 * 当前CriStrike（包含计算加成）
		 */
		interactiveObject.getCriStrike  = function() {
			return compute("criStrike",criStrike);
		};
		interactiveObject.setCriStrike = function(pram) {
			if(!isNaN(Number(pram))){
				criStrike = pram;
			}
			return this;
		};
		
		/**
		 * 基础Avd(闪避率)
		 */
		var avd=0;
		/**
		 * 当前Avd（包含计算加成）
		 */
		interactiveObject.getAvd  = function() {
			return compute("avd",avd);
		};
		interactiveObject.setAvd = function(pram) {
			if(!isNaN(Number(pram))){
				avd = pram;
			}
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
			if(!isNaN(Number(pram))){
				Hit = pram;
			}
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