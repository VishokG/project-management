import React from 'react';
import { Task, Tag, TaskPriority } from './types';
import { getAssigneeColor, getPriorityTitle, tagClassMap, priorityClassMap, tagBorderMap, priorityBorderMap } from './utils';

type TaskCardProps = {
  task: Task;
  onClick: (task: Task) => void;
  todayString: string;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, todayString, onClick }) => {
  const status = task.status;
  return (
    <div
      className="mb-4 flex rounded-xl bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-xl hover:shadow-2xl transition-shadow border border-blue-200 cursor-pointer"
      onClick={() => onClick(task)}
    >
      <div
        className={`w-2 rounded-l-xl`}
      ></div>
      <div className="flex-1 p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-bold text-lg text-gray-800 mb-1">{task.title}</h4>
            <span className={`text-xs font-semibold mb-2 block ${status !== 'completed' && task.dueDate < todayString ? 'text-red-500' : 'text-blue-500'}`}>Due by: {task.dueDate}</span>
          </div>
          <div className="ml-4 flex-shrink-0 flex flex-col items-end">
            {task.priority && (
              <span
                className={`inline-block text-xs font-bold px-3 py-1 rounded-lg mb-1 shadow-sm border ${priorityBorderMap[(task.priority || '').toLowerCase()] || 'border-gray-300'} ${priorityClassMap[(task.priority || '').toLowerCase()] || 'bg-gray-100 text-gray-700'} bg-opacity-90`}
              >
                Priority: {getPriorityTitle(task.priority as TaskPriority)}
              </span>
            )}
          </div>
        </div>
        {task.assignees && task.assignees.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3 mt-2">
            {task.assignees.map((assignee) => {
              if (!assignee) return null;
              return (
                <span
                  key={assignee.id}
                  className="w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs text-white shadow-md border-2 border-white"
                  style={{ background: getAssigneeColor(assignee.id) }}
                  title={assignee.name}
                >
                  {assignee.name.split(' ').map((n) => n[0]).join('')}
                </span>
              );
            })}
          </div>
        )}
        <div className="border-t border-blue-200 my-3"></div>
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-bold px-3 py-1 rounded-lg shadow-sm border ${tagBorderMap[(tag || '').toLowerCase()] || 'border-gray-300'} ${tagClassMap[(tag || '').toLowerCase()] || 'bg-gray-100 text-gray-700'} bg-opacity-90`}
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
