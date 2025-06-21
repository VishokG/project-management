export interface Assignee {
  id: string;
  name: string;
}

export enum TaskStatus {
  Todo = 'todo',
  InProgress = 'inProgress',
  Completed = 'completed',
}

export enum TaskPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export enum TasksSortOption {
  DateAsc = 'date-asc',
  DateDesc = 'date-desc',
  PriorityAsc = 'priority-asc',
  PriorityDesc = 'priority-desc',
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority?: TaskPriority;
  assignees: Assignee[];
  dueDate: string;
  tags?: Tag[];
}

export enum Tag {
  Design = 'design',
  Dev = 'dev',
  Marketing = 'marketing',
  Bug = 'bug',
  Business = 'business',
  Legal = 'legal',
}
