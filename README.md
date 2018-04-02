# js
影响运行效率的因素：
1.数组，当循环中大量读写数组是影响明显
	可以用对象替代，如
	a = {
		0:a1,
		1:a2,
		2:a3
	}
2.jQuery,使用jquery操作dom将会有一定影响
3.递归，会占用大量内存
	尽量将递归改为循环，或者尾递归
	循环模拟递归方法：
		创建一个var stack,
		将传入参数（对象）放入stack中，
		循环中需要递归再次传入的参数（对象）放入stack中，
		每次循环结束时将当前循环开始时放入的参数（对象）从stack中移除，
		如此循环直至stack为空则模拟递归结束；
4.console命令会占用一定资源

5.使用了eval()方法，js压缩时可能出现问题（未证实）
位置：core.js - LC.Components.ComponentFunction.event function