var map;
var mapDom;
onmessage = function (event){
	importScripts("../jquery-3.2.1/jquery-3.2.1.min.js");
	importScripts("core.js");
	importScripts("BasicComponent.js");
	importScripts("Components.js");
	importScripts("Menu.js");
	importScripts("Scene.js");
	importScripts("panel.js");
	importScripts("button.js");
	importScripts("table.js");
	importScripts("corner.js");
	importScripts("progressbar.js");
	importScripts("dataModel.js");
	console.log(LC);
	console.log(event.data);
	var num = event.data[0];
	var createMap = event.data[1];
	var drawMap = event.data[2];
	map = createMap(event.data,event.data);
	mapDom = createMap(map);
	postMessage(mapDom);
};


/*
onmessage = function (event) {
	console.log(event);
	console.log(event.data);
    //娴狅拷閸旂姴鍩宯um
    var num = event.data;
    var result = 0;
    for (var i = 1; i <= num; i++) {
        result += i;
    }
    postMessage(result);
};


*/

