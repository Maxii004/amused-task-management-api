import express from "express";
import {
  createTaskHandler,
  getAllTasksHandler,
  getTaskByIdHandler,
  updateTaskHandler,
  deleteTaskHandler,
  generateUploadUrlHandler,
} from "@controllers/task.controller";
import { validateCreateTask, validateUpdateTask } from "@middlewares/validate-task";

const router = express.Router();

// Task-specific routes
router.post("/", validateCreateTask, createTaskHandler);
router.get("/", getAllTasksHandler);
router.get("/:id", getTaskByIdHandler);
router.patch("/:id", validateUpdateTask, updateTaskHandler);
router.delete("/:id", deleteTaskHandler);
router.post('/:id/upload-url', generateUploadUrlHandler); 

export default router;
