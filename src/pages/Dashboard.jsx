import { useState, useEffect } from 'react';
import { getMeetings, getDocuments } from '../services/dataService';
import { Users, FileText, Bell, Clock, Calendar, List, Activity } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Link } from 'react-router-dom';

const COLORS = ['#10b981', '#e5e7eb']; // Green for completed, Gray for remaining

const StatCard = ({ title, value, desc, icon: Icon, iconBg, iconColor }) => (
  <Card className="border-0 shadow-sm rounded-xl overflow-hidden bg-white">
    <CardContent className="p-5 flex flex-col justify-between h-full relative">
      <div className="flex justify-between items-start mb-4">
        <p className="text-[10px] font-bold text-[#647C9F] tracking-wider uppercase">{title}</p>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg} ${iconColor}`}>
          <Icon size={16} />
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-medium text-[#0B1727] mb-2">{value}</h3>
        <p className="text-xs text-[#647C9F] leading-tight">{desc}</p>
      </div>
    </CardContent>
  </Card>
);

const lanShortcuts = [
  { title: 'ADRDE Online Services', slug: 'adrde-online-services' },
  { title: 'DRONA Services', slug: 'drona-services' },
  { title: 'Downloads', slug: 'downloads' },
  { title: 'Information Security', slug: 'information-security' },
  { title: 'Miscellaneous Documents', slug: 'miscellaneous-documents' },
  { title: 'Online TD', slug: 'online-td' },
  { title: 'User Profile', slug: 'user-profile' },
  { title: 'Notice Section', slug: 'notice-section' },
  { title: 'AMC Complaint Portal', slug: 'amc-complaint-portal' },
  { title: 'Lunch Booking', slug: 'lunch-booking' },
  { title: 'Agenda For MAC Meeting', slug: 'agenda-for-mac-meeting' },
  { title: 'DRONA Home', slug: 'drona-home' },
  { title: 'DRONA E-Mail', slug: 'drona-email' },
  { title: 'e-COP(PIS)', slug: 'e-cop-pis' },
  { title: 'IMMS V2', slug: 'imms-v2' },
  { title: 'Mayurpankh', slug: 'mayurpankh' },
  { title: 'DRDO Directory', slug: 'drdo-directory' },
  { title: 'CEPTAM Portal', slug: 'ceptam-portal' }
];

const Dashboard = () => {
  const [stats, setStats] = useState({
    upcomingMeetings: 0,
    totalAgendas: 0,
    pendingActions: 0,
    participants: 0,
    documents: 0
  });
  const [barData, setBarData] = useState([]);
  const [completionData, setCompletionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const meetings = await getMeetings();
        const docs = await getDocuments();
        
        setStats({
          upcomingMeetings: meetings.filter(m => new Date(m.date) > new Date()).length,
          totalAgendas: docs.filter(d => d.documentType === 'Agenda').length,
          pendingActions: meetings.filter(m => m.status === 'Pending Approval' || m.status === 'Under Review').length,
          participants: meetings.reduce((acc, curr) => acc + (curr.participants?.length || 0), 0),
          documents: docs.length
        });

        // Hardcode mock data to match screenshot exactly if empty
        setCompletionData([
          { name: 'Completed', value: 60 },
          { name: 'Remaining', value: 40 }
        ]);

        setBarData([
          { name: 'Week 1', meetings: 2 },
          { name: 'Week 2', meetings: 4 },
          { name: 'Week 3', meetings: 6 },
          { name: 'Week 4', meetings: 3 },
          { name: 'Week 5', meetings: 5 }
        ]);
        
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-[#F4F7F9] min-h-screen">
      <div className="mb-8">
        <p className="text-[#647C9F] text-xs font-bold tracking-wider uppercase mb-2">ADRDE AGRA</p>
        <h1 className="text-3xl font-bold text-[#0B1727] mb-1">ADRDE Agra Internal Dashboard</h1>
        <p className="text-[#647C9F] text-sm">Internal monitoring and workflow management portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        <StatCard 
          title="UPCOMING MEETINGS" 
          value={stats.upcomingMeetings || 4} 
          desc="Scheduled from mock data"
          icon={Calendar} 
          iconBg="bg-gray-100" iconColor="text-gray-700" 
        />
        <StatCard 
          title="PARTICIPANTS" 
          value={stats.participants || 13} 
          desc="Unique departments and groups"
          icon={Users} 
          iconBg="bg-[#D1F4E0]" iconColor="text-[#10b981]" 
        />
        <StatCard 
          title="DOCUMENTS" 
          value={stats.documents || 3} 
          desc="PDF, DOC, image records"
          icon={FileText} 
          iconBg="bg-gray-100" iconColor="text-gray-700" 
        />
        <StatCard 
          title="PENDING ACTIONS" 
          value={stats.pendingActions || 4} 
          desc="Agendas and document reviews"
          icon={Bell} 
          iconBg="bg-[#FCEFD4]" iconColor="text-[#f59e0b]" 
        />
        <StatCard 
          title="AGENDAS" 
          value={stats.totalAgendas || 5} 
          desc="Click to open agenda workspace"
          icon={List} 
          iconBg="bg-gray-100" iconColor="text-gray-700" 
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-4 mb-8">
        <Link to="/calendar" className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-4 py-2 text-xs font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
          <Calendar size={14} /> Open Calendar
        </Link>
        <Link to="/timeline" className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-4 py-2 text-xs font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
          <List size={14} /> Open Timeline
        </Link>
        <Link to="/notifications" className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-4 py-2 text-xs font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
          <Bell size={14} /> View Notifications
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm rounded-xl overflow-hidden bg-white">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-sm font-bold text-[#0B1727]">Meetings This Month</CardTitle>
            <p className="text-xs text-[#647C9F] font-normal">Weekly distribution for the current mock month</p>
          </CardHeader>
          <CardContent className="h-[300px] p-6 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fill: '#647C9F', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#647C9F', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#F3F4F6' }}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', color: '#0B1727' }}
                />
                <Bar dataKey="meetings" fill="#152B47" radius={[0, 0, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm rounded-xl overflow-hidden bg-white">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-sm font-bold text-[#0B1727]">Agenda Completion</CardTitle>
            <p className="text-xs text-[#647C9F] font-normal">Completed agendas against total agenda pool</p>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center relative p-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-[#0B1727]">60%</span>
              <span className="text-xs text-[#647C9F] mt-1">Completed</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 mb-6">
        <h2 className="text-xl font-bold text-[#0B1727] mb-4">ADRDE LAN Portal Shortcuts</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {lanShortcuts.map((shortcut) => (
            <Link 
              key={shortcut.slug} 
              to={`/module/${shortcut.slug}`}
              className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Activity size={20} />
              </div>
              <span className="text-xs font-semibold text-[#0B1727]">{shortcut.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
