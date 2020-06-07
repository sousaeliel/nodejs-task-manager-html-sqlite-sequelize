module.exports = app => {
    const Tasks = app.db.models.Tasks;
    
    app.route("/tasks")
        .all(app.auth.authenticate())

        .get((req, res, _next) => {
            Tasks.findAll({
                where: {
                    user_id: req.user.id
                }
            }).then((tasks) => {
                res.json({ 
                    tasks: tasks 
                });
            }).catch((error) => {
                res.status(412).json({ 
                    msg: error.message 
                });
            });
        })

        .post((req, res, _next) => {
            req.body.user_id = req.user.id;

            Tasks.create(req.body).then((created) => {
                res.json(created);
            }).catch((error) => {
                res.status(412).json({
                    msg: error.message
                });
            });
        });

    app.route("/tasks/:id")
        .all(app.auth.authenticate())

        .get((req, res, _next) => {
            Tasks.findOne({ 
                where: {
                    id: req.params.id,
                    user_id: req.user.id
                }
            }).then((task) => {
                if (!task) {
                    return res.sendStatus(404);
                }

                res.json(task);
            }).catch((error) => {
                res.status(412).json({
                    msg: error.message
                });
            });
        })

        .put((req, res, _next) => {
            Tasks.update(req.body, {
                where: {
                    id: req.params.id,
                    user_id: req.user.id
                }
            }).then((_updated) => {
                res.sendStatus(204);
            }).catch((error) => {
                res.status(412).json({
                    msg: error.message
                });
            });
        })

        .delete((req, res, _next) => {
            Tasks.destroy( {
                where: {
                    id: req.params.id,
                    user_id: req.user.id
                }
            }).then((_deleted) => {
                res.sendStatus(204);
            }).catch((error) => {
                res.status(412).json({
                    msg: error.message
                });
            });
        });
};