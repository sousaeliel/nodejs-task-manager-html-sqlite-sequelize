import jwt from "jwt-simple";

describe("Routes: User", () => {
    const Users = app.db.models.Users;
    const jwtSecret = app.libs.config.jwtSecret;
    const validUser = test.params.user.valid;
    const newUser = { name: "New", email: "new@test.com", password: "123456" };

    let fakeToken;

    beforeEach(done => {
        Users.destroy({ where: { } })
            .then(() => Users.create(validUser))
            .then(user => {
                const tokenPayload = { sub: user.id, name: user.name, iat: new Date().getTime() };
                fakeToken = jwt.encode(tokenPayload, jwtSecret);
                done();
            });
    });

    describe("GET /users", () => {
        describe("status 200", () => {
            it("returns an autheticated user", done => {
                request.get("/users")
                    .set("Authorization", `Bearer ${fakeToken}`)
                    .expect(200)
                    .end((err, res) => {
                        const user = res.body;
                        expect(user.name).to.eql(validUser.name);
                        expect(user.email).to.eql(validUser.email);
                        done(err);
                    });
            });
        });
    });

    describe("DELETE /users", () => {
        describe("status 204", () => {
            it("removes an authenticated user", done => {
                request.delete("/users")
                    .set("Authorization", `Bearer ${fakeToken}`)
                    .expect(204)
                    .end((err, _res) => done(err));
            });
        });
    });

    describe("POST /users", () => {
        describe("status 200", () => {
            it("create a new user", done => {
                request.post("/users")
                    .send(newUser)
                    .expect(200)
                    .end((err, res) => {
                        const user = res.body;
                        expect(user.name).to.eql(newUser.name);
                        expect(user.email).to.eql(newUser.email);
                        done(err);
                    });
            });
        });
    });
});