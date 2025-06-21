import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

const variantClasses: Record<string, string> = {
  primary: 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 shadow-lg',
  secondary: 'bg-white text-blue-700 border border-blue-300 hover:bg-blue-50 shadow',
  danger: 'bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 shadow-lg',
};

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => (
  <button
    className={`px-4 py-2 rounded font-semibold focus:outline-none transition ${variantClasses[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);
