import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Meetings from './pages/Meetings';
import Agendas from './pages/Agendas';
import CalendarView from './pages/CalendarView';
import Timeline from './pages/Timeline';
import Documents from './pages/Documents';
import Profile from './pages/Profile';
import Inbox from './pages/Inbox';
import Letters from './pages/Letters';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';
import ShortcutModule from './pages/ShortcutModule';
import AdminSettings from './pages/AdminSettings';
import Notifications from './pages/Notifications';
import Users from './pages/Users';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:resettoken" element={<ResetPassword />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="module/:moduleName" element={<ShortcutModule />} />
        <Route path="meetings" element={<Meetings />} />
        <Route path="agendas" element={<Agendas />} />
        <Route path="calendar" element={<CalendarView />} />
        <Route path="timeline" element={<Timeline />} />
        <Route path="documents" element={<Documents />} />
        <Route path="profile" element={<Profile />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="letters/*" element={<Letters />} />
        <Route path="inventory/*" element={<Inventory />} />
        <Route path="reports/*" element={<Reports />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="users/*" element={<Users />} />
        <Route path="admin-settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
