/**
 * 组件空间中加入下拉菜单类
 */
LC.Components.Dropdown = function() {
};
LC.Utils.extend(LC.Components.Dropdown, LC.Components.BasicComponent);
LC.Components.Dropdown.prototype.setText = function(text) {
	this.dom.append(text);
	return this;
};
/**
 * 为菜单添加按钮元素
 * @param {Number} _num 按钮位置序号
 * @param {String} _text 菜单文本
 * @param {String} _cssClass 重设按钮样式
 * @param {String} _id
 */
LC.Components.Dropdown.prototype.addElement = function(_num,_text,_cssClass,_id){
	if(!this._elements){
		this._elements = new Array();
	}
	//（未完成）校验_num为正整数
	//创建元素，设定元素样式、ID
	if (!_cssClass) {
		_cssClass=LC.CommonProperty.CSS_BUTTON_DROPDOWN;
	};
	var element = new LC.Components.BasicComponent();
	if (_id) {
		element.setSignID(_id);
	};
	if(_num!=0){_cssClass+=LC.CommonProperty.CSS_HIDE_SHRINK;}
	element.creatDOM("div",_cssClass);
	if(_text){
		element.dom.append(_text);
	};
	//将元素放入数组
	this._elements.splice(Number(_num),0,element);
	//更新菜单
	this.dom.empty();
	var elementsLength = this._elements.length;
	//将第一个元素置顶，并绑定点击事件
	this._elements[0].dom.css({"z-index":"2"});
	this._elements[0].dom.bind("click",function(e){
		var targets = $(e.target).siblings();
		var targetsLength = $(e.target).siblings().length+1;
		var hidetime = 0.2*(targetsLength-1);
		var showtime = 0.2;
		for (var j=0; j < targetsLength; j++) {
			var className = targets.eq(j).attr("class");
			if (-1 == className.search(LC.CommonProperty.CSS_HIDE_SHRINK.trim())) {//校验是否被隐藏
				className+=LC.CommonProperty.CSS_HIDE_SHRINK;
				hidetime -= 0.2;
				targets.eq(j).css({"transition-delay":hidetime+"s"});
				targets.eq(j).attr({
					"class" : className
				});
			}else{
				showtime += 0.2;
				targets.eq(j).css({"transition-delay":showtime+"s"});
				targets.eq(j).attr({
					"class" : className.replace(LC.CommonProperty.CSS_HIDE_SHRINK, "")
				});
			}
		};
	});
	for (var i=0; i < elementsLength ; i++) {
		this.dom.append(this._elements[i].dom);
	};
	return this;
};
LC.Components.Dropdown.prototype.getElement = function(_num){
	return this._elements[_num];
};
LC.Components.Dropdown.prototype.removeElement = function(_num){
	return this._elements.splice(Number(_num),1);
};

//===============上拉菜单=========================
/**
 * 组件空间中加入下拉菜单类
 */
LC.Components.DropdownUp = function() {
};
LC.Utils.extend(LC.Components.DropdownUp, LC.Components.BasicComponent);
LC.Components.DropdownUp.prototype.setText = function(text) {
	this.dom.append(text);
	return this;
};
/**
 * 为菜单添加按钮元素
 * @param {Number} _num 按钮位置序号
 * @param {String} _text 菜单文本
 * @param {String} _cssClass 重设按钮样式
 * @param {String} _id
 */
LC.Components.DropdownUp.prototype.addElement = function(_num,_text,_cssClass,_id){
	if(!this._elements){
		this._elements = new Array();
	}
	//（未完成）校验_num为正整数
	//创建元素，设定元素样式、ID
	if (!_cssClass) {
		_cssClass=LC.CommonProperty.CSS_BUTTON_DROPDOWN;
	};
	var element = new LC.Components.BasicComponent();
	if (_id) {
		element.setSignID(_id);
	};
	if(_num!=0){_cssClass+=LC.CommonProperty.CSS_HIDE_SHRINK;}
	element.creatDOM("div",_cssClass);
	if(_text){
		element.dom.append(_text);
	};
	//将元素放入数组
	this._elements.splice(Number(_num),0,element);
	//更新菜单
	this.dom.empty();
	var elementsLength = this._elements.length;
	//将第一个元素置顶，并绑定点击事件
	var menudom = this._elements[0].dom;
	menudom.css({"z-index":"2"});
	menudom.bind("click",function(e){
		var targets = $(e.target).siblings();
		var targetsLength = $(e.target).siblings().length+1;
		var hidetime = 0.2;
		var showtime = 0.2*(targetsLength-1);
		for (var j=0; j < targetsLength; j++) {
			var className = targets.eq(j).attr("class");
			if (null==className||-1 == className.search(LC.CommonProperty.CSS_HIDE_SHRINK.trim())) {//校验是否被隐藏
				className+=LC.CommonProperty.CSS_HIDE_SHRINK;
				hidetime += 0.2;
				targets.eq(j).css({"transition-delay":hidetime+"s"});
				targets.eq(j).attr({
					"class" : className
				});
			}else{
				showtime -= 0.2;
				targets.eq(j).css({"transition-delay":showtime+"s"});
				targets.eq(j).attr({
					"class" : className.replace(LC.CommonProperty.CSS_HIDE_SHRINK, "")
				});
			}
		};
	});
	for (var i=1; i < elementsLength ; i++) {
		this.dom.append(this._elements[i].dom);
	};
	//最后加入第一个元素
	this.dom.append(menudom);
	return this;
};
LC.Components.DropdownUp.prototype.getElement = function(_num){
	return this._elements[_num];
};
LC.Components.DropdownUp.prototype.removeElement = function(_num){
	return this._elements.splice(Number(_num),1);
};

//============左横拉菜单============
/**
 * 组件空间中加入下拉菜单类
 */
LC.Components.DropdownLeft = function() {
};
LC.Utils.extend(LC.Components.DropdownLeft, LC.Components.BasicComponent);
LC.Components.DropdownLeft.prototype.setText = function(text) {
	this.dom.append(text);
	return this;
};
/**
 * 为菜单添加按钮元素
 * @param {Number} _num 按钮位置序号
 * @param {String} _text 菜单文本
 * @param {String} _cssClass 重设按钮样式
 * @param {String} _id
 */
LC.Components.DropdownLeft.prototype.addElement = function(_num,_text,_cssClass,_id){
	if(!this._elements){
		this._elements = new Array();
	}
	//（未完成）校验_num为正整数
	//创建元素，设定元素样式、ID
	if (!_cssClass) {
		_cssClass=LC.CommonProperty.CSS_BUTTON_DROPDOWN;
	};
	var element = new LC.Components.BasicComponent();
	if (_id) {
		element.setSignID(_id);
	};
	if(_num!=0){_cssClass+=LC.CommonProperty.CSS_HIDE_SHRINK;}
	element.creatDOM("div",_cssClass);
	if(_text){
		element.dom.append(_text);
	};
	element.dom.css({"display" : "inline-block"});
	//将元素放入数组
	this._elements.splice(Number(_num),0,element);
	//更新菜单
	this.dom.empty();
	var elementsLength = this._elements.length;
	//将第一个元素置顶，并绑定点击事件
	this._elements[0].dom.css({"z-index":"2"});
	this._elements[0].dom.bind("click",function(e){
		var targets = $(e.target).siblings();
		var targetsLength = $(e.target).siblings().length+1;
		var hidetime = 0.2*(targetsLength-1);
		var showtime = 0.2;
		for (var j=0; j < targetsLength; j++) {
			var className = targets.eq(j).attr("class");
			if (-1 == className.search(LC.CommonProperty.CSS_HIDE_SHRINK.trim())) {//校验是否被隐藏
				className+=LC.CommonProperty.CSS_HIDE_SHRINK;
				hidetime -= 0.2;
				targets.eq(j).css({"transition-delay":hidetime+"s"});
				targets.eq(j).attr({
					"class" : className
				});
			}else{
				showtime += 0.2;
				targets.eq(j).css({"transition-delay":showtime+"s"});
				targets.eq(j).attr({
					"class" : className.replace(LC.CommonProperty.CSS_HIDE_SHRINK, "")
				});
			}
		};
	});
	for (var i=0; i < elementsLength ; i++) {
		this.dom.append(this._elements[i].dom);
	};
	return this;
};
LC.Components.DropdownLeft.prototype.getElement = function(_num){
	return this._elements[_num];
};
LC.Components.DropdownLeft.prototype.removeElement = function(_num){
	return this._elements.splice(Number(_num),1);
};

//===============右横拉菜单=========================
/**
 * 组件空间中加入下拉菜单类
 */
LC.Components.DropdownRight = function() {
};
LC.Utils.extend(LC.Components.DropdownRight, LC.Components.BasicComponent);
LC.Components.DropdownRight.prototype.setText = function(text) {
	this.dom.append(text);
	return this;
};
/**
 * 为菜单添加按钮元素
 * @param {Number} _num 按钮位置序号
 * @param {String} _text 菜单文本
 * @param {String} _cssClass 重设按钮样式
 * @param {String} _id
 */
