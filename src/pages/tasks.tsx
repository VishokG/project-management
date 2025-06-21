import React, { useState, useEffect } from 'react';
import TaskModal from '../components/tasks/TaskModal';
import TaskColumn from '../components/tasks/TaskColumn';
import { Task, TasksSortOption, TaskStatus } from '../types/tasks';
import { Button } from '../components/ui/Button';
import { TasksSortDropdown, sortTasks } from '../components/tasks/TasksSortDropdown';
import { initialTasks, assignees } from '../components/tasks/data';
import { getStatusKeys, getStatusTitle } from '../components/tasks/utils';

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editTask, setEditTask] = useState<Partial<Task> | null>(null);
  const todayString = new Date().toISOString().slice(0, 10);
  const [sortOption, setSortOption] = useState<TasksSortOption>(TasksSortOption.DateAsc);

  const sortedTasks = sortTasks(tasks, sortOption);

  const handleTaskClick = (task: Task) => {
    setEditTask({ ...task });
    setModalMode('edit');
    setShowModal(true);
  };

  const handleNewTask = () => {
    setEditTask(null);
    setModalMode('add');
    setShowModal(true);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (modalMode === 'add') {
      const newTask: Task = {
        ...taskData,
        id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
        status: (taskData.status as TaskStatus) || TaskStatus.Todo,
        dueDate: taskData.dueDate || new Date(Date.now() + 86400000).toISOString().slice(0, 10),
        tags: taskData.tags || [],
        assignees: taskData.assignees || [],
      } as Task;
      setTasks((prev) => [...prev, newTask]);
    } else if (modalMode === 'edit' && editTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editTask.id
            ? {
                ...t,
                ...taskData,
                status: (taskData.status as TaskStatus) || t.status,
                dueDate: taskData.dueDate || t.dueDate,
                tags: taskData.tags || t.tags,
                assignees: taskData.assignees || t.assignees,
              }
            : t
        )
      );
    }
    setShowModal(false);
  };

  const handleDeleteTask = () => {
    if (editTask && editTask.id !== undefined) {
      setTasks((prev) => prev.filter((t) => t.id !== editTask.id));
      setShowModal(false);
      setEditTask(null);
    }
  };

  // Mimic data fetching
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setTasks(initialTasks);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Group tasks by status
  const groupedTasks: Record<TaskStatus, Task[]> = {
    todo: [],
    inProgress: [],
    completed: [],
  };
  sortedTasks.forEach((task: Task) => {
    const status = task.status as TaskStatus;
    if (groupedTasks[status]) {
      groupedTasks[status].push(task);
    }
  });

  if (loading) {
    return <div className="p-6">Loading tasks...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <TaskModal
        open={showModal}
        onClose={() => setShowModal(false)}
        mode={modalMode}
        initialData={editTask || {}}
        onSave={handleSaveTask}
        assigneeOptions={assignees}
        onDelete={modalMode === 'edit' ? handleDeleteTask : undefined}
      />
      <div className="flex flex-col mb-6">
        <h1 className="text-2xl font-bold mb-2">Task Manager</h1>
        <div className="flex justify-between items-center">
          <TasksSortDropdown value={sortOption} onChange={setSortOption} />
          <Button type="button" variant="primary" onClick={handleNewTask}>
            New Task
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {getStatusKeys().map((status: TaskStatus) => (
          <TaskColumn
            key={status}
            title={getStatusTitle(status)}
            tasks={groupedTasks[status]}
            todayString={todayString}
            onTaskClick={handleTaskClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;