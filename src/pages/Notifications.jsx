import { Card, CardContent } from '../components/ui/Card';
import { Bell, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const mockNotifications = [
  { id: 1, title: 'New Document Uploaded', message: 'A new Q2 Agenda PDF was uploaded by Admin.', type: 'info', time: '10 mins ago' },
  { id: 2, title: 'Meeting Approved', message: 'MAC Monthly Review was approved by Para Head.', type: 'success', time: '1 hour ago' },
  { id: 3, title: 'System Maintenance', message: 'Portal downtime scheduled for tomorrow at 2:00 AM.', type: 'warning', time: '3 hours ago' },
  { id: 4, title: 'New Message', message: 'You have received a direct message from IT Support.', type: 'info', time: '5 hours ago' }
];

const Notifications = () => {
  const getIcon = (type) => {
    switch (type) {
      case 'info': return <Info size={20} className="text-blue-500" />;
      case 'success': return <CheckCircle size={20} className="text-green-500" />;
      case 'warning': return <AlertTriangle size={20} className="text-yellow-500" />;
      default: return <Bell size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-main)]">Notifications</h1>
          <p className="text-[var(--text-muted)]">View all system alerts and updates.</p>
        </div>
        <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded shadow-sm hover:bg-gray-50 transition-colors text-sm font-medium">
          Mark All as Read
        </button>
      </div>

      <Card className="border-0 shadow-sm rounded-xl overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {mockNotifications.map(notification => (
              <div key={notification.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors flex gap-4 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
