import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  FileText, 
  Users, 
  ListTodo, 
  Clock,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { twMerge } from 'tailwind-merge';

const SidebarItem = ({ icon: Icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      twMerge(
        'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
        isActive
          ? 'bg-[var(--color-primary)] text-white'
          : 'text-[var(--text-muted)] hover:bg-[var(--border-color)] hover:text-[var(--text-main)]'
      )
    }
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </NavLink>
);

const Sidebar = () => {
  const { logout } = useAuth();
  
  return (
    <aside className="w-64 bg-[var(--bg-card)] border-r border-[var(--border-color)] flex flex-col transition-colors duration-200 hidden md:flex">
      <div className="p-6 border-b border-[var(--border-color)] flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-xl">
          A
        </div>
        <div>
          <h1 className="font-bold text-[var(--text-main)] text-lg leading-tight">ADRDE Agra</h1>
          <p className="text-xs text-[var(--text-muted)]">MAC Dashboard</p>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <SidebarItem to="/meetings" icon={Users} label="Meetings" />
        <SidebarItem to="/agendas" icon={ListTodo} label="Agendas" />
        <SidebarItem to="/calendar" icon={CalendarDays} label="Calendar" />
        <SidebarItem to="/timeline" icon={Clock} label="Timeline" />
        <SidebarItem to="/documents" icon={FileText} label="Documents" />
      </nav>
      
      <div className="p-4 border-t border-[var(--border-color)]">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
