import React from 'react';

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, className = '', label }) => (
  <div className={`relative inline-block ${className}`}>
    {label && <label className="block text-sm font-semibold mb-1 text-blue-800">{label}</label>}
    <select
      className="border-0 rounded-lg p-2 pr-10 appearance-none w-full shadow focus:ring-2 focus:ring-blue-200 bg-blue-50 text-blue-900 font-semibold"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-blue-400">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  </div>
);
