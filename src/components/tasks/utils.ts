import { Tag, Assignee, TaskStatus, TaskPriority } from '../../types/tasks';

// Assign a consistent color to each assignee based on their id
export function getAssigneeColor(id: string) {
  const assigneeColors = [
    '#f472b6', // pink
    '#6366f1', // indigo
    '#22d3ee', // cyan
    '#60a5fa', // blue
    '#f59e42', // orange
    '#38bdf8', // sky
    '#a3a3a3', // gray
    '#34d399', // green
    '#fbbf24', // yellow
    '#ef4444', // red
  ];

  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return assigneeColors[hash % assigneeColors.length];
}

const priorityTitleMap: Record<TaskPriority, string> = {
  [TaskPriority.Low]: 'Low',
  [TaskPriority.Medium]: 'Medium',
  [TaskPriority.High]: 'High',
};

export function getPriorityTitle(priority: TaskPriority): string {
  return priorityTitleMap[priority] || priority;
}

export const tagClassMap: Record<string, string> = {
  design: 'bg-purple-100 text-purple-700',
  dev: 'bg-blue-100 text-blue-700',
  marketing: 'bg-yellow-100 text-yellow-700',
  bug: 'bg-red-100 text-red-700',
  business: 'bg-gray-100 text-gray-700',
  legal: 'bg-indigo-100 text-indigo-700',
};

export const priorityClassMap: Record<string, string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
};

export const tagBorderMap: Record<string, string> = {
  design: 'border-purple-300',
  dev: 'border-blue-300',
  marketing: 'border-yellow-300',
  bug: 'border-red-300',
  business: 'border-gray-300',
  legal: 'border-indigo-300',
};

export const priorityBorderMap: Record<string, string> = {
  high: 'border-red-300',
  medium: 'border-yellow-300',
  low: 'border-green-300',
};

export function filterAndSortAssignees(
  assignees: Assignee[],
  selected: Assignee[],
  search: string
): { filtered: Assignee[]; sorted: Assignee[] } {
  const filtered = assignees.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));
  const sorted = [
    ...filtered.filter((a) => selected.some((s) => s.id === a.id)),
    ...filtered.filter((a) => !selected.some((s) => s.id === a.id)),
  ];
  return { filtered, sorted };
}

// Utility: Get display name for assignee (truncate if needed)
export function getDisplayName(name: string): string {
  return name.length > 16 ? name.slice(0, 13) + '...' : name;
}

// Utility: Get status display title
const statusTitleMap: Record<TaskStatus, string> = {
  [TaskStatus.Todo]: 'To Do',
  [TaskStatus.InProgress]: 'In Progress',
  [TaskStatus.Completed]: 'Completed',
};

export function getStatusTitle(status: TaskStatus): string {
  return statusTitleMap[status] || status;
}

export function getStatusKeys(): TaskStatus[] {
  return Object.keys(statusTitleMap) as TaskStatus[];
}