(function () {
	// 菜单 数据
	MCSERVER.meumObject = {};

	//非管理员
	MCSERVER.meumObject.notMasterMeum = [{
		class: 'home', //html元素 类
		name: '用户中心', //菜单名
		link: './template/gen_home.html', //单击时跳转目的
		api: 'genuser/home', //通过 Webscoket 后端请求的API,null为不请求,
		select: false
	}, {
		class: 'folder', //html元素 类
		name: '文件管理', //菜单名
		link: './template/gen_filemanager.html', //单击时跳转目的
		api: 'genuser/home', //通过 Webscoket 后端请求的API,null为不请求,
		select: false
	}, {
		class: 'live_help',
		name: '技术支持',
		link: './template/gen_about.html',
		api: null,
		select: false
	},]

	//管理员的
	//注意，这些页面只能管理员访问，普通用户就算访问，也得不到任何数据
	MCSERVER.meumObject.masterMeum = [{
		class: 'storage',
		name: '主页',
		link: './template/homepage.html',
		api: null,
		select: false
	},{
		class: 'equalizer',
		name: '监控数据中心',
		link: './template/center.html',
		api: 'center/show',
		select: false
	}, {
		class: 'storage',
		name: '服务端管理',
		link: './template/server.html',
		api: 'server/view',
		select: false
	}, {
		class: 'people',
		name: '用户管理',
		link: './template/userset.html',
		api: 'userset/update',
		select: false
	}, {
		class: 'folder',
		name: '文件管理',
		link: './template/filemanager.html',
		api: 'genuser/home',
		select: false
	}, {
		class: 'live_help',
		name: '服务',
		link: './template/feelback.html',
		api: null,
		select: false
	}]

})();