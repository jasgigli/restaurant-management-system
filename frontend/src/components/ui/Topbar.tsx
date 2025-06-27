import React from 'react';
import { Link } from 'react-router-dom';

const Topbar: React.FC = () => (
  <header className="h-16 bg-white border-b flex items-center px-6 justify-between">
    <div className="font-semibold text-lg">Welcome to RMS</div>
    <div className="flex items-center gap-4">
      <Link to="/profile" className="hover:underline">Profile</Link>
      <Link to="/settings" className="hover:underline">Settings</Link>
      <button className="ml-4 px-3 py-1 bg-primary text-white rounded">Logout</button>
    </div>
  </header>
);

export default Topbar;
