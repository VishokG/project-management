import { TaskPriority, TaskStatus } from "~/types/tasks";
import { Status } from "@prisma/client";

const TaskPriorityToPrisma: Record<TaskPriority, number> = {
  [TaskPriority.High]: 3,
  [TaskPriority.Medium]: 2,
  [TaskPriority.Low]: 1,
};

const TaskStatusToPrisma: Record<TaskStatus, Status> = {
  [TaskStatus.Todo]: Status.TO_DO,
  [TaskStatus.InProgress]: Status.IN_PROGRESS,
  [TaskStatus.Completed]: Status.COMPLETED,
};

export const getTaskPriorityEnumValue = (priority: TaskPriority): number => {
  const value = TaskPriorityToPrisma[priority];
  if (!value) throw new Error(`Unknown task priority: ${priority}`);
  return value;
};

export const getTaskStatusEnumValue = (status: TaskStatus): Status => {
  const value = TaskStatusToPrisma[status];
  if (!value) throw new Error(`Unknown task status: ${status}`);
  return value;
};