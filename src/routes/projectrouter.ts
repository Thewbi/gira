import express from "express";
import "reflect-metadata";

import { Project } from "../entity/Project";
import { getManager } from "typeorm";

var projectRouter = express.Router();

// Create / Update
//
// Body is raw JSON
// POST http://localhost:8080/projects/create { "projectname": "testProjectname", "description": "testDescription" }
projectRouter.post("/create", async function (req, res, next) {
  console.log("projects/create data: " + JSON.stringify(req.body));
  const project = req.body;

  // get a repository to perform operations
  const repository = getManager().getRepository(Project);

  let savedEntity = repository.save(project).then((project) => {
    console.log("New object after saving: " + JSON.stringify(project));
    res.send(project);
  });
});

// Retrieve
//
// GET http://localhost:8080/projects/all
projectRouter.get("/all", async function (req, res, next) {
  console.log("projects/all data: " + JSON.stringify(req.body));

  // get a repository to perform operations
  const repository = getManager().getRepository(Project);

  // load all entities
  const projects = await repository.find();

  // return loaded entities
  res.send(projects);
});

// Retrieve
projectRouter.get("/:id", async function (req, res, next) {
  console.log("projects/:id data: " + JSON.stringify(req.body));

  // get a repository to perform operations
  const repository = getManager().getRepository(Project);

  // load all entities
  const projects = await repository.findOne(req.params.id);

  // return loaded entities
  res.send(projects);
});

// Delete
projectRouter.delete("/delete/:id", async function (req, res, next) {
  console.log("projects/delete/:id data: " + JSON.stringify(req.body));

  // get a repository to perform operations
  const repository = getManager().getRepository(Project);

  // delete entity
  const deletionReport = await repository.delete(req.params.id);

  // return loaded entities
  res.send(deletionReport);
});

export default projectRouter;
