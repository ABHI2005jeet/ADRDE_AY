import { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Settings, Users, Link as LinkIcon, Shield, Bell, FileText } from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'shortcuts', label: 'Manage Shortcuts', icon: LinkIcon },
    { id: 'roles', label: 'Roles & Permissions', icon: Shield },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'notices', label: 'Notices', icon: FileText },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-[#F4F7F9] min-h-screen">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-12 h-12 bg-[#152B47] text-white rounded-lg flex items-center justify-center">
          <Settings size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#0B1727] mb-1">Admin Settings</h1>
          <p className="text-[#647C9F] text-sm">System configuration and management console</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'bg-[#152B47] text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden bg-white min-h-[500px]">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#0B1727] mb-6 capitalize">{activeTab.replace('-', ' ')}</h2>
              
              <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg text-center bg-gray-50 flex flex-col items-center justify-center h-64">
                <Settings size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-500 text-sm max-w-md">
                  This configuration panel is under development. In the final release, you will be able to manage {activeTab.replace('-', ' ')} directly from this interface.
                </p>
                <button className="mt-6 bg-[#152B47] text-white px-6 py-2 rounded shadow-sm hover:bg-[#0B1727] transition-colors text-sm font-medium">
                  Initialize Database Settings
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
