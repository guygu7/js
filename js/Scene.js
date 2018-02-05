/**
 * 组件空间中装入场景类
 */
LC.Components.Scene=function(){};
LC.Utils.extend(LC.Components.Scene,LC.Components.BasicComponent);
/**
 * 组件空间中加入场景工厂
 */
LC.Components.SceneFactory = {
	/**
	 * 场景基本样式，创建并返回一个场景html对象scene，调用.append()加入页面中显示
	 * @param {Object} sceneID 场景id
	 */
	createScene : function(sceneID) {
		var scene = new LC.Components.Scene();
		scene.setSignID(sceneID).creatDOM("div",LC.CommonProperty.CSS_SCENE_DESKTOP);
		scene.hide = function(cssClass){
			if(null==cssClass||""==cssClass.trim()){
				cssClass=LC.CommonProperty.CSS_HIDE_EXPAND;
			};
			scene.constructor.prototype.hide.call(scene,cssClass);
		};
		return scene;
	}
};