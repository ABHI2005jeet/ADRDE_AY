import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Moon, Sun, Shield } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Admin');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const success = login(username, password, role);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-4 transition-colors duration-200">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] shadow-sm border border-[var(--border-color)] transition-all"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[var(--color-primary)] rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-blue-900/20">
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-main)] mb-2">ADRDE Agra</h1>
          <p className="text-[var(--text-muted)]">MAC Meeting Agenda Dashboard</p>
        </div>

        <Card className="border-[var(--border-color)]">
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-main)]">Employee ID / Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-[var(--text-main)] placeholder-[var(--text-muted)] transition-colors"
                  placeholder="Enter your ID"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-main)]">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-[var(--text-main)] placeholder-[var(--text-muted)] transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-main)]">Access Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-[var(--text-main)] transition-colors"
                >
                  <option value="Admin">Admin</option>
                  <option value="Para Head">Para Head</option>
                  <option value="Staff">Staff</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>

              <Button type="submit" className="w-full h-12 text-base">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <p className="text-center text-xs text-[var(--text-muted)] mt-8">
          Authorized personnel only. ADRDE secure access gateway.
        </p>
      </div>
    </div>
  );
};

export default Login;
