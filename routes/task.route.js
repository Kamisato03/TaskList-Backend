import { Router } from "express";
import { requireToken } from "../middlewares/requireToken.js";
import {
  createTasks,
  getTasks,
  removeTask,
  updateTask,
} from "../controllers/task.controller.js";
import {
  bodyTaskValidator,
  paramTaskIdValidator,
} from "../middlewares/validatorManeger.js";
const router = Router();

//GET          /api/v1/tasks/       all task of user
//POST         /api/v1/tasks/       create task
//PATCH/PUT    /api/v1/tasks/:id    update task with id of tasks
//DELETE       /api/v1/tasks/:id    remove task by id

router.get("/", requireToken, getTasks);
router.post("/", requireToken, bodyTaskValidator, createTasks);
router.delete("/:id", requireToken, paramTaskIdValidator, removeTask);
router.patch("/:id", requireToken, bodyTaskValidator, updateTask);
export default router;
