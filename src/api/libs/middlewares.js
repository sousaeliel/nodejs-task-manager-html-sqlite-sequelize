import bodyParser from 'body-parser';
import express from "express";
import cors from "cors";
import logger from "./logger";
import morgan from "morgan";
import cluster from "cluster";
import compression from "compression";

module.exports = app => {
    app.set("port", 3000);
    app.set("json spaces", 4);
    
    app.use(morgan("common", {
        stream: {
            write: (message) => {
                logger.info(`[${new Date()} - ${process.getuid()} - ${cluster.worker.process.pid}] ${message}`);
            }
        }
    }));

    app.use(cors({
        origin: [ "http://localhost:3001" ],
        methods: [ "GET", "POST", "PUT", "DELETE" ],
        allowedHeaders: [ "Content-Type", "Authorization" ]
    }));
    
    app.use(compression());
    app.use(bodyParser.json());
    app.use(app.auth.initialize());
    app.use(express.static("public"));
    app.set("env", !process.env.NODE_ENV ? "development" : process.env.NODE_ENV);

    app.use((req, _res, next) => {
        delete req.body.id;
        next();
    });
};