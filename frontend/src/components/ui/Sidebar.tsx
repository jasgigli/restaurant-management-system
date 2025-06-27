import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Menu', path: '/menu' },
  { label: 'Sales', path: '/sales' },
  { label: 'Warehouse', path: '/warehouse' },
  { label: 'Assets', path: '/assets' },
  { label: 'HR', path: '/hr' },
  { label: 'Reports', path: '/reports' },
  { label: 'Settings', path: '/settings' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  return (
    <aside className="w-64 bg-white border-r h-full flex flex-col">
      <div className="h-16 flex items-center justify-center font-bold text-xl border-b">RMS SaaS</div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`block rounded px-4 py-2 text-base hover:bg-muted transition-colors ${location.pathname.startsWith(item.path) ? 'bg-muted font-semibold' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
