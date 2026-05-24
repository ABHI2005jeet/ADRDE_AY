import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { mockActivity } from '../mockData/activity';
import { User, Mail, Phone, Building, Calendar, CheckCircle } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-main)]">My Profile</h1>
        <p className="text-[var(--text-muted)]">Manage your personal settings and view recent account activity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 border-[var(--border-color)]">
          <CardContent className="p-8 text-center border-b border-[var(--border-color)]">
            <div className="w-24 h-24 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg shadow-blue-900/20">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h2 className="text-xl font-bold text-[var(--text-main)]">{user?.name || 'Authorized User'}</h2>
            <p className="text-[var(--text-muted)] mb-2">{user?.role || 'Guest'}</p>
            <Badge variant="primary">{user?.department || 'General Dept'}</Badge>
          </CardContent>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-[var(--text-main)] mb-3">Contact Information</h3>
            <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] group">
              <Mail size={16} className="text-[var(--color-primary-light)]" />
              <span className="truncate group-hover:text-[var(--text-main)] transition-colors cursor-pointer">{user?.name?.toLowerCase().replace(' ', '.')}@adrde.gov.in</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
              <Phone size={16} className="text-[var(--color-primary-light)]" />
              <span>+91 XXXXX XXXXX</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
              <Building size={16} className="text-[var(--color-primary-light)]" />
              <span>ADRDE Agra HQ</span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-[var(--border-color)]">
          <CardHeader>
            <CardTitle>Recent Activity Feed</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--border-color)]">
              {mockActivity.map((activity) => (
                <div key={activity.id} className="p-6 flex items-start gap-4 hover:bg-[var(--bg-main)] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[var(--color-primary-light)] shrink-0 mt-1">
                    {activity.type === 'meeting' && <Calendar size={18} />}
                    {activity.type === 'agenda' && <CheckCircle size={18} />}
                    {activity.type === 'document' && <User size={18} />}
                    {activity.type === 'approval' && <CheckCircle size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[var(--text-main)] font-medium mb-1">
                      {activity.action}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                      <span className="font-medium text-[var(--text-primary-light)]">{activity.user}</span>
                      <span>•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
