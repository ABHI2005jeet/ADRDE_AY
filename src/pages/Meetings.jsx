import { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mockMeetings } from '../mockData/meetings';
import { Plus, Search, Calendar, MapPin, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Meetings = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const canCreate = user?.role === 'Admin';

  const filteredMeetings = mockMeetings.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-main)]">Meeting Management</h1>
          <p className="text-[var(--text-muted)]">View and manage upcoming MAC meetings.</p>
        </div>
        
        {canCreate && (
          <Button variant="primary" className="gap-2 shrink-0">
            <Plus size={18} />
            Create Meeting
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
              <input 
                type="text" 
                placeholder="Search meetings by ID or Title..." 
                className="w-full pl-10 pr-4 py-2 border border-[var(--border-color)] rounded-lg bg-[var(--bg-main)] text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredMeetings.map(meeting => (
              <Card key={meeting.id} className="hover:border-[var(--color-primary-light)] transition-colors cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-semibold text-[var(--color-primary-light)] bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                      {meeting.id}
                    </span>
                    <Badge variant={meeting.status === 'Completed' ? 'success' : 'primary'}>
                      {meeting.status}
                    </Badge>
                  </div>
                  
                  <h3 className="font-bold text-[var(--text-main)] mb-2 group-hover:text-[var(--color-primary-light)] transition-colors line-clamp-1">
                    {meeting.title}
                  </h3>
                  
                  <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2 min-h-[40px]">
                    {meeting.description}
                  </p>
                  
                  <div className="space-y-2 text-sm text-[var(--text-muted)]">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{meeting.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span className="truncate">{meeting.venue}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Meetings;
