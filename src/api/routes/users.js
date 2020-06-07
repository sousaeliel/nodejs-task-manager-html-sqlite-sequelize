module.exports = app => {
    const Users = app.db.models.Users;

    app.post("/users", (req, res) => {
        Users.create(req.body).then((created) => {
            res.json(created);
        }).catch((error) => {
            res.status(412).json({
                msg: error.message
            });
        });
    });
    
    app.route("/users")
        .all(app.auth.authenticate())
        
        .get((req, res, _next) => {
            Users.findByPk(req.user.id, {
                attributes: [ "id", "name", "email"]
            }).then((user) => {
                res.json(user ? user : { });
            }).catch((error) => {
                res.status(412).json({
                    msg: error.message
                });
            });
        })

        .delete((req, res, _next) => {
            Users.destroy({ 
                where: { id: req.user.id }
            }).then((_deleted) => {
                res.sendStatus(204);
            }).catch((error) => {
                res.status(412).json({
                    msg: error.message
                });
            });
        });
};