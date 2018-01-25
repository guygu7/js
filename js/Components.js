/**
 * 高级组件
 */
LC.AdvancedComponents = {};
/**
 * 包装面板（包裹、物品栏） 
 */
LC.AdvancedComponents.PackingPanelFactory = {
	creatPackage : function(){
		var panle = new LC.Components.Panel();
		panle.setSignID(panelID).creatPanelDOM().css({
			"width":"200px",
			"height":"400px"
		});
		
	}
};