LC.Components.DropdownRight.prototype.addElement = function(_num,_text,_cssClass,_id){
	if(!this._elements){
		this._elements = new Array();
	}
	//（未完成）校验_num为正整数
	//创建元素，设定元素样式、ID
	if (!_cssClass) {
		_cssClass=LC.CommonProperty.CSS_BUTTON_DROPDOWN;
	};
	var element = new LC.Components.BasicComponent();
	if (_id) {
		element.setSignID(_id);
	};
	if(_num!=0){_cssClass+=LC.CommonProperty.CSS_HIDE_SHRINK;}
	element.creatDOM("div",_cssClass);
	if(_text){
		element.dom.append(_text);
	};
	element.dom.css({"display" : "inline-block"});
	//将元素放入数组
	this._elements.splice(Number(_num),0,element);
	//更新菜单
	this.dom.empty();
	var elementsLength = this._elements.length;
	//将第一个元素置顶，并绑定点击事件
	var menudom = this._elements[0].dom;
	menudom.css({"z-index":"2"});
	menudom.bind("click",function(e){
		var targets = $(e.target).siblings();
		var targetsLength = $(e.target).siblings().length+1;
		var hidetime = 0.2;
		var showtime = 0.2*(targetsLength-1);
		for (var j=0; j < targetsLength; j++) {
			var className = targets.eq(j).attr("class");
			if (-1 == className.search(LC.CommonProperty.CSS_HIDE_SHRINK.trim())) {//校验是否被隐藏
				className+=LC.CommonProperty.CSS_HIDE_SHRINK;
				hidetime += 0.2;
				targets.eq(j).css({"transition-delay":hidetime+"s"});
				targets.eq(j).attr({
					"class" : className
				});
			}else{
				showtime -= 0.2;
				targets.eq(j).css({"transition-delay":showtime+"s"});
				targets.eq(j).attr({
					"class" : className.replace(LC.CommonProperty.CSS_HIDE_SHRINK, "")
				});
			}
		};
	});
	for (var i=1; i < elementsLength ; i++) {
		this.dom.append(this._elements[i].dom);
	};
	//最后加入第一个元素
	this.dom.append(menudom);
	return this;
};
LC.Components.DropdownRight.prototype.getElement = function(_num){
	return this._elements[_num];
};
LC.Components.DropdownRight.prototype.removeElement = function(_num){
	return this._elements.splice(Number(_num),1);
};
/**
 * 组件空间中加入菜单工厂
 */
LC.Components.DropdownFactory = {
	/**
	 * 菜单，创建并返回一个关闭按钮html对象Menu，调用.append()加入页面中显示
	 * @param {String} _id 菜单id
	 * @param {String} _cssClass 菜单样式
	 */
	createDropdown : function(_id,_cssClass) {
		var dropdown = new LC.Components.Dropdown();
		if (_cssClass){
			dropdown.setSignID(_id).creatDOM("div",_cssClass);
		}else{
			dropdown.setSignID(_id).creatDOM("div",LC.CommonProperty.CSS_DROPDOWN);
		}
		return dropdown;
	},
	/**
	 * 菜单，创建并返回一个关闭按钮html对象Menu，调用.append()加入页面中显示
	 * @param {String} _id 菜单id
	 * @param {String} _cssClass 菜单样式
	 */
	createDropdownUp : function(_id,_cssClass) {
		var dropdown = new LC.Components.DropdownUp();
		if (_cssClass){
			dropdown.setSignID(_id).creatDOM("div",_cssClass);
		}else{
			dropdown.setSignID(_id).creatDOM("div",LC.CommonProperty.CSS_DROPDOWN);
		}
		return dropdown;
	},
	/**
	 * 菜单，创建并返回一个关闭按钮html对象Menu，调用.append()加入页面中显示
	 * @param {String} _id 菜单id
	 * @param {String} _cssClass 菜单样式
	 */
	createDropdownLeft : function(_id,_cssClass) {
		var dropdown = new LC.Components.DropdownLeft();
		if (_cssClass){
			dropdown.setSignID(_id).creatDOM("div",_cssClass);
		}else{
			dropdown.setSignID(_id).creatDOM("div",LC.CommonProperty.CSS_DROPDOWN);
		}
		return dropdown;
	},
	/**
	 * 菜单，创建并返回一个关闭按钮html对象Menu，调用.append()加入页面中显示
	 * @param {String} _id 菜单id
	 * @param {String} _cssClass 菜单样式
	 */
	createDropdownRight : function(_id,_cssClass) {
		var dropdown = new LC.Components.DropdownRight();
		if (_cssClass){
			dropdown.setSignID(_id).creatDOM("div",_cssClass);
		}else{
			dropdown.setSignID(_id).creatDOM("div",LC.CommonProperty.CSS_DROPDOWN);
		}
		return dropdown;
	}
};
