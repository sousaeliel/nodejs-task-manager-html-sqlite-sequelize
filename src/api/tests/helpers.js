import chai from "chai";
import app from "../index";
import supertest from "supertest";

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.test = { 
    params: {
        user: {
            valid: { name: "Test", email: "test@test.com", password: "123456" },
            invalid: { email: "EMAIL_ERRADO", password: "SENHA_ERRADA" }
        }
    }
};