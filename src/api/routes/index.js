module.exports = app => {
    app.route("/")
        .get((_req, res) => {
            res.json({ status: "OK"});
        });
};