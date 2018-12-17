// config/config.default.js
module.exports = appInfo => {
    // add your config here
    const config = {
        sequelize: { //mysql ORM
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'form',
        },
        security: {
            csrf: { //禁用 csrf  post安全问题
                enable: false,
            },
            domainWhiteList: ['http://localhost:8080'] //post跨域地址
        },
        keys: 'asd13125rfff_343',
        middleware: [], // add your config here
        token: {
            keys: '111111111',
            maxAge: '12h',
        }
    };
    return config;
};
/*跨域插件*/
exports.cors = {
    enable: true,
    package: 'egg-cors',
};
