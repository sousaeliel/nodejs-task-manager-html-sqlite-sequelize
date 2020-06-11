import logger from "./logger";
import cluster from "cluster";

module.exports = {
    database: "task_manager",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "task_manager.sqlite",
        define: {
            underscored: true
        },
        logging: (sql) => {
            logger.info(`[${new Date()} - ${process.getuid()} - ${cluster.worker.process.pid}] ${sql}`);
        }
    },
    jwtSecret: "Ta$K-AP1",
    jwtSession: { session: false }
};