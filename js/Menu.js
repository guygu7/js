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
LC.Components.Dropdown.prototype.setElement = function(_num,_test,_cssClass,_id){
	if(!this._elementMap){
		this._elementMap = new LC.Utils.Map();
	}

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
