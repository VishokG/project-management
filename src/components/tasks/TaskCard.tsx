import React from 'react';
import { Task, Tag, TaskPriority } from './types';
import { getAssigneeColor, getTagColor, getPriorityTitle, getPriorityColor, getPriorityBarColor } from './utils';

type TaskCardProps = {
  task: Task;
  onClick: (task: Task) => void;
  todayString: string;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, todayString, onClick }) => {
  const status = task.status;
  return (
    <div
      className="mb-4 flex rounded border border-gray-400 bg-white shadow-sm cursor-pointer"
      onClick={() => onClick(task)}
    >
      <div
        className={`w-3 rounded-l ${getPriorityBarColor(task.priority as TaskPriority)}`}
      ></div>
      <div className="flex-1 p-3">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-bold">{task.title}</h4>
            {task.priority && (
              <span
                className={`inline-block text-xs font-bold px-2 py-0.5 rounded mb-1 mr-2 ${getPriorityColor(task.priority as TaskPriority)}`}
              >
                {getPriorityTitle(task.priority as TaskPriority)}
              </span>
            )}
          </div>
          <div className="ml-4 flex-shrink-0">
            <span className={`text-xs font-bold ${status !== 'completed' && task.dueDate < todayString ? 'text-red-500' : 'text-gray-500'}`}>Due by: {task.dueDate}</span>
          </div>
        </div>
        {task.assignees && task.assignees.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2 mt-1">
            {task.assignees.map((assignee) => {
              if (!assignee) return null;
              return (
                <span
                  key={assignee.id}
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-extrabold text-xs text-white"
                  style={{ background: getAssigneeColor(assignee.id) }}
                  title={assignee.name}
                >
                  {assignee.name.split(' ').map((n) => n[0]).join('')}
                </span>
              );
            })}
          </div>
        )}
        <div className="border-t border-gray-400 my-2"></div>
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-bold px-2 py-0.5 rounded ${getTagColor(tag as Tag)}`}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
