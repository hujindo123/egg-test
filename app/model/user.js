'use strict';

module.exports = app => {
    const {STRING, BIGINT, DATE} = app.Sequelize;
    const User = app.model.define('sys_user', {
        userId: {
            field: 'user_id',
            primaryKey: true,
            type: BIGINT,
            allowNull: false,
            autoIncrement: true
        },
        userName: {
            field: 'username',
            type: STRING(50),
            allowNull: false
        },
        passWord: {
            field: 'password',
            type: STRING(100),
            allowNull: false
        },
        salt: {
            field: 'salt',
            type: STRING(20)
        },
        mobile: {
            field: 'mobile',
            type: STRING(100)
        },
        status: {
            field: 'status',
            type: BIGINT
        },
        deptId: {
            field: 'dept_id',
            type: BIGINT(20)
        },
        createTime: {
            field: 'create_time',
            type: DATE,
            allowNull: false
        }
    }, {
        freezeTableName: true, // Model 对应的表名将与model名相同
        timestamps: false
    });
    User.associate = () => {
        app.model.User.hasOne(app.model.Token, {foreignKey: 'user_id'});
        // app.model.User.hasMany(app.model.Family, { foreignKey: 'userId', targetKey: 'id' });
    }
    return User;
};