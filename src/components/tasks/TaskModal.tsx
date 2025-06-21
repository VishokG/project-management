import React, { useState, useEffect } from 'react';
import { Task, Assignee, TaskStatus, TaskPriority, Tag } from './types';
import { Button } from '../ui/Button';
import { tagOptions } from './data';
import { filterAndSortAssignees, getDisplayName } from './utils';

// Subcomponent: AssigneeSelector
const AssigneeSelector: React.FC<{
  assignees: Assignee[];
  selected: Assignee[];
  onChange: (assignee: Assignee) => void;
}> = ({ assignees, selected, onChange }) => {
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { filtered, sorted } = filterAndSortAssignees(assignees, selected, search);
  return (
    <div className="relative">
      <input
        type="text"
        className="w-full border-0 rounded-lg px-3 py-2 text-sm mb-2 shadow focus:ring-2 focus:ring-blue-200 bg-blue-50 placeholder-gray-400"
        placeholder="Search assignees..."
        value={search}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
        onChange={(e) => setSearch(e.target.value)}
      />
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 items-center">
          {selected.slice(0, 3).map((assignee) => {
            const displayName = getDisplayName(assignee.name);
            return (
              <span
                key={assignee.id}
                className="px-2 py-1 rounded-full text-xs flex items-center gap-1 font-bold border border-blue-200"
              >
                {displayName}
                <button
                  type="button"
                  className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                  onClick={() => onChange(assignee)}
                  aria-label={`Remove ${assignee.name}`}
                >
                  &times;
                </button>
              </span>
            );
          })}
          {selected.length > 3 && (
            <span className="text-xs text-gray-500 ml-1">and {selected.length - 3} more</span>
          )}
        </div>
      )}
      {dropdownOpen && (
        <div
          className="absolute z-10 bg-white border-0 rounded-lg w-full max-h-40 overflow-y-auto shadow-lg mt-1"
          onMouseDown={e => e.preventDefault()}
        >
          {sorted.slice(0, 5).length > 0 ? (
            sorted.slice(0, 5).map((a) => (
              <label
                key={a.id}
                className="flex items-center gap-1 text-sm px-3 py-2 cursor-pointer hover:bg-blue-100 rounded-lg transition"
                onMouseDown={e => e.preventDefault()}
                onClick={e => {
                  e.preventDefault();
                  onChange(a);
                }}
              >
                <input
                  type="checkbox"
                  className="accent-blue-500"
                  checked={selected.some(s => s.id === a.id)}
                  onChange={() => onChange(a)}
                  onClick={e => e.stopPropagation()}
                />
                {a.name}
              </label>
            ))
          ) : (
            <div className="px-2 py-1 text-gray-400 text-sm">No results</div>
          )}
        </div>
      )}
    </div>
  );
};

// Subcomponent: TagSelector
const TagSelector: React.FC<{
  tags: Tag[];
  selected: Tag[];
  onChange: (tag: Tag) => void;
}> = ({ tags, selected, onChange }) => (
  <div className="flex flex-wrap gap-4 mt-2 mb-2">
    {tags.map((tag) => (
      <label key={tag} className="flex items-center gap-2 text-sm font-semibold">
        <input
          type="checkbox"
          className="accent-blue-500"
          checked={selected.includes(tag)}
          onChange={() => onChange(tag)}
        />
        {tag.charAt(0).toUpperCase() + tag.slice(1)}
      </label>
    ))}
  </div>
);

// Main TaskModal
type TaskModalProps = {
  open: boolean;
  onClose: () => void;
  mode?: 'add' | 'edit';
  initialData?: Partial<Task>;
  onSave: (task: Partial<Task>) => void;
  assigneeOptions: Assignee[];
};

const TaskModal: React.FC<TaskModalProps> = ({ open, onClose, mode = 'add', initialData = {}, onSave, assigneeOptions }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.Todo);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.Medium);
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [dueDate, setDueDate] = useState<string>(new Date(Date.now() + 86400000).toISOString().slice(0, 10));
  const [tags, setTags] = useState<Tag[]>([]);

  const handleTagChange = (tag: Tag) => {
    setTags((prev: Tag[]) =>
      prev.includes(tag) ? prev.filter((t: Tag) => t !== tag) : [...prev, tag]
    );
  };

  const handleAssigneeChange = (assignee: Assignee) => {
    setAssignees((prev) =>
      prev.some(a => a.id === assignee.id)
        ? prev.filter((a) => a.id !== assignee.id)
        : [...prev, assignee]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...initialData,
      title,
      description,
      status,
      priority,
      assignees,
      dueDate,
      tags,
    });
    onClose();
  };

  useEffect(() => {
    setTitle(initialData.title || '');
    setDescription(initialData.description || '');
    setStatus(initialData.status as TaskStatus || TaskStatus.Todo);
    setPriority(initialData.priority as TaskPriority || TaskPriority.Medium);
    setAssignees(initialData.assignees || []);
    setDueDate(initialData.dueDate || new Date(Date.now() + 86400000).toISOString().slice(0, 10));
    setTags((initialData.tags as Tag[]) || []);
  }, [initialData, open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-semibold">
            {mode === 'edit' ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            className="text-gray-400 hover:text-gray-700 text-xl"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full border rounded px-3 py-2 text-sm"
              rows={3}
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="w-full border rounded px-2 py-2 text-sm"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
              >
                <option value={TaskStatus.Todo}>To Do</option>
                <option value={TaskStatus.InProgress}>In Progress</option>
                <option value={TaskStatus.Completed}>Completed</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                className="w-full border rounded px-2 py-2 text-sm"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
              >
                <option value={TaskPriority.Low}>Low</option>
                <option value={TaskPriority.Medium}>Medium</option>
                <option value={TaskPriority.High}>High</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Assignees</label>
              <AssigneeSelector
                assignees={assigneeOptions}
                selected={assignees}
                onChange={handleAssigneeChange}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                className="w-full border rounded px-2 py-2 text-sm"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tags</label>
            <TagSelector tags={tagOptions} selected={tags} onChange={handleTagChange} />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
