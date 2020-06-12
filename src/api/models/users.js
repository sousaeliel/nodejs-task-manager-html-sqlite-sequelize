import bcrypt from "bcrypt";

module.exports = (sequelize, DataType) => {
    const Users = sequelize.define("Users", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        hooks: {
            beforeCreate: (user) => {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
        classMethods: {
            associate: function (models) {
                Users.hasMany(models.Tasks, { 
                    foreignKey: 'user_id',
                    onDelete: 'cascade',
                    constraints: true,
                    hooks: true
                });
            },
            isPassword: (encodedPassword, password) => {
                return bcrypt.compareSync(password, encodedPassword);
            }
        }
    });

    Users.associate = (models) => {
        Users.options.classMethods.associate(models);
    };

    Users.isPassword = (encodedPassword, password) => {
        return Users.options.classMethods.isPassword(encodedPassword, password);
    };

    return Users;
};