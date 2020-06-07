module.exports = app => {
    /**
     * @api { get } / Obter status da api
     * @apiGroup Status
     * @apiSuccess { String } status mensagem de status da API
     * @apiSuccessExample { json } Sucesso
     * HTTP/1.1 200 OK
     * { 
     *     "status": "OK" 
     * }
     */
    app.route("/")
        .get((_req, res) => {
            res.json({ status: "OK"});
        });
};