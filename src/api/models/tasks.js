module.exports = (sequelize, DataType) => {
    const Tasks = sequelize.define("Tasks", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        done: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                console.log(models.Users);
                Tasks.belongsTo(models.Users, { 
                    foreignKey: 'user_id' 
                });
            }
        }
    });

    Tasks.associate = (models) => {
        Tasks.options.classMethods.associate(models);
    };

    return Tasks;
};