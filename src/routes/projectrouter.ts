import express from "express";
import "reflect-metadata";

import { Project } from "../entity/Project";
import { getManager } from "typeorm";
import { Task } from "../entity/Task";

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
  const project = await repository.findOne(req.params.id);

  // return loaded entities
  res.send(project);
});

// Delete
projectRouter.delete("/delete/:id", async function (req, res, next) {
  console.log("projects/delete/:id data: " + JSON.stringify(req.body));

  // get a repository to perform operations
  const repository = getManager().getRepository(Project);

  const project = await repository.findOne(req.params.id);

  if (project) {
    console.log("Project found for project id " + req.params.id);

    let tasks = await project.tasks;
    if (tasks) {
      console.log("Tasks found for project id " + req.params.id);

      const taskRepository = getManager().getRepository(Task);
      for (let task of tasks) {
        console.log("Trying to find task " + JSON.stringify(task));
        let foundTask = await taskRepository.findOne(task.id);
        if (foundTask) {
          console.log("Task found " + JSON.stringify(foundTask));
          console.log("Trying to delete task " + JSON.stringify(foundTask));
          await taskRepository.delete(foundTask);
          console.log("Task " + JSON.stringify(foundTask) + " deleted!");
        }
      }
    }

    // delete entity
    console.log("Deleting project " + req.params.id + " ...");
    const deletionReport = await repository.delete(req.params.id);
    console.log("Deleting project " + req.params.id + " done");

    // return loaded entities
    res.send(deletionReport);
  } else {
    res.status(403).send("No project found for id " + req.params.id);
  }
});

export default projectRouter;
