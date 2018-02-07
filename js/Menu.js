/**
 * 组件空间中加入开始菜单类
 */
LC.Components.Dropdown = function() {
};
LC.Utils.extend(LC.Components.Dropdown, LC.Components.BasicComponent);
LC.Components.Dropdown.prototype.setText = function(text) {
	this.dom.append($("<div></div>").css({
		"margin" : "auto"
	}).append(text));
	return this;
};
/**
 * 1. 按钮序号
 * 2. 按钮文本
 * 3. 按钮样式重设
 * 4. 按钮ID
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
	element.creatDOM("div",_cssClass);
	if(_text){
		element.dom.append($("<div></div>").css({
			"position": "relative",
			"top": "50%",
	        "transform": "translateY(-50%)"
		}).append(_text));
	};
	//将元素放入数组
	this._elements.splice(Number(_num-1),0,element);
	//更新菜单
	this.dom.empty();
	var elementsLength = this._elements.length;
	var width = 0;
	var height = 0;
	for (var i=0; i < elementsLength ; i++) {
		if(i==0){//将第一个元素置顶，并绑定点击事件
			this._elements[i].dom.css({"z-index":"2"});
			this._elements[i].dom.bind("click",function(e){
				console.log($(e.target).eq(1).height());
				if($(e.target).eq(1).height()==0){
					$(e.target).siblings().css({"height":"50px"});
				}else{
					$(e.target).siblings().css({"height":"0px"});
				}
			});
		}
		console.log(this._elements[i].dom.outerWidth(true));
		this.dom.append(this._elements[i].dom);
	};
	return this;
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
	}
};
