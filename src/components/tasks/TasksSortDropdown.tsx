import React from 'react';
import { Dropdown, DropdownOption } from '../../components/ui/Dropdown';
import { Task, TaskPriority, TasksSortOption } from '../../types/tasks';

export interface TasksSortDropdownProps {
  value: TasksSortOption;
  onChange: (value: TasksSortOption) => void;
}

const sortOptions: DropdownOption[] = [
  { value: TasksSortOption.DateAsc, label: 'Sort: Date Added (Oldest First)' },
  { value: TasksSortOption.DateDesc, label: 'Sort: Date Added (Latest First)' },
  { value: TasksSortOption.PriorityDesc, label: 'Sort: Priority (High to Low)' },
  { value: TasksSortOption.PriorityAsc, label: 'Sort: Priority (Low to High)' },
];

export const TasksSortDropdown: React.FC<TasksSortDropdownProps> = ({ value, onChange }) => (
  <Dropdown
    options={sortOptions}
    value={value}
    onChange={onChange as (value: string) => void}
    className="min-w-[220px]"
  />
);

export function sortTasks(tasks: Task[], sortOption: TasksSortOption) {
  const priorityOrder: Record<TaskPriority, number> = {
    [TaskPriority.High]: 3,
    [TaskPriority.Medium]: 2,
    [TaskPriority.Low]: 1,
  };
  const getPriority = (priority?: TaskPriority): number => {
    if (priority && priorityOrder[priority] !== undefined) return priorityOrder[priority];
    return priorityOrder[TaskPriority.Medium];
  };
  return [...tasks].sort((a, b) => {
    if (sortOption === TasksSortOption.DateAsc) {
      return a.id - b.id; // oldest first
    } else if (sortOption === TasksSortOption.DateDesc) {
      return b.id - a.id; // latest first
    } else if (sortOption === TasksSortOption.PriorityAsc) {
      return getPriority(a.priority) - getPriority(b.priority);
    } else if (sortOption === TasksSortOption.PriorityDesc) {
      return getPriority(b.priority) - getPriority(a.priority);
    }
    return 0;
  });
}
