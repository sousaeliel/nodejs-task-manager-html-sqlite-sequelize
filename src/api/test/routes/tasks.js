import jwt from "jwt-simple";

describe("Routes: Task", () => {
    const Users = app.db.models.Users;
    const Tasks = app.db.models.Tasks;
    const jwtSecret = app.libs.config.jwtSecret;

    let fakeTask;
    let fakeToken;

    beforeEach(done => {
        const validUser = { name: "Test", email: "test@test.com", password: "123456" };

        Users.destroy({ where: { } })
            .then(() => Users.create(validUser))
            .then(user => {
                Tasks.destroy({ where: { } })
                    .then(() => Tasks.bulkCreate([ 
                        { id: 1, title: "Work", user_id: user.id },
                        { id: 2, title: "Study", user_id: user.id }
                    ]))
                    .then(tasks => {
                        fakeTask = tasks[0];
                        const tokenPayload = { sub: user.id, name: user.name, iat: new Date().getTime() };
                        fakeToken = jwt.encode(tokenPayload, jwtSecret);
                        done();
                    });
            });
    });

    describe("GET /tasks", () => {
        describe("status 200", () => {
            it("returns a list of tasks", done => {
                request.get("/tasks")
                    .set("Authorization", `Bearer ${fakeToken}`)
                    .expect(200)
                    .end((err, res) => {
                        const tasks = res.body.tasks;
                        expect(tasks).to.have.length(2);
                        expect(tasks[0].title).to.eql("Work");
                        expect(tasks[1].title).to.eql("Study");
                        done(err);
                     });
            });
        });
    });

    describe("POST /tasks", () => {
        describe("status 200", () => {
            it("create a new task", done => {
                request.post("/tasks")
                    .set("Authorization", `Bearer ${fakeToken}`)
                    .send({ title: "Run" })
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.title).to.eql("Run");
                        expect(res.body.done).to.be.false;
                        done(err);
                    });
            });
        });
    });

    describe("GET /tasks/:id", () => {
        describe("status 200", () => {
            it("returns one task", done => {
                request.get(`/tasks/${fakeTask.id}`)
                    .set("Authorization", `Bearer ${fakeToken}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.title).to.eql("Work");
                        done(err);
                    });
            });
        });
        describe("status 404", () => {
            it("throws error when tasks not exist", done => {
                request.get(`/tasks/-1`)
                .set("Authorization", `Bearer ${fakeToken}`)
                .expect(404)
                .end((err, _res) => done(err));
            });
        });
    });

    describe("PUT /tasks/:id", () => {
        describe("status 204", () => {
            it("updates a task", done => {
                request.put(`/tasks/${fakeTask.id}`)
                    .set("Authorization", `Bearer ${fakeToken}`)
                    .send({ title: "Travel", done: true })
                    .expect(204)
                    .end((err, _res) => done(err));
            });
        });
    });

    describe("DELETE /tasks/:id", () => {
        describe("status 204", () => {
            it("removes a task", done => {
                request.delete(`/tasks/${fakeTask.id}`)
                    .set("Authorization", `Bearer ${fakeToken}`)
                    .expect(204)
                    .end((err, _res) => done(err));
            });
        });
    });
});