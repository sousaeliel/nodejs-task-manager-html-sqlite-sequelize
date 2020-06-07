describe("Routes: Token", () => {
    const Users = app.db.models.Users;
    const validUser = test.params.user.valid;
    const invalidUser = test.params.user.invalid;
    
    describe("POST /token", () => {
        beforeEach(done => {
            Users.destroy({ where: { } })
                .then(() => Users.create())
                .then(done)
        });
    });
    describe("status 200", () => {
        it("returns authenticated user token", done => {
            request.post("/token")
                .send({
                    email: validUser.email,
                    password: validUser.password
                })
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.include.keys("token");
                    done(err);
                });
        });
    });
    describe("status 401", () => {
        it("throws error when password is incorrect", done => {
            request.post("/token")
            .send({
                email: validUser.email,
                password: invalidUser.password
            })
            .expect(401)
            .end((err, _res) => done(err));
        });
        it("throws error when email not exist", done => {
            request.post("/token")
            .send({
                email: invalidUser.email,
                password: invalidUser.password
            })
            .expect(401)
            .end((err, _res) => done(err));
        });
        it("throws error when email and password are empty or blank", done => {
            request.post("/token")
            .expect(401)
            .end((err, _res) => done(err));
        });
    });
});