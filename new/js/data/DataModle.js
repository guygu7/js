/*----数据模型----*/
DataModle = {
	/**
	 * 当前场景地图
	 */
	Domain : function () {},
	/**
	 * 可交互对象
	 */
	InteractiveObject : function () {},
	/**
	 * 交互动作
	 */
	Action : function () {},
	/**
	 * 物品 
	 */
	Item : function () {},
	/**
	 *	角色（可交互对象）
	 */
	Role : function() {
		var name;
		/**
		 * 设置名称
		 */
		DataModle.Role.prototype.setName = function(pram) {
			this.name = pram;
			return this;
		};
		/**
		 * 获取名称
		 */
		DataModle.Role.prototype.getName = function() {
			return this.name;
		};
	},
};
var roleObj = new DataModle.Role();
DataModleFactory = {
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
		/**
		 * 清除当前对象全部数据 
		 */
		domain.clear = function(){
			this.setName(null);
			this.setSignId(null);
			this.getButtonElements().splice(0,buttonElements.length);
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
		interactiveObject.delAction = function(num) {
			actions.splice(num,1);
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
			items.push(pram);
			return this;						
		};
		interactiveObject.delItem = function(num) {
			items.splice(num,1);
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
		item.delAction = function(num) {
			actions.splice(num,1);
			return this;
		};
		return item;
	},
};