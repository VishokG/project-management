import { Assignee, Task, Tag, TaskStatus, TaskPriority } from '../../types/tasks';

export const tagOptions = [
  Tag.Design,
  Tag.Dev,
  Tag.Marketing,
  Tag.Bug,
  Tag.Business,
  Tag.Legal,
];

export const assignees: Assignee[] = [
  { id: 'alice', name: 'Alice' },
  { id: 'bob', name: 'Bob' },
  { id: 'charlie', name: 'Charlie' },
  { id: 'diana', name: 'Diana Prince' },
  { id: 'eve', name: 'Eve Adams' },
  { id: 'frank', name: 'Frank Miller' },
  { id: 'grace', name: 'Grace Hopper' },
];

export const initialTasks: Task[] = [
  { id: 1, title: 'Update homepage design', dueDate: '2025-06-10', tags: [Tag.Design], assignees: [assignees[0]!], status: TaskStatus.Todo, priority: TaskPriority.High },
  { id: 2, title: 'Create API documentation', dueDate: '2025-06-12', tags: [Tag.Dev], assignees: [assignees[1]!], status: TaskStatus.Todo, priority: TaskPriority.Low },
  { id: 3, title: 'Review content strategy', dueDate: '2025-06-15', tags: [Tag.Marketing], assignees: [assignees[2]!], status: TaskStatus.Todo, priority: TaskPriority.Medium },
  { id: 4, title: 'Fix payment gateway bug', dueDate: '2025-06-17', tags: [Tag.Bug], assignees: [assignees[3]!], status: TaskStatus.InProgress, priority: TaskPriority.High },
  { id: 5, title: 'Create onboarding emails', dueDate: '2025-06-20', tags: [Tag.Marketing], assignees: [assignees[4]!], status: TaskStatus.InProgress, priority: TaskPriority.Low },
  { id: 6, title: 'Prepare investor presentation', dueDate: '2025-06-22', tags: [Tag.Business], assignees: [assignees[5]!], status: TaskStatus.Completed, priority: TaskPriority.Medium },
  { id: 7, title: 'Update privacy policy', dueDate: '2025-06-25', tags: [Tag.Legal], assignees: [assignees[6]!], status: TaskStatus.Completed, priority: TaskPriority.High },
];
