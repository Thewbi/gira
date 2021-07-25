import express from "express";
import "reflect-metadata";

import { Project } from "../entity/Project";
import { Task } from "../entity/Task";
import { getManager } from "typeorm";

var taskRouter = express.Router();

// Create / Update
//
// Body is raw JSON
// POST http://localhost:8080/tasks/create
// BODY: { "name": "task1", "description": "task1 description" }
taskRouter.post("/create", async function (req, res, next) {
  console.log("tasks/create data: " + JSON.stringify(req.body));

  const projectId = req.query.projectId as string;
  console.log("projectId is set to " + projectId);

  const task = req.body as Task;

  // get a repository to perform operations
  const taskRepository = getManager().getRepository(Task);

  const projectRepository = getManager().getRepository(Project);
  const projectPromise = projectRepository.findOne(projectId);
  projectPromise.then((project) => {
    if (project == undefined) {
      res.status(404).send("No project found for id " + projectId);
      return;
    }

    if (task.projects == undefined) {
      task.projects = [];
    }
    task.projects.push(project);

    console.log("Saving ...");
    let savedEntity = taskRepository.save(task).then((task) => {
      console.log("Saving done.");

      // prevent cycles during JSON.stringify()
      let tempTask: Task = {
        id: -1,
        name: "",
        description: "",
        projects: [],
      };
      tempTask.id = task.id;
      tempTask.name = task.name;
      tempTask.description = task.description;

      console.log("New object after saving: " + JSON.stringify(tempTask));

      res.send(tempTask);
    });
  });
});

// Retrieve
//
// GET http://localhost:8080/tasks/all
taskRouter.get("/all", async function (req, res, next) {
  console.log("tasks/all data: " + JSON.stringify(req.body));

  const projectId = req.query.projectId as string;

  console.log("ProjectId = " + projectId);

  if (projectId == undefined) {
    console.log("No filtering by projectId");

    // get a repository to perform operations
    const repository = getManager().getRepository(Task);

    // load all entities
    const tasks = await repository.find();

    // return loaded entities
    res.send(tasks);
  } else {
    console.log("Filtering by projectId " + projectId);

    const projectRepository = getManager().getRepository(Project);
    const projectPromise = projectRepository.findOne(projectId);
    projectPromise.then(async (project) => {
      if (project == undefined) {
        const msg = "No project found for id " + projectId;
        console.log(msg);
        res.status(404).send(msg);
        return;
      }

      // lazy-loaded relation between projects and tasks, therefore await promise to load
      const tasks = await project.tasks;

      res.send(tasks);
    });
  }
});

taskRouter.get("/all", async function (req, res, next) {
  console.log("tasks/all data: " + JSON.stringify(req.body));

  // get a repository to perform operations
  const repository = getManager().getRepository(Task);

  // load all entities
  const tasks = await repository.find();

  // return loaded entities
  res.send(tasks);
});

// Retrieve
// GET http://localhost:8080/tasks/6
taskRouter.get("/:id", async function (req, res, next) {
  console.log("task/:id data: " + JSON.stringify(req.body));

  // get a repository to perform operations
  const repository = getManager().getRepository(Task);

  // load all entities
  const tasks = await repository.findOne(req.params.id);

  // return loaded entities
  res.send(tasks);
});

// Delete
taskRouter.delete("/delete/:id", async function (req, res, next) {
  console.log("tasks/delete/:id data: " + JSON.stringify(req.body));

  // get a repository to perform operations
  const repository = getManager().getRepository(Task);

  // delete entity
  const deletionReport = await repository.delete(req.params.id);

  // return loaded entities
  res.send(deletionReport);
});

export default taskRouter;
