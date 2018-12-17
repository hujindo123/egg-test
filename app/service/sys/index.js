const Service = require('egg').Service;

class Sys extends Service {
    /**
     * 菜单服务
     */
    async menu() {
        return await this.app.mysql.select('sys_menu',{});
    }
}

module.exports = Sys;