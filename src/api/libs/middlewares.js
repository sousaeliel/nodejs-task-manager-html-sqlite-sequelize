import bodyParser from 'body-parser';
import express from "express";
import cors from "cors";
import logger from "./logger";
import morgan from "morgan";
import cluster from "cluster";
import compression from "compression";
import helmet from "helmet";

module.exports = app => {
    app.set("port", 3000);
    app.set("json spaces", 4);
    app.set("env", !process.env.NODE_ENV ? "development" : process.env.NODE_ENV);

    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.json());
    app.use(app.auth.initialize());
    app.use(express.static("public"));

    app.use(cors({
        origin: [ "http://localhost:3001" ],
        methods: [ "GET", "POST", "PUT", "DELETE" ],
        allowedHeaders: [ "Content-Type", "Authorization" ]
    }));
    
    app.use(morgan("common", {
        stream: {
            write: (message) => {
                logger.info(`[${new Date()} - ${process.getuid()} - ${cluster.worker.process.pid}] ${message}`);
            }
        }
    }));

    app.use((req, res, next) => {
        delete req.body.id;
        next();
    });
};

//res.removeHeader("X-Powered-By");
//app.set('x-powered-by', false); 
//app.disable('x-powered-by');  //express 4.*
//res.header("X-powered-by", "Blood, sweat, and tears.");