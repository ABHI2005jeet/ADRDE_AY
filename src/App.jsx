import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Meetings from './pages/Meetings';
import Agendas from './pages/Agendas';
import CalendarView from './pages/CalendarView';
import Timeline from './pages/Timeline';
import Documents from './pages/Documents';
import Profile from './pages/Profile';

import Inbox from './pages/Inbox';

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
        <Route path="meetings" element={<Meetings />} />
        <Route path="agendas" element={<Agendas />} />
        <Route path="calendar" element={<CalendarView />} />
        <Route path="timeline" element={<Timeline />} />
        <Route path="documents" element={<Documents />} />
        <Route path="profile" element={<Profile />} />
        <Route path="inbox" element={<Inbox />} />
      </Route>
    </Routes>
  );
}

export default App;
