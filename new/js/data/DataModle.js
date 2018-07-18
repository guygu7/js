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
		var Hp;
		role.getHp  = function() {
			return Hp;
		};
		role.setHp = function(pram) {
			Hp = pram;
			return this;
		};
		var MaxHp;
		role.getMaxHp  = function() {
			return MaxHp;
		};
		role.setMaxHp = function(pram) {
			MaxHp = pram;
			return this;
		};
		var Att;
		role.getAtt  = function() {
			return Att;
		};
		role.setAtt = function(pram) {
			Att = pram;
			return this;
		};
		var Def;
		role.getDef  = function() {
			return Def;
		};
		role.setDef = function(pram) {
			Def = pram;
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
			itemInfos.push(pram);
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
		var items;
		role.getItem = function(num){
			return items[num];
		};
		role.getItems = function(){
			return items;
		};
		role.addItem = function(pram){
			if(!items){
				items = new Array();
			}
			if (pram) {//如果有传参Item,修改Item中某些值为默认值
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
			};
			pram.supper = this;
			items.push(pram);
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
		var interactiveObjects;
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
			pram.supper = this;
			interactiveObjects.push(pram);
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
		var itemInfos;
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
			itemInfos.push(pram);
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
		var Hp;
		interactiveObject.getHp  = function() {
			return Hp;
		};
		interactiveObject.setHp = function(pram) {
			Hp = pram;
			return this;
		};
		var MaxHp;
		interactiveObject.getMaxHp  = function() {
			return MaxHp;
		};
		interactiveObject.setMaxHp = function(pram) {
			MaxHp = pram;
			return this;
		};
		var Att;
		interactiveObject.getAtt  = function() {
			return Att;
		};
		interactiveObject.setAtt = function(pram) {
			Att = pram;
			return this;
		};
		var Def;
		interactiveObject.getDef  = function() {
			return Def;
		};
		interactiveObject.setDef = function(pram) {
			Def = pram;
			return this;
		};
		/**
		 * 交互动作
		 */
		var actions;
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
			actions.push(pram);
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
		var itemInfos;
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
			itemInfos.push(pram);
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
		var items;
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
			if (pram) {//如果有传参Item,修改Item中某些值为默认值
				//依次读取itemInfos，优先级：自身>domain>全局
				var flag = false;
				function fn1 (obj){
					itemInfos = obj.getItemInfos();
					//判断itemInfo存在且不为空数组
					if(itemInfos&&itemInfos.lenght>0){
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
			};
			pram.supper = this;
			items.push(pram);
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
		var totalNum;
		item.getTotalNum = function() {
			return totalNum;
		};
		item.setTotalNum = function(pram) {
			totalNum = pram;
			return this;
		};
		/**
		 * 卖出价 
		 */
		var sellCost;
		item.getSellCost = function() {
			return sellCost;
		};
		item.setSellCost = function(pram) {
			sellCost = pram;
			return this;
		};
		/**
		 * 购入价
		 */
		var buyCost;
		item.getBuyCost = function() {
			return buyCost;
		};
		item.setBuyCost = function(pram) {
			buyCost = pram;
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
			isPutOn = pram;
			return this;
		};
		/**
		 * 交互动作
		 */
		var actions;
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
					var action = loadData(dictionaryData.action.roleAction1,"action");
					for (var i=0; i < tempActions.length; i++) {
						if(compareAction(tempActions[i],action)){
							tempActions.splice(i,1);
						};
					};
					return tempActions;
				}else if("transaction"==pram){//判断是交易，只取出堆叠动作
					//判断是否装备
					if(isPutOn){
						/*
						var action = loadData(dictionaryData.action.roleAction5,"action");
						var tempActions = [];
						tempActions.push(action);
						*/
						in
					}else{
						tempActions = actions.slice(0);
						var action = loadData(dictionaryData.action.roleAction1,"action");
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
			actions.push(pram);
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
};
DataModleFactory.createItemInfo = DataModleFactory.createItem;