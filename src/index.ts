import express, { Request, Response } from "express"
import "reflect-metadata";
import { createConnection } from "typeorm";
import { ErrorHandler } from "./controllers/ErrorController";
import { Address } from "./domains/Address";
import { User } from "./domains/User";
import { UserRouter } from "./routers/UserRoutes";
import bodyParser from "body-parser";

import dotenv from "dotenv"
dotenv.config();
import { AuthRouter } from "./routers/AuthRoutes";
import { AddressRouter } from "./routers/AddressRoutes";

createConnection({
    host: "db",
    type:"postgres",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "web",
    port: 5432,
    entities: [
        Address,
        User
     ],
    synchronize: true,
    logging: true,
}).then(async connection => {
    
    console.log("Connected!")

    const port = 8081
    const app = express()
    
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use("/api/user/v1/", UserRouter)
    app.use("/api/auth/v1/", AuthRouter)
    app.use("/api/address/v1/", AddressRouter)

    app.use(ErrorHandler)
    
    app.listen(port, () => console.log("Listening on port " + port))

}).catch(error => console.log(error));
