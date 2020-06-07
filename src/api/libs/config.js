module.exports = app => {
    const env = app.get("env");
    return require(`./config.${env}.js`);
};