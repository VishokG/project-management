import { Tag, Assignee, TaskStatus, TaskPriority } from './types';

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

export function getTagColor(tag: string | Tag) {
  const tagKey = typeof tag === 'string' ? tag.toLowerCase() : tag;
  const colorMap: Record<string, string> = {
    [Tag.Design]: 'bg-purple-100 text-purple-700',
    [Tag.Dev]: 'bg-blue-100 text-blue-700',
    [Tag.Marketing]: 'bg-yellow-100 text-yellow-700',
    [Tag.Bug]: 'bg-red-100 text-red-700',
    [Tag.Business]: 'bg-gray-100 text-gray-700',
    [Tag.Legal]: 'bg-indigo-100 text-indigo-700',
  };
  return colorMap[tagKey] || 'bg-gray-100 text-gray-700';
}

const priorityTitleMap: Record<TaskPriority, string> = {
  [TaskPriority.Low]: 'Low',
  [TaskPriority.Medium]: 'Medium',
  [TaskPriority.High]: 'High',
};

export function getPriorityTitle(priority: TaskPriority): string {
  return priorityTitleMap[priority] || priority;
}

const priorityColorMap: Record<TaskPriority, string> = {
  [TaskPriority.High]: 'bg-red-100 text-red-700',
  [TaskPriority.Medium]: 'bg-yellow-100 text-yellow-700',
  [TaskPriority.Low]: 'bg-green-100 text-green-700',
};

export function getPriorityColor(priority: TaskPriority): string {
  return priorityColorMap[priority] || 'bg-gray-100 text-gray-700';
}

export function getPriorityBarColor(priority: TaskPriority): string {
  switch (priority) {
    case TaskPriority.High:
      return 'bg-red-500';
    case TaskPriority.Low:
      return 'bg-green-500';
    case TaskPriority.Medium:
      return 'bg-yellow-400';
    default:
      return 'bg-gray-400';
  }
}
