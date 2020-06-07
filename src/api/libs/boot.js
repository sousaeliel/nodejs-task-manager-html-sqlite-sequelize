module.exports = app => {
    const ENV = app.get("env");
    console.log(`Task Manager environment '${ENV}'`)

    if (ENV === "test") return;
    
    const PORT = app.get("port");
    app.db.sequelize.sync().done(() => {
        app.listen(PORT, () => console.log(`Task Manager listen on port '${PORT}'`));
    });
};