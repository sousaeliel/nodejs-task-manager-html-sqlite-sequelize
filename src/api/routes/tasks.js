module.exports = app => {
    const Tasks = app.db.models.Tasks;
    
    app.route("/tasks")
        .all(app.auth.authenticate())

        /**
         * @api { get } /tasks Listar tarefas do usuário
         * @apiGroup Tarefas
         * @apiHeader { String } Authorization Token do usuário autenticado
         * @apiHeaderExample { json } Header
         * {
         *     "Authorization": "Bearer abcd.efgh.ijklm.nopq.1234"
         * }
         * @apiSuccess { Object[] } tasks Lista de tarefas do usuário
         * @apiSuccess { Number } tasks.id Id da tarefa
         * @apiSuccess { String } tasks.title Título da tarefa
         * @apiSuccess { Boolean } tasks.done Indica se a tarefa foi concluída
         * @apiSuccess { Number } tasks.user_id Id do usuário
         * @apiSuccess { Date } tasks.updated_at Data da última atualização da tarefa
         * @apiSuccess { Date } tasks.created_at Data de criação da tarefa
         * @apiSuccessExample { json } Sucesso
         * HTTP/1.1 200 OK
         * {
         *     "tasks": [{
         *         "id": 1,
         *         "title": "Fazer algo",
         *         "done": false,
         *         "user_id": 999,
         *         "updated_at": "2000-01-01T00:00:00.0000Z",
         *         "created_at": "2000-01-01T00:00:00.0000Z"
         *     }]
         * }
         * @apiErrorExample { json } Erro ao consultar as tarefas
         * HTTP/1.1 412 Precondition Failed
         */
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

        /**
         * @api { post } /tasks Cadastrar nova tarefa
         * @apiGroup Tarefas
         * @apiHeader { String } Authorization Token do usuário autenticado
         * @apiHeaderExample { json } Header
         * {
         *     "Authorization": "Bearer abcd.efgh.ijklm.nopq.1234"
         * }
         * @apiParam { String } title Título da tarefa
         * @apiParam { Boolean } [done] Indica se a tarefa foi concluída
         * @apiParamExample { json } Requisição
         * {
         *     "title": "Fazer algo",
         *     "done": false
         * }
         * @apiSuccess { Number } id Id da tarefa
         * @apiSuccess { String } title Título da tarefa
         * @apiSuccess { Boolean } done Indica se a tarefa foi concluída
         * @apiSuccess { Number } user_id Id do usuário
         * @apiSuccess { Date } updated_at Data da última atualização da tarefa
         * @apiSuccess { Date } created_at Data de criação da tarefa
         * @apiSuccessExample { json } Sucesso
         * HTTP/1.1 200 OK
         * {
         *     "id": 1,
         *     "title": "Fazer algo",
         *     "done": false,
         *     "user_id": 999,
         *     "updated_at": "2000-01-01T00:00:00.0000Z",
         *     "created_at": "2000-01-01T00:00:00.0000Z"
         * }
         * @apiErrorExample { json } Erro ao criar a tarefa
         * HTTP/1.1 412 Precondition Failed
         */
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

        /**
         * @api { get } /tasks/:id Obter tarefa do usuário
         * @apiGroup Tarefas
         * @apiHeader { String } Authorization Token do usuário autenticado
         * @apiHeaderExample { json } Header
         * {
         *     "Authorization": "Bearer abcd.efgh.ijklm.nopq.1234"
         * }
         * @apiParam { Number } id Id da tarefa
         * @apiSuccess { Number } id Id da tarefa
         * @apiSuccess { String } title Título da tarefa
         * @apiSuccess { Boolean } done Indica se a tarefa foi concluída
         * @apiSuccess { Number } user_id Id do usuário
         * @apiSuccess { Date } updated_at Data da última atualização da tarefa
         * @apiSuccess { Date } created_at Data de criação da tarefa
         * @apiSuccessExample { json } Sucesso
         * HTTP/1.1 200 OK
         * {
         *     "id": 1,
         *     "title": "Fazer algo",
         *     "done": false,
         *     "user_id": 999,
         *     "updated_at": "2000-01-01T00:00:00.0000Z",
         *     "created_at": "2000-01-01T00:00:00.0000Z"
         * }
         * @apiErrorExample { json } Tarefa não existe
         * HTTP/1.1 404 Not Found
         * @apiErrorExample { json } Erro ao consultar as tarefas
         * HTTP/1.1 412 Precondition Failed
         */
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

        /**
         * @api { put } /tasks/:id Alterar tarefa do usuário
         * @apiGroup Tarefas
         * @apiHeader { String } Authorization Token do usuário autenticado
         * @apiHeaderExample { json } Header
         * {
         *     "Authorization": "Bearer abcd.efgh.ijklm.nopq.1234"
         * }
         * @apiParam { Number } id Id da tarefa
         * @apiParam { String } title Título da tarefa
         * @apiParam { Boolean } [done] Indica se a tarefa foi concluída
         * @apiParamExample { json } Requisição
         * {
         *     "title": "Fazer algo",
         *     "done": true
         * }
         * @apiSuccessExample { json } Sucesso
         * HTTP/1.1 204 No Content
         * @apiErrorExample { json } Erro ao alterar as tarefas
         * HTTP/1.1 412 Precondition Failed
         */
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

        /**
         * @api { delete } /tasks/:id Excluir tarefa do usuário
         * @apiGroup Tarefas
         * @apiHeader { String } Authorization Token do usuário autenticado
         * @apiHeaderExample { json } Header
         * {
         *     "Authorization": "Bearer abcd.efgh.ijklm.nopq.1234"
         * }
         * @apiParam { Number } id Id da tarefa
         * @apiSuccessExample { json } Sucesso
         * HTTP/1.1 204 No Content
         * @apiErrorExample { json } Erro ao excluir as tarefas
         * HTTP/1.1 412 Precondition Failed
         */
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