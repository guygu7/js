/**
 * 组件空间中加入table类
 */
LC.Components.Table = function() {
};
LC.Utils.extend(LC.Components.Table, LC.Components.BasicComponent);
/**
 * 参数：</br>
 * _line 行数,_column 列数,_width 元素格子宽度,_height 元素格子高度,cssclass 用于变换小格子样式
 * @param {Number} _line
 * @param {Number} _column
 * @param {String} _width
 * @param {String} _height
 * @param {Function|String} createFunction
 */
LC.Components.Table.prototype.creatDOM = function(_line, _column, _width, _height, cssclass) {
	var sign = LC.CommonProperty.SIGN;
	var basicComponent = $("<table></table>").attr({
		sign : this.getSignID(),
	});
	var tempColumn;
	var cell;
	var tb;
	var classname = LC.CommonProperty.CSS_PANEL_TABLE_TB;
	if (cssclass) {
		classname = " " + cssclass + " ";
	}
	//由于this会发生变化，暂存ID
	var signId = this.getSignID();
	for (var i = 0; i < _line; i++) {
		tempColumn = $("<tr></tr>");
		for (var j = 0; j < _column; j++) {
			//创建<tb>的组件对象，方便操作
			var tb = new LC.Components.BasicComponent();
			tb.setSignID((j + 1) + "-" + (i + 1)).creatDOM("tb", classname).css({
				"width" : _width,
				"height" : _height
			});
			//插入虚内容元素
			cell = new LC.Components.BasicComponent();
			cell.setSignID(signId + "-" + (j + 1) + "-" + (i + 1)).creatDOM("div");
			cell.dom.css({
				"width" : _width,
				"height" : _height
			});
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
LC.Components.Table.prototype.getCell = function(_line, _column) {
	return this.cellsMap.get((_column + "-" + _line).toString());
};
//替换table中tb对象中包含的cell对象元素对象
//obj必须为包含dom的完整对象
LC.Components.Table.prototype.setCell = function(_line, _column, obj) {
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
	 * table 型号51X51中格子，创建并返回一个html对象table，调用.append()加入页面中显示</br>
	 * 参数:</br>
	 * line 行数,_column 列数,_gridSize 格子大小("big"|"small"|像素px),_id id
	 * @param {Number} _line
	 * @param {Number} _column
	 * @param {Number} _gridSize
	 * @param {String} _id
	 */
	createTable : function(_line, _column, _gridSize, _id) {
		var gridWidth = "40px";
		var gridHeight = "40px";
		if (_gridSize) {
			if ("big" == _gridSize) {
				gridWidth = "60px";
				gridHeight = "60px";
			} else if ("small" == _gridSize) {
				var gridWidth = "25px";
				var gridHeight = "25px";
			} else {
				gridWidth = _gridSize;
				gridHeight = _gridSize;
			}
		}
		var table = new LC.Components.Table();
		table.setSignID(_id).creatDOM(_line, _column, gridWidth, gridHeight);
		return table;
	},
};
