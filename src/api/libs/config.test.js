module.exports = {
    database: "task_manager_test",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "task_manager.sqlite",
        logging: false,
        define: {
            underscored: true
        }
    },
    jwtSecret: "Ta$K-AP1",
    jwtSession: { session: false }
};