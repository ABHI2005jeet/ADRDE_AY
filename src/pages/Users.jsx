import { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Users as UsersIcon, Shield, Search, MoreVertical, Plus } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

const mockUsers = [
  { id: 'EMP-001', name: 'Dhirendra Kumar', email: 'dhirendrakumar8594@gmail.com', role: 'Admin', department: 'IT' },
  { id: 'EMP-002', name: 'Dr. Sharma', email: 'sharma@drdo.gov.in', role: 'Para Head', department: 'MAC' },
  { id: 'EMP-003', name: 'Ravi Verma', email: 'ravi@drdo.gov.in', role: 'Scientist', department: 'R&D' },
  { id: 'EMP-004', name: 'Aisha Singh', email: 'aisha@drdo.gov.in', role: 'Technical Officer', department: 'Testing' }
];

const Users = () => {
  const [activeTab, setActiveTab] = useState('Users');

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-main)]">User Management</h1>
          <p className="text-[var(--text-muted)]">Manage personnel, roles, and system access.</p>
        </div>
        <button className="bg-[#152B47] text-white px-4 py-2 rounded shadow-sm hover:bg-[#0B1727] transition-colors text-sm font-medium flex items-center gap-2">
          <Plus size={16} /> Add User
        </button>
      </div>

      <Card className="border-0 shadow-sm rounded-xl overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="flex border-b border-gray-200">
            <button 
              className={`px-6 py-4 text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'Users' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('Users')}
            >
              <UsersIcon size={16} /> User Directory
            </button>
            <button 
              className={`px-6 py-4 text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'Roles' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('Roles')}
            >
              <Shield size={16} /> Roles & Permissions
            </button>
          </div>

          {activeTab === 'Users' && (
            <>
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search users..." 
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-6 py-3 font-semibold text-xs text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 font-semibold text-xs text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 font-semibold text-xs text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 font-semibold text-xs text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 font-semibold text-xs text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((u) => (
                      <tr key={u.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                              {u.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{u.name}</div>
                              <div className="text-xs text-gray-500">{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{u.id}</td>
                        <td className="px-6 py-4">
                          <Badge variant={u.role === 'Admin' ? 'danger' : u.role === 'Para Head' ? 'primary' : 'secondary'}>
                            {u.role}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{u.department}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'Roles' && (
            <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg text-center bg-gray-50 m-6 flex flex-col items-center justify-center h-64">
              <Shield size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-sm max-w-md">
                Role management and access control mapping is configured from the backend policies.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
