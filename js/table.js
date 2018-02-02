/**
 * 组件空间中加入table类
 */
LC.Components.Table = function() {
};
LC.Utils.extend(LC.Components.Table, LC.Components.BasicComponent);
LC.Components.Table.prototype.creatDOM = function( _line, _column,createFunction) {
	var sign = LC.CommonProperty.SIGN;
	var basicComponent = $("<table></table>").attr({
		sign : this.getSignID(),
	});
	var tempColumn;
	var cell;
	var tb;
	//由于this会发生变化，暂存ID
	var signId = this.getSignID();
	for (var i = 0; i < _line; i++) {
		tempColumn = $("<tr></tr>");
		for (var j = 0; j < _column; j++) {
			//遍历插入传入的基本组件|样式，如果没有不插入
			if ( typeof createFunction == "function") {//是一个工厂创建函数，则取dom
				cell = createFunction(signId + "-" + (j + 1) + "-" + (i + 1));
			} else if ( typeof createFunction == "string") {//是一个cssclass，则创建一个div
				cell = new LC.Components.BasicComponent();
				cell.setSignID(signId + "-" + (j + 1) + "-" + (i + 1)).creatDOM("div", createFunction);
			}
			//创建<tb>的组件对象，方便操作
			var tb = new LC.Components.BasicComponent();
			tb.setSignID((j + 1) + "-" + (i + 1)).creatDOM("tb");
			//将cell放入tb内
			tb.cell = cell;
			//将cell.dom放入tb.dom中
			tb.dom.append(cell.dom);
			//将tb放入cellsMap中
			this.cellsMap.put(((j + 1) + "-" + (i + 1)).toString(), tb);
			tempColumn.append(tb.dom);
		};
		basicComponent.append(tempColumn);
	};
	this.dom = this.styleAlter(basicComponent);
	this.dom.self = this;
	return this.dom;
};
//table中元素集合,map中为完整<tb>元素对象,dom需要obj.dom获得
LC.Components.Table.prototype.cellsMap = new LC.Utils.Map();
//获取table中tb元素对象,tb中包含一个cell对象
LC.Components.Table.prototype.getCell = function( _line,_column) {
	return this.cellsMap.get((_column + "-" + _line).toString());
};
//替换table中tb对象中包含的cell对象元素对象
//obj必须为包含dom的完整对象
LC.Components.Table.prototype.setCell = function( _line, _column,obj) {
	//1.从cellsMap中取出tb,重设tb中cell
	var tb = this.cellsMap.get((_column + "-" + _line).toString());
	if (!tb) {
		console.log("操作无效，没有从table中获取到对象。");
		return this;
	}
	tb.cell = obj;
	//2.替换tb.dom中的子dom
	tb.dom.empty().append(obj.dom);
	//3.重新放入cellsMap，替换原tb对象
	this.cellsMap.put((_column + "-" + _line).toString(), tb);
	return this;
};
/**
 * 组件空间中加入table工厂
 */
LC.Components.TableFactory = {
	/**
	 * table，创建并返回一个html对象table，调用.append()加入页面中显示
	 * @param {String} _id id
	 */
	createTable : function( _line, _column,_id) {
		var table = new LC.Components.Table();
		table.setSignID(_id).creatDOM( _line, _column,LC.Components.PanelFactory.createPanel2);
		return table;
	}
};
