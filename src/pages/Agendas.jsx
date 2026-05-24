import { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mockAgendas } from '../mockData/agendas';
import { Search, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const getStatusIcon = (status) => {
  switch(status) {
    case 'Approved': return <CheckCircle size={16} className="text-green-500" />;
    case 'Completed': return <CheckCircle size={16} className="text-blue-500" />;
    case 'Pending': return <Clock size={16} className="text-yellow-500" />;
    default: return <XCircle size={16} className="text-red-500" />;
  }
};

const getStatusBadge = (status) => {
  switch(status) {
    case 'Approved': return 'success';
    case 'Completed': return 'primary';
    case 'Pending': return 'warning';
    default: return 'default';
  }
};

const Agendas = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const canApprove = user?.role === 'Para Head' || user?.role === 'Admin';

  const filtered = mockAgendas.filter(a => 
    a.topic.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-main)]">Agenda Management</h1>
          <p className="text-[var(--text-muted)]">Track and manage meeting agendas effectively.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-hidden">
          <div className="p-4 border-b border-[var(--border-color)] flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
              <input 
                type="text" 
                placeholder="Search agendas..." 
                className="w-full pl-10 pr-4 py-2 border border-[var(--border-color)] rounded-lg bg-[var(--bg-main)] text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter size={18} />
              Filter
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--bg-main)] border-b border-[var(--border-color)]">
                  <th className="p-4 font-semibold text-[var(--text-muted)] text-sm">Agenda ID</th>
                  <th className="p-4 font-semibold text-[var(--text-muted)] text-sm">Topic</th>
                  <th className="p-4 font-semibold text-[var(--text-muted)] text-sm">Focus Dept.</th>
                  <th className="p-4 font-semibold text-[var(--text-muted)] text-sm">Meeting</th>
                  <th className="p-4 font-semibold text-[var(--text-muted)] text-sm">Status</th>
                  {canApprove && (
                    <th className="p-4 font-semibold text-[var(--text-muted)] text-sm text-right">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((agenda) => (
                  <tr key={agenda.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-main)] transition-colors">
                    <td className="p-4 font-medium text-[var(--text-main)] text-sm">{agenda.id}</td>
                    <td className="p-4 text-[var(--text-main)]">{agenda.topic}</td>
                    <td className="p-4 text-sm text-[var(--text-muted)]">{agenda.department}</td>
                    <td className="p-4 text-sm text-[var(--text-primary-light)]">{agenda.meetingId}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(agenda.status)}
                        <Badge variant={getStatusBadge(agenda.status)}>{agenda.status}</Badge>
                      </div>
                    </td>
                    {canApprove && (
                      <td className="p-4 text-right">
                        {agenda.status === 'Pending' && (
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">Approve</Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">Reject</Button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-[var(--text-muted)]">No agendas found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Agendas;
