const jwt = require('../../../node_modules/jsonwebtoken');
const Controller = require('egg').Controller;

/*const keys = this.config.keys;
const maxAge = this.config.maxAge;*/

class User extends Controller {
    async login() {
        const ctx = this.ctx;
        try {
            const {username, password} = ctx.request.body;
            if (!username || !password) {
                throw new Error();
            }
            let rs = await ctx.service.user.index.login(username);
            if (!rs) {
                throw new Error('用户不存在');
            } else if (rs.passWord !== password) {
                throw new Error('密码错误');
            } else {
                let token = jwt.sign({
                    user_id: rs.userId,
                    user_name: rs.userName
                }, this.config.token.keys, {
                    expiresIn: this.config.token.maxAge //时间根据自己定，具体可参考jsonwebtoken插件官方说明 1h
                });
                await ctx.service.user.index.updateToken(rs.userId, token);
                this.ctx.body = {
                    code: 200,
                    token: token,
                    msg: 'success'
                }
            }
        } catch (err) {
            this.ctx.body = {
                code: 0,
                msg: err.message
            }
        }
    };

    async getUserInfo() {
        const ctx = this.ctx;
        try {
            let token = ctx.request.header['authorization'];
            let rs = await ctx.service.user.index.getUserInfo(token);
            this.ctx.body = {
                code: 200,
                data: rs,
                msg: 'success'
            }
        } catch (err) {
            this.ctx.body = {
                code: 0,
                msg: err.message
            }
        }
    }
}

module.exports = User;