module.exports = {
    database: "task_manager",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "task_manager.sqlite",
        define: {
            underscored: true
        }
    },
    jwtSecret: "Ta$K-AP1",
    jwtSession: { session: false }
};