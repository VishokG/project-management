import React from 'react';
import TaskCard from './TaskCard';
import { Task } from './types';

type TaskColumnProps = {
  title: string;
  tasks: Task[];
  todayString: string;
  onTaskClick: (task: Task) => void;
};

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, todayString, onTaskClick }) => {
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 p-5 rounded-2xl shadow-xl border border-blue-200 max-h-[100vh] overflow-y-auto">
      <div className="flex items-center mb-5">
        <h3 className="text-xl font-bold capitalize text-gray-800 tracking-tight drop-shadow-sm">{title}</h3>
        <span className="ml-3 bg-blue-200 text-blue-700 text-xs px-3 py-1 rounded-full font-bold shadow-sm">
          {tasks.length}
        </span>
      </div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          todayString={todayString}
          onClick={onTaskClick}
        />
      ))}
    </div>
  );
};

export default TaskColumn;
