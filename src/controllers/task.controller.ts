import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "@constants/common";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "@services/task.service";
import { generateUploadUrl } from "@services/s3.service";
import config from "../../config/config";

export const createTaskHandler = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const task = await createTask(title, description);
  if (!task) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to create task" });
    return;
  }
  res.status(HTTP_STATUS_CODES.CREATED).json(task);
};

export const getAllTasksHandler = async (req: Request, res: Response) => {
  const tasks = await getAllTasks();
  if (!tasks) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to fetch tasks" });
    return;
  }
  res.status(HTTP_STATUS_CODES.OK).json(tasks);
};

export const getTaskByIdHandler = async (req: Request, res: Response) => {
  const task = await getTaskById(req.params.id);
  if (!task) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: "Task not found" });
    return;
  }
  res.status(HTTP_STATUS_CODES.OK).json(task);
};

export const updateTaskHandler = async (req: Request, res: Response) => {
  const task = await updateTask(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    fileUrl: req.body.fileUrl,
  });

  if (!task) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: "Task not found" });
    return;
  }

  res.status(HTTP_STATUS_CODES.OK).json(task);
};

export const deleteTaskHandler = async (req: Request, res: Response) => {
  const isDeleted = await deleteTask(req.params.id);
  if (!isDeleted) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: "Task not found" });
    return;
  }
  res.status(HTTP_STATUS_CODES.OK).send();
};

export const generateUploadUrlHandler = async (req: Request, res: Response) => {
  const { fileName } = req.body;
  const { id } = req.params;
  if (!fileName || !id) {
    res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ message: "File name and Task ID is required" });
    return;
  }
  const filePath = `${id}/${fileName}`;
  const uploadUrl = await generateUploadUrl(filePath);
  if (!uploadUrl) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to generate upload URL" });
    return;
  }
  await updateTask(id, { fileUrl: `https://${config.cdn.url}/${filePath}` });
  res.status(HTTP_STATUS_CODES.OK).json({ uploadUrl });
};
