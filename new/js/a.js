function getXMLHttpRequest() {
	var xmlHttpReq;
	try {// Firefox, Opera 8.0+, Safari
		xmlHttpReq = new XMLHttpRequest();
	} catch (e) {
		try {// Internet Explorer
			xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
			}
		}
	}
	return xmlHttpReq;
}

function getXMLHttpRequest() {
	var xmlHttpReq = null;
	if (window.ActiveXObject) {// Internet Explorer
		xmlHttpReq = new ActiveXObject("MSXML2.XMLHTTP.3.0");
	} else if (window.XMLHttpRequest) {
		xmlHttpReq = new XMLHttpRequest();
	}
	return xmlHttpReq;
}

function getXMLHttpRequest() {
	var xmlHttpReq = null;
	if (window.XMLHttpRequest) {// Mozilla Firefox, Opera 8.0+, Safari
		xmlHttpReq = new XMLHttpRequest();
	} else {
		if (window.ActiveXObject) {// Internet Explorer
			try {
				xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				try {// Internet Explorer
					xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {
				}
			}
		}
	}
	return xmlHttpReq;
} 