import { Task } from '@models/Task';
import logger from '@utils/logger';

export const createTask = async (title: string, description: string) => {
  try {
    logger.info('Creating a new task', { title, description });
    const task = new Task({ title, description });
    const savedTask = await task.save();
    logger.info('Task created successfully', { taskId: task.id });
    return savedTask;
  } catch (error) {
    logger.error('Failed to create task', { error });
    throw error;
  }
};

export const getAllTasks = async () => {
  try {
    logger.info('Fetching all tasks');
    const tasks = await Task.scan().exec();
    logger.info('Successfully fetched all tasks', { count: tasks.length });
    return tasks;
  } catch (error) {
    logger.error('Failed to fetch tasks', { error });
    throw error;
  }
};

export const getTaskById = async (id: string) => {
  try {
    logger.info('Fetching task by ID', { taskId: id });
    const task = await Task.get(id);
    if (!task) {
      logger.warn('Task not found', { taskId: id });
      return null;
    }
    logger.info('Task fetched successfully', { taskId: id });
    return task;
  } catch (error) {
    logger.error('Failed to fetch task by ID', { taskId: id, error });
    throw error;
  }
};

export const updateTask = async (id: string, updateData: { title?: string; description?: string; status?: string; fileUrl?: string }) => {
  try {
    logger.info('Updating task', { taskId: id, updateData });
    const task = await Task.get(id);
    if (!task) {
      logger.warn('Task not found', { taskId: id });
      return null;
    }

    task.title = updateData.title || task.title;
    task.description = updateData.description || task.description;
    task.status = updateData.status || task.status;
    task.updatedAt = new Date();
    task.fileUrl = updateData.fileUrl || task.fileUrl;

    await task.save();
    logger.info('Task updated successfully', { taskId: id });
    return task;
  } catch (error) {
    logger.error('Failed to update task', { taskId: id, error });
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    logger.info('Deleting task', { taskId: id });
    const task = await Task.get(id);
    if (!task) {
      logger.warn('Task not found', { taskId: id });
      return false;
    }

    await Task.delete(id);
    logger.info('Task deleted successfully', { taskId: id });
    return true;
  } catch (error) {
    logger.error('Failed to delete task', { taskId: id, error });
    throw error;
  }
};