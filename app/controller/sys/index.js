const Controller = require('egg').Controller;
const setMenu = require('../../../lib/setMenu');

class Sys extends Controller {
    /**
     * 菜单
     */
    async menu() {
        const ctx = this.ctx;
        try {
            let rs = await ctx.service.sys.index.menu();
            /*格式化数据*/
            rs = await setMenu.GetData(0, JSON.parse(JSON.stringify(rs)));
            ctx.body = {
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

module.exports = Sys;