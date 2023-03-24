module.exports = (Sequelize, DataTypes) => {
    const users = Sequelize.define('users', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        login_time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        register_time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })

    return users;
}