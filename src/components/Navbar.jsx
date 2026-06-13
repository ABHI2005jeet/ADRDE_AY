import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  ChevronDown, Moon, Sun, Search, LogOut, Settings, Menu, X, User as UserIcon
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const NavDropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1.5 px-4 py-3 text-[#A0AABF] hover:text-white hover:bg-[#1C3553] transition-colors text-sm font-medium">
        {title}
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 shadow-lg py-1 z-50">
          {items.map((item, idx) => (
            <Link 
              key={idx} 
              to={item.path}
              className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query || query.length < 2) {
      setSearchResults(null);
      return;
    }
    try {
      const userStr = localStorage.getItem('user');
      const token = userStr ? JSON.parse(userStr).token : '';
      const response = await fetch(`http://localhost:5000/api/search?query=${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setSearchResults(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Header - Very Dark Blue */}
      <div className="bg-[#0B1727] text-white px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center z-50 relative">
        {/* Logos & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded flex items-center justify-center text-[#0B1727] font-bold text-xs border border-gray-300">
              DRDO
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border border-gray-300">
               <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/52/DRDO_Logo.png/220px-DRDO_Logo.png" alt="ADRDE" className="w-8 h-8 object-contain" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-white text-base leading-tight">ADRDE Agra Dashboard Portal</h1>
            <p className="text-[#A0AABF] text-xs">DRDO - Internal R&D workspace</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-3 relative">
          <div className="relative w-80">
            <input 
              type="text" 
              placeholder="Search portal..." 
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-[#152B47] text-white border border-[#2A4365] rounded px-3 py-1.5 text-sm placeholder-[#647C9F] focus:outline-none focus:border-blue-400"
            />
          </div>
          <button onClick={() => handleSearch(searchQuery)} className="text-sm font-medium text-white hover:text-gray-300">Search</button>

          {searchResults && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white text-gray-800 rounded shadow-lg max-h-96 overflow-y-auto border border-gray-200 z-50">
              {['users', 'meetings', 'documents', 'letters', 'inventory'].map(category => (
                searchResults[category]?.length > 0 && (
                  <div key={category} className="p-2 border-b border-gray-100 last:border-0">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 px-2">{category}</p>
                    {searchResults[category].map(item => (
                      <div key={item._id} className="px-2 py-1.5 hover:bg-blue-50 cursor-pointer rounded text-sm">
                        <p className="font-medium">{item.name || item.title || item.subject}</p>
                        <p className="text-xs text-gray-500">{item.employeeId || item.status || item.documentType}</p>
                      </div>
                    ))}
                  </div>
                )
              ))}
              {Object.values(searchResults).every(arr => arr.length === 0) && (
                <div className="p-4 text-center text-sm text-gray-500">No results found</div>
              )}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300 transition-colors">
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />} 
            <span className="hidden sm:block">{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>
          
          {/* Profile */}
          <div className="relative">
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 bg-[#152B47] hover:bg-[#1C3553] px-3 py-1.5 rounded transition-colors border border-[#2A4365]"
            >
              <div className="w-7 h-7 rounded-full bg-white text-[#0B1727] flex items-center justify-center font-bold text-xs">
                {user?.name?.charAt(0).toLowerCase() || 'a'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-bold text-white leading-none">{user?.name || 'abhi8'}</p>
                <p className="text-xs text-[#A0AABF] mt-0.5">{user?.role || 'Scientist'}</p>
              </div>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg py-1 z-50 text-gray-800">
                <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
                  <UserIcon size={16} /> Profile
                </Link>
                {(user?.role === 'Admin' || user?.role === 'Para Head') && (
                  <Link to="/admin-settings" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
                    <Settings size={16} /> Settings
                  </Link>
                )}
                <div className="h-px bg-gray-200 my-1"></div>
                <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Nav Bar - Lighter Blue */}
      <nav className="bg-[#10233F] border-b border-[#2A4365] w-full z-40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:flex items-center h-11">
            <NavLink to="/dashboard" className={({isActive}) => twMerge("px-5 py-3 text-sm font-medium transition-colors border-b-2", isActive ? "bg-[#1C3553] text-white border-blue-400" : "text-[#A0AABF] border-transparent hover:text-white hover:bg-[#1C3553]")}>
              Home
            </NavLink>
            
            <NavDropdown title="Meetings" items={[
              { label: 'Upcoming Meetings', path: '/meetings' },
              { label: 'Calendar View', path: '/calendar' },
              { label: 'Timeline View', path: '/timeline' }
            ]} />
            
            <NavDropdown title="Documents" items={[
              { label: 'View Documents', path: '/documents' },
              { label: 'Archive', path: '/documents/archive' }
            ]} />
            
            <NavDropdown title="Letters" items={[
              { label: 'Incoming', path: '/letters/incoming' },
              { label: 'Outgoing', path: '/letters/outgoing' },
              { label: 'Drafts', path: '/letters/drafts' }
            ]} />
            
            <NavDropdown title="Inventory" items={[
              { label: 'Assets', path: '/inventory' },
              { label: 'Requests', path: '/inventory/requests' }
            ]} />
            
            {(user?.role === 'Admin' || user?.role === 'Para Head') && (
              <NavDropdown title="Users" items={[
                { label: 'User Management', path: '/users' },
                { label: 'Roles & Permissions', path: '/users/roles' }
              ]} />
            )}
            
            <NavDropdown title="Reports" items={[
              { label: 'Monthly Reports', path: '/reports' },
              { label: 'Activity Reports', path: '/reports/activity' }
            ]} />
            
            <NavDropdown title="Notifications" items={[
              { label: 'View All', path: '/notifications' }
            ]} />
          </div>

          <div className="flex items-center h-11 lg:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-[#A0AABF] rounded focus:outline-none">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
