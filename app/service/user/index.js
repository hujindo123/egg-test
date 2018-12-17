const Service = require('egg').Service;

class User extends Service {
    async login(userName) {
        return await this.app.model.User.find({
            where: {userName: userName},
            raw: true
        });
    };

    async updateToken(userId, token) {
        return await  this.app.model.Token.update({
            token: token
        }, {
            where: {
                userId: userId
            }
        })
    };

    async getUserInfo(token) {
        console.log(token);
        return await this.app.model.User.findAll({
            include: {
                model: this.app.model.Token,
                where: {token: token}
            },
        });
    }
}

module.exports = User;