/**
 * 高级组件
 */
LC.AdvancedComponents = {};
//开始菜单

//次页面面板（包裹、物品栏）

/**
 * 包装面板（包裹、物品栏）
 */
LC.AdvancedComponents.PackingPanelFactory = {
	/**
	 * 包装面板（包裹、物品栏）</br>
	 * 参数：</br>
	 * Int x:列数;</br>
	 * Int Y:行数;</br>
	 * String signID:ID</br>
	 * Function|String createFunction:工厂创建方法，或者css class</br>
	 * @param {Int} x
	 * @param {Int} y
	 * @param {String} signID
	 * @param {Function|String} createFunction
	 */
	creatTable : function(x,y,signID,createFunction) {
		var table = new LC.Components.BasicComponent();
		table.setSignID(signID).creatDOM("table");
		var cell; 
		for (var i = 0; i < y; i++) {
			tempy = $("<tr></tr>");
			for (var j = 0; j < x; j++) {
				if (typeof createFunction == "function") {
					cell = createFunction(signID+"-"+(j+1)+"-"+(i+1)).dom;
				} else if(typeof createFunction == "string") {
					cell = new LC.Components.BasicComponent();
					cell = cell.setSignID(signID+"-"+(j+1)+"-"+(i+1)).creatDOM("div",createFunction);
				};
				tempy.append($("<tb></tb>").append(cell));
			};
			table.dom.append(tempy);
		};
		return table;
	}
};
