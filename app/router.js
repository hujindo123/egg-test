module.exports = app => {
    const {router, controller} = app;
    const checktoken = app.middleware.checktoken({}, app);
    /*物理路径*/
    router.post('/user/login', controller.user.index.login);//登录
    router.get('/user/info', checktoken, controller.user.index.getUserInfo);//获取用户信息
    router.get('/sys/menu', checktoken, controller.sys.index.menu);//获取菜单
};