//初始化公共层
//用于各类程序初始化

(function () {
	window.MS = {};
	window.MCSERVER = {};
	window.PAGE = new Object();

	var MI = window.MI = function () {
		return null;
	};

	var _maskEventList = {};
	var _routeEvebtList = {};

	MI.page = new Object();
	MI.rListener = function (event, callback) {
		_maskEventList[event] = callback;
	}

	MI.rOn = function (event, msg) {
		if (_maskEventList[event]) _maskEventList[event](msg);
	}

	MI._listener = function (src, event, callback) {
		if (src.hasOwnProperty(event)) {
			src[event].push(callback);
		} else {
			src[event] = [callback];
		}
		return this;
	}

	MI._on = function (src, event, msg) {
		if (src.hasOwnProperty(event)) {
			for (var i in src[event]) {
				if (src[event][i] == undefined) delete src[event][i];
				if (typeof src[event][i] != "function") delete src[event][i];
				src[event][i](msg);
			}
		}
		return this;
	}

	//	用于常用的观察者模型
	MI.listener = function (event, callback) {
		MI._listener(_maskEventList, event, callback);
	}
	MI.on = function (event, msg) {
		MI._on(_maskEventList, event, msg);
	}

	//	用于给ajax路由进行操作的 观察者模型
	MI.routeListener = function (event, callback) {
		MI._listener(_routeEvebtList, event, callback);
	}
	MI.routeOn = function (event, msg) {
		MI._on(_routeEvebtList, event, msg);
	}

	MI.onDestroy = function (event, funcPrint) {
		for (var i in _maskEventList[event]) {
			if (funcPrint == _maskEventList[event][i]) {
				delete _maskEventList[event][i];
			}

		}
	}

})();

//基本的数据模型
;
(function () {

	window.VIEW_MODEL = function () {
		return this;
	};

	var bindList = {};

	function addApp(bind, app) {
		if (app.data) {
			for (var k in app.data) {
				VIEW_MODEL[bind][k] = app.data[k];
			}
		}
		app.data = VIEW_MODEL[bind];
		var tmp_app = new Vue(app);
		if (bindList[app.el]) delete bindList[app.el];
		bindList[app.el] = tmp_app;
	}

	// 间接性的实例化Vue
	VIEW_MODEL.newVue = function (bind, app) {
		if (VIEW_MODEL[bind] == undefined) VIEW_MODEL[bind] = {};
		addApp(bind, app);
	}

	VIEW_MODEL.newVueOnce = function (bind, app) {
		if (VIEW_MODEL[bind] == undefined) VIEW_MODEL[bind] = {};
		if (bindList[app.el]) {
			//			console.log(app.el + '的第二次绑定拒绝');
			return;
		}
		addApp(bind, app);
	}

	//过滤函数
	MI.routeCopy = function (appName, data) {
		if (!VIEW_MODEL[appName]) VIEW_MODEL[appName] = {};
		for (var key in data) {
			VIEW_MODEL[appName][key] = data[key];
		}
	}
	//事件转接
	MI.listener('ws/response', function (obj) {

		MI.routeOn(obj['ResponseKey'], {
			obj: obj['ResponseValue'],
			body: obj.body
		});
	});

})();

//左侧菜单
(function () {
	var $SideCol = $('#SideCol');;
	var $SideColMenu = $('#SideColMenu');;
	var $MasterLogo = $('#MasterLogo');
	var $ML = $('#ML');
	 $Container = $('#Container');

	// 获取菜单栏状态
	MCSERVER.getColmStatus = function () {
		if ($SideCol[0].style.display == 'none') {
			return false;
		}
		return true;
	}

	MCSERVER.colmSet = function (booleans) {
		MI.on('colmchange', null); //触发事件
		if (!booleans) {
			$SideCol.css({
				'width': '0',
			});
			 $Container.css({
		 	    'left': '0px'
			 });
			 $ML.css({
		 	     'display': 'none'
		   	  });
			  $SideColMenu.css({
				'display': 'none'
			  });
			MI.on('colmchangeEnd', null); //触发事件
		} else {
			 $ML.css({
		 	     'display': 'unset'
		   	  });
			 $Container.css({
			 	'left': 'unset'
			 });
			$SideCol.css({
				'display': 'block',
				'width': '100%'
			});
			$SideColMenu.css({
				'display': 'block'
			});
			MI.on('colmchangeEnd', null); //触发事件
			 $Container.removeAttr('style')
		}
	}

	MCSERVER.colmDo = function () {
		 if ($Container[0].style.left == '0px') {
		 	MCSERVER.colmSet(true);
		 } else {
		 	MCSERVER.colmSet(false);
		 }
	}

	MCSERVER.autoColmDo = function () {
		// if (document.body.clientWidth <= 780) {
			// MCSERVER.colmSet(false);
		// } else {
			// MCSERVER.colmSet(true);
		// }
	}

	//事件綁定
	MI.listener('resize', function () {
		MCSERVER.autoColmDo();
	});
	window.onload = MCSERVER.autoColmDo;

	//	if(document.body.clientWidth <)
})();

//定时提示 一言API
//别问我为啥这么长
var now = new Date();
        var hour = now.getHours();
        if(hour < 4) {
			$.ajax({
				type: 'GET',
				url: 'https://v1.hitokoto.cn/?encode=text',
				dataType: 'jsonp',
				jsonp: 'callback',
				jsonpCallback: 'hitokoto',
				success (data) {
					mdui.snackbar({
					message: data,
					position: 'top'
				});
				},
					error (jqXHR, textStatus, errorThrown) {
				// 错误信息处理
					console.error(textStatus, errorThrown)
				}
			})
        }else if(hour < 6) {
            $.ajax({
				type: 'GET',
				url: 'https://v1.hitokoto.cn/?encode=text',
				dataType: 'jsonp',
				jsonp: 'callback',
				jsonpCallback: 'hitokoto',
				success (data) {
					mdui.snackbar({
					message: data,
					position: 'left-bottom'
				});
				},
					error (jqXHR, textStatus, errorThrown) {
				// 错误信息处理
					console.error(textStatus, errorThrown)
				}
			})
        }else if(hour < 7) {
            $.ajax({
				type: 'GET',
				url: 'https://v1.hitokoto.cn/?encode=text',
				dataType: 'jsonp',
				jsonp: 'callback',
				jsonpCallback: 'hitokoto',
				success (data) {
					mdui.snackbar({
					message: data,
					position: 'left-bottom'
				});
				},
					error (jqXHR, textStatus, errorThrown) {
				// 错误信息处理
					console.error(textStatus, errorThrown)
				}
			})
        }else if(hour < 12) {
			$.ajax({
				type: 'GET',
				url: 'https://v1.hitokoto.cn/?encode=text',
				dataType: 'jsonp',
				jsonp: 'callback',
				jsonpCallback: 'hitokoto',
				success (data) {
					mdui.snackbar({
					message: data,
					position: 'left-top'
				});
				},
					error (jqXHR, textStatus, errorThrown) {
				// 错误信息处理
					console.error(textStatus, errorThrown)
				}
			})
        }else if(hour < 14) {
			$.ajax({
				type: 'GET',
				url: 'https://v1.hitokoto.cn/?encode=text',
				dataType: 'jsonp',
				jsonp: 'callback',
				jsonpCallback: 'hitokoto',
				success (data) {
					mdui.snackbar({
					message: data,
					position: 'right-top'
				});
				},
					error (jqXHR, textStatus, errorThrown) {
				// 错误信息处理
					console.error(textStatus, errorThrown)
				}
			})
        }else if(hour < 17) {
			$.ajax({
				type: 'GET',
				url: 'https://v1.hitokoto.cn/?encode=text',
				dataType: 'jsonp',
				jsonp: 'callback',
				jsonpCallback: 'hitokoto',
				success (data) {
					mdui.snackbar({
					message: data,
					position: 'right-top'
				});
				},
					error (jqXHR, textStatus, errorThrown) {
				// 错误信息处理
					console.error(textStatus, errorThrown)
				}
			})
        }else if(hour < 19) {
			 $.ajax({
				type: 'GET',
				url: 'https://v1.hitokoto.cn/?encode=text',
				dataType: 'jsonp',
				jsonp: 'callback',
				jsonpCallback: 'hitokoto',
				success (data) {
					mdui.snackbar({
					message: data,
					position: 'right-bottom'
				});
				},
					error (jqXHR, textStatus, errorThrown) {
				// 错误信息处理
					console.error(textStatus, errorThrown)
				}
			})
        }else if (hour < 22) {
			$.ajax({
				type: 'GET',
				url: 'https://v1.hitokoto.cn/?encode=text',
				dataType: 'jsonp',
				jsonp: 'callback',
				jsonpCallback: 'hitokoto',
				success (data) {
					mdui.snackbar({
					message: data,
					position: 'bottom'
				});
				},
					error (jqXHR, textStatus, errorThrown) {
				// 错误信息处理
					console.error(textStatus, errorThrown)
				}
			})
        }else{
            mdui.snackbar({
                message: '你是夜猫子吗？快去睡觉！现在都' + now.getHours()  + '点了',
                position: 'bottom'
            });
		}
		
//终端控制
		function closewt(){
		window.MCSERVER.term.clear();
		//退出监听实例，停止接受控制台信息
		WS.sendMsg('server/console/remove', '');
		$('#WebTerminalScreenWapper').css('display', 'none');
		MCSERVER.term.clear();
		MCSERVER.term.prompt();
		}
		function minwt(){
		 $('#WebTerminalScreenWapper').toggle();
		 $('.twt').toggle();
		 
		}
	