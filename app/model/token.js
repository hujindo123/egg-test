'use strict';

module.exports = app => {
    const {STRING, BIGINT, DATE} = app.Sequelize;
    const Token = app.model.define('sys_user_token', {
        userId: {
            field: 'user_id',
            primaryKey: true,
            type: BIGINT
        },
        token: {
            field: 'token',
            type: STRING(100),
            allowNull: false
        },
        expireTime: {
            field: 'expire_time',
            type: DATE,
            allowNull: false
        },
        updateTime: {
            field: 'update_time',
            type: DATE,
            allowNull: false
        },
    }, {
        freezeTableName: true, // Model 对应的表名将与model名相同
        timestamps: false
    });
    return Token;
};