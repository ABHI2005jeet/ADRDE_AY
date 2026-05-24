import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Users, FileText, CheckCircle, Clock } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const mockBarData = [
  { name: 'Jan', meetings: 4 },
  { name: 'Feb', meetings: 3 },
  { name: 'Mar', meetings: 7 },
  { name: 'Apr', meetings: 5 },
  { name: 'May', meetings: 2 },
];

const mockPieData = [
  { name: 'Completed', value: 60 },
  { name: 'Pending', value: 30 },
  { name: 'Approved', value: 10 },
];
const COLORS = ['#10b981', '#f59e0b', '#3b82f6'];

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <Card>
    <CardContent className="p-6 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-[var(--text-muted)] mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-[var(--text-main)]">{value}</h3>
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClass}`}>
        <Icon size={24} />
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-main)]">Dashboard</h1>
          <p className="text-[var(--text-muted)]">Overview of MAC Meeting activities</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Upcoming Meetings" 
          value="3" 
          icon={Clock} 
          colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
        />
        <StatCard 
          title="Total Agendas" 
          value="24" 
          icon={FileText} 
          colorClass="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" 
        />
        <StatCard 
          title="Pending Actions" 
          value="7" 
          icon={CheckCircle} 
          colorClass="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" 
        />
        <StatCard 
          title="Participants" 
          value="142" 
          icon={Users} 
          colorClass="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Meetings Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'var(--border-color)', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }}
                />
                <Bar dataKey="meetings" fill="var(--color-primary-light)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agenda Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute right-8 flex flex-col gap-3">
              {mockPieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-sm text-[var(--text-muted)]">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
