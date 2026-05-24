import { Moon, Sun, Bell } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Topbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="h-16 bg-[var(--bg-card)] border-b border-[var(--border-color)] flex items-center justify-between px-4 md:px-6 z-10 transition-colors duration-200">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle could go here */}
        <h2 className="text-xl font-semibold text-[var(--text-main)] hidden sm:block">
          MAC Meeting Agenda
        </h2>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button 
          className="p-2 rounded-full hover:bg-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors relative"
          title="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[var(--bg-card)]"></span>
        </button>

        <Link to="/profile" className="flex items-center gap-2 pl-2 sm:border-l border-[var(--border-color)]">
          <div className="w-8 h-8 rounded-full bg-[var(--color-primary-light)] text-white flex items-center justify-center font-semibold">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="hidden sm:block text-sm">
            <p className="font-medium text-[var(--text-main)] leading-none">{user?.name || 'User'}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">{user?.role || 'Role'}</p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Topbar;
