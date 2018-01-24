/**
 * 组件空间中装入场景类
 * @param {Object} 场景id
 */
LC.Components.Scene = function(sceneID) {
	var _signID = sceneID;
	//自定义ID
	if ( typeof this.getSignID != "function") {
		/**
		 * 获取自定义ID
		 */
		LC.Components.Scene.prototype.getSignID = function() {
			return _signID;
		};
	};
	if ( typeof this.setSignID != "function") {
		/**
		 * 设置自定义ID
		 */
		LC.Components.Scene.prototype.setSignID = function(ID) {
			_signID = ID;
			return this;
		};
	};
	if ( typeof this.hide != "function") {
		/**
		 * 去除
		 */
		LC.Components.Scene.prototype.hide = function(fn) {
			var domTemp = this.dom;
			fn = function(){
				alert(1);
				//domTemp.remove();
			};
			this.dom.css({"opacity": "0"})[0].addEventListener("transitionend", fn, false);
			//this.dom.remove();
			return this;
		};
	};
	if ( typeof this.styleAlter != "function") {
		/**
		 * 样式修改(子类继承扩展)
		 * @param {Object} scene 场景对象
		 * @param {Function} fn 修改函数
		 */
		LC.Components.Scene.prototype.styleAlter = function(scene, fn) {
			if ( typeof fn == "function") {
				fn(scene);
			}
			return scene;
		};
	};
	/**
	 * 获取的DOM对像，通过.append()加入页面
	 */
	dom=null;
	if ( typeof this.creatSceneDOM != "function") {
		/**
		 * 创建DOM对像
		 * @return sceneDOM
		 */
		LC.Components.Scene.prototype.creatSceneDOM = function() {
			var sign = LC.CommonProperty.SIGN;
			var scene = $("<div></div>").attr({
				sign : _signID,
				"class" : "scene-desktop"
			});
			this.dom = this.styleAlter(scene);
			return this.dom;
		};
	};
};
/**
 * 组件空间中加入场景工厂
 */
LC.Components.SceneFactory = {
	/**
	 * 场景基本样式，创建并返回一个场景html对象scene，调用.append()加入页面中显示
	 * @param {Object} sceneID 场景id
	 */
	createScene : function(sceneID) {
		var returnScene = new LC.Components.Scene();
		returnScene.setSignID(sceneID).creatSceneDOM();
		return returnScene;
	}
};