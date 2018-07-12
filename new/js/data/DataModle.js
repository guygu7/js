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
var roleObj = new DataModle.Role();
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
			in//需修改，根据role中itemInfos的Actions修改，修改为角色对物品的专用动作
			if (pram) {//如果有传参Item,修改Item中某些值为默认值
				var itemActions = pram.getActions();
				if (itemActions) {
					for (var i=0; i < itemActions.length; i++) {
						if(itemActions[i].getType()=="split"){//修改 split 分割移动 的交互动作目标 为 默认值（至交互对象）
							itemActions[i].setTarget("toInteractiveObject");
						}
					};
				};
			};
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
			/*暂时仅用于记录价格无需修改数据
			if (pram) {//如果有传参ItemInfo,修改ItemInfo中某些值为默认值
				var itemInfoActions = pram.getActions();
				if(itemInfoActions){
					for (var i=0; i < itemInfoActions.length; i++) {
						if(itemInfoActions[i].getType()=="split"){//修改 split 分割移动  的交互动作目标 为 默认值（至角色包）
							itemInfoActions[i].setTarget("toRoleBag");
						}
					};
				}
			};
			*/
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
		 * 人物交互面板(按钮组)
		 */
		/*
		var buttonElements;
		domain.getButtonElement = function(num) {
			return buttonElements[num];
		};
		domain.getButtonElements = function() {
			return buttonElements;
		};
		domain.addButtonElement = function(pram){
			if(!buttonElements){
				buttonElements = new Array();
			}
			buttonElements.push(pram);
			return this;						
		};
		domain.delButtonElements = function(num) {
			buttonElements.splice(num,1);
			return this;
		};
		*/
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
			/*暂时仅用于记录价格无需修改数据
			if (pram) {//如果有传参ItemInfo,修改ItemInfo中某些值为默认值
				var itemInfoActions = pram.getActions();
				if(itemInfoActions){
					for (var i=0; i < itemInfoActions.length; i++) {
						if(itemInfoActions[i].getType()=="split"){//修改 split 分割移动  的交互动作目标 为 默认值（至角色包）
							itemInfoActions[i].setTarget("toRoleBag");
						}
					};
				}
			};
			*/
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
			//this.getButtonElements().splice(0,buttonElements.length);
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
		/*
		interactiveObject.delAction = function(num) {
			actions.splice(num,1);
			return this;
		};
		*/
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
				var itemActions = pram.getActions();
				if(itemActions){
					for (var i=0; i < itemActions.length; i++) {
						if(itemActions[i].getType()=="split"){//修改 split 分割移动  的交互动作目标 为 默认值（至角色包）
							itemActions[i].setTarget("toRoleBag");
						}
					};
				}
			};
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
			/*暂时仅用于记录价格无需修改数据
			if (pram) {//如果有传参ItemInfo,修改ItemInfo中某些值为默认值
				var itemInfoActions = pram.getActions();
				if(itemInfoActions){
					for (var i=0; i < itemInfoActions.length; i++) {
						if(itemInfoActions[i].getType()=="split"){//修改 split 分割移动  的交互动作目标 为 默认值（至角色包）
							itemInfoActions[i].setTarget("toRoleBag");
						}
					};
				}
			};
			*/
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
		 * 交互动作
		 */
		var actions;
		item.getAction = function(num){
			return actions[num];
		};
		item.getActions = function(){
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
		return item;
	},
};