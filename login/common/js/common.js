(function () {
	var MI = window.MI = function () {
		return null;
	};
	var _maskEventList = {};

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
			 $MasterLogo.css({
				 'width': '0',
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
			 	'left': '180px'
			 });
			 $Container.css({
			 	'left': '0px'
			 });
			$SideCol.css({
				'display': 'block',
				'width': '220px'
			});
			$MasterLogo.css({
				'width':'220px'
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
		if (document.body.clientWidth <= 780) {
			MCSERVER.colmSet(false);
		} else {
			MCSERVER.colmSet(true);
		}
	}

	//事件綁定
	MI.listener('resize', function () {
		MCSERVER.autoColmDo();
	});
	window.onload = MCSERVER.autoColmDo;

	//	if(document.body.clientWidth <)
})();

//定时提示
var now = new Date();
        var hour = now.getHours();
        if(hour < 4) {
			mdui.alert('这么晚了还不睡？命重要哦~','温馨提示');
        }else if(hour < 6) {
            mdui.snackbar({
                message: '早上好呀！你昨晚睡觉了吗？'   ,
                position: 'left-bottom'
            });
        }else if(hour < 7) {
            mdui.snackbar({
                message: '早上好呀！你吃早饭了吗？'   ,
                position: 'left-bottom'
            });
        }else if(hour < 12) {
			 mdui.snackbar({
                message: '上午好！又开始辛勤的一天了呢！'   ,
                position: 'left-top'
            });
        }else if(hour < 14) {
			 mdui.snackbar({
                message: '中午好！忙完了记得看一眼服务器状态哦~'   ,
                position: 'top'
            });
        }else if(hour < 17) {
			 mdui.snackbar({
                message: '下午好！中午都在干啥呢？'   ,
                position: 'right-top'
            });
        }else if(hour < 19) {
			 mdui.snackbar({
                message: '傍晚了，我猜你一定摸了一天的鱼~'   ,
                position: 'right-bottom'
            });
        }else if (hour < 22) {
			 mdui.snackbar({
                message: '晚上好！是又准备打游戏开黑了吗？'   ,
                position: 'bottom'
            });
        }else{
            mdui.snackbar({
                message: '你是夜猫子吗？快去睡觉！现在都' + now.getHours()  + '点了',
                position: 'bottom'
            });
		}