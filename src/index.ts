import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";

// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));

import express from "express";
var cors = require('cors');

import indexRouter from "./routes/indexrouter";
import userRouter from "./routes/userrouter";

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection().then(async connection => {

    const app = express();

    // Parse JSON bodies for this app. Make sure you put
    // `app.use(express.json())` **before** your route handlers!
    app.use(express.json());

    app.use(cors());

    app.use('/', indexRouter);
    app.use('/users', userRouter);

    // default port to listen on
    const port = 8080;

    // start the Express server
    app.listen( port, () => {
        console.log( `server started at http://localhost:${ port }` );
    });

}).catch(error => console.log("TypeORM connection error: ", error));
