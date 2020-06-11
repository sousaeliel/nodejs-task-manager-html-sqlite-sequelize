import fs from "fs";
import https from "https";

module.exports = app => {
    const ENV = app.get("env");
    console.log(`Task Manager environment '${ENV}'`)

    if (ENV === "test") return;

    const credentials = {
        key: fs.readFileSync("taskmanager.key", "utf8"),
        cert: fs.readFileSync("taskmanager.cert", "utf8"),
    };

    const PORT = app.get("port");

    app.db.sequelize.sync().done(() => {
        https.createServer(credentials, app)
            .listen(PORT, () => console.log(`Task Manager listen on port '${PORT}'`));
    });
};