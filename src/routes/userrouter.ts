import express from "express";
import "reflect-metadata";

import { User } from "../entity/User";
import { getManager } from "typeorm";

var userRouter = express.Router();

// Create / Update
//
// POST http://localhost:8080/users/create { "firstName": "testFirstname", "lastName": "testLastname", "age": 55 }
userRouter.post("/create", async function (req, res, next) {
  const user = req.body;

  // get a repository to perform operations
  const repository = getManager().getRepository(User);

  let savedEntity = repository.save(user).then((user) => {
    res.send(user);
  });
});

// Retrieve
//
// GET http://localhost:8080/users/all
userRouter.get("/all", async function (req, res, next) {
  // get a repository to perform operations
  const repository = getManager().getRepository(User);

  // load all entities
  const users = await repository.find();

  // return loaded entities
  res.send(users);
});

// Retrieve
//
// GET http://localhost:8080/users/1
userRouter.get("/:id", async function (req, res, next) {
  // get a repository to perform operations
  const repository = getManager().getRepository(User);

  // load all entities
  const users = await repository.findOne(req.params.id);

  // return loaded entities
  res.send(users);
});

// Delete
//
// DELETE http://localhost:8080/users/delete/1
userRouter.delete("/delete/:id", async function (req, res, next) {
  // get a repository to perform operations
  const repository = getManager().getRepository(User);

  // delete entity
  const user = await repository.delete(req.params.id);

  // return loaded entities
  res.send(user);
});

export default userRouter;
