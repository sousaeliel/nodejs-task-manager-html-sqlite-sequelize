import bodyParser from 'body-parser';

module.exports = app => {
    app.set("port", 3000);
    app.set("json spaces", 4);
    app.use(bodyParser.json());
    app.use(app.auth.initialize());
    app.set("env", !process.env.NODE_ENV ? "development" : process.env.NODE_ENV);
    
    app.use((req, _res, next) => {
        delete req.body.id;
        next();
    });
};