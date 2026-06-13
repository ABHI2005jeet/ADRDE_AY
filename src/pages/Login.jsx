import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Moon, Sun, Shield } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Invalid credentials.');
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
                <label className="text-sm font-medium text-[var(--text-main)]">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-[var(--text-main)] placeholder-[var(--text-muted)] transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-[var(--text-main)]">Password</label>
                  <Link to="/forgot-password" className="text-sm text-[var(--color-primary-light)] hover:underline">Forgot password?</Link>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none text-[var(--text-main)] placeholder-[var(--text-muted)] transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#152B47] text-white py-2 rounded hover:bg-[#0B1727] transition-colors"
              >
                {isLoading ? 'Signing In...' : 'Login'}
              </button>
              
              <div className="flex justify-between items-center mt-4">
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </Link>
                <span className="text-sm text-gray-500">
                  Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                </span>
              </div>
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
