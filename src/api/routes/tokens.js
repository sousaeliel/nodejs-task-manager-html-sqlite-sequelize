import jwt from "jwt-simple";

module.exports = app => {
    const config = app.libs.config;
    const Users = app.db.models.Users;

    /**
     * @api { post } /token Gerar token de usuário
     * @apiGroup Autenticação
     * @apiParam { String } email E-mail do usuário
     * @apiParam { String } password Senha do usuário
     * @apiParamExample { json } Requisição
     *     {
     *         "email": "usuario@usuario.com",
     *         "password": "minha_senha"
     *     }
     * @apiSuccess { String } token Token do usuário autenticado
     * @apiSuccessExample { json } Sucesso
     * HTTP/1.1 200 OK
     * {
     *     "token": "abcd.efgh.ijklm.nopq.1234"
     * }
     * @apiErrorExample { json } Erro de autenticação
     * HTTP/1.1 401 Unauthorized
     */
    app.post("/token", (req, res, _next) => {
        if (!req.body || (!req.body.email && !req.body.password)) {
            return res.sendStatus(401);
        }

        const email = req.body.email;
        const password = req.body.password;

        Users.findOne({ 
            where: { 
                email: email 
            } 
        }).then((user) => {
            if (!user) {
                return res.sendStatus(401);
            }

            if (!Users.isPassword(user.password, password)) {
                return res.sendStatus(401);
            }

            const payload = { 
                sub: user.id, 
                name: user.name,
                iat: new Date().getTime() 
            };
            
            res.json({ 
                token: jwt.encode(payload, config.jwtSecret)
            });
        }).catch((error) => {
            console.log(error);
            res.sendStatus(401);
        });
    });
};