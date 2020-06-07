module.exports = app => {
    const Users = app.db.models.Users;

    /**
     * @api { post } /users Cadastrar novo usuário
     * @apiGroup Usuários
     * @apiParam { String } name Nome do usuário
     * @apiParam { String } email E-mail do usuário
     * @apiParam { String } password Senha do usuário
     * @apiParamExample { json } Requisição
     * {
     *     "name": "Usuário",
     *     "email": "usuario@usuario.com"
     *     "password": "minha_senha"
     * }
     * @apiSuccess { Number } id Id do usuário
     * @apiSuccess { String } name Nome do usuário
     * @apiSuccess { String } email E-mail do usuário
     * @apiSuccess { Date } updated_at Data da última atualização do usuário
     * @apiSuccess { Date } created_at Data de criação do usuário
     * @apiSuccessExample { json } Sucesso
     * HTTP/1.1 200 OK
     * {
     *     "id": 1,
     *     "name": "Usuário",
     *     "email": "usuario@usuario.com",
     *     "updated_at": "2000-01-01T00:00:00.0000Z",
     *     "created_at": "2000-01-01T00:00:00.0000Z"
     * }
     * @apiErrorExample { json } Erro ao criar o usuário
     * HTTP/1.1 412 Precondition Failed
     */
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
        
        /**
         * @api { get } /users Obter usuário autenticado
         * @apiGroup Usuários
         * @apiHeader { String } Authorization Token do usuário autenticado
         * @apiHeaderExample { json } Header
         * {
         *     "Authorization": "Bearer abcd.efgh.ijklm.nopq.1234"
         * }
         * @apiSuccess { Number } id Id do usuário
         * @apiSuccess { String } name Nome do usuário
         * @apiSuccess { String } email E-mail do usuário
         * @apiSuccessExample { json } Sucesso
         * HTTP/1.1 200 OK
         * {
         *     "id": 1,
         *     "name": "Usuário",
         *     "email": "usuario@usuario.com"
         * }
         * @apiErrorExample { json } Erro ao consultar o usuário
         * HTTP/1.1 412 Precondition Failed
         */
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

        /**
         * @api { delete } /users Excluir usuário autenticado
         * @apiGroup Usuários
         * @apiHeader { String } Authorization Token do usuário autenticado
         * @apiHeaderExample { json } Header
         * {
         *     "Authorization": "Bearer abcd.efgh.ijklm.nopq.1234"
         * }
         * @apiSuccessExample { json } Sucesso
         * HTTP/1.1 204 No Content
         * @apiErrorExample { json } Erro ao excluir o usuário
         * HTTP/1.1 412 Precondition Failed
         */
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