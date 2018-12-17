module.exports = (options, app) => {
    const jwt = require('jsonwebtoken');
    return async function (ctx, next) {
        if (ctx.request.header['authorization']) {
            let token = ctx.request.header['authorization'];
            let decoded;
            //解码token
            try {
                decoded = jwt.verify(token, app.config.token.keys);
                /*console.log(decoded);*/
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    console.log('时间到期');
                    //重新发放令牌
                    token = jwt.sign({
                        user_id: decoded.user_id,
                        user_name: decoded.user_name
                    }, app.config.token.keys, {
                        expiresIn: app.config.token.maxAge //过期时间设置为60妙。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
                    });
                    ctx.cookies.set('token', token, {
                        maxAge: app.config.token.maxAge,
                        httpOnly: false,
                        overwrite: true,
                        signed: false
                    });
                } else {
                    ctx.status = 401;
                    ctx.body = {
                        message: 'token失效'
                    };
                    return;
                }
            }
            //重置cookie时间
            ctx.cookies.set('token', token, {
                maxAge: 60 * 1000,
                httpOnly: false,
                overwrite: true,
                signed: false
            });
            await next();
        } else {
            ctx.status = 401;
            ctx.body = {
                message: '没有token'
            };
            return;
        }
    }
};
