import { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Mail, Search, Filter, ArrowRight, ArrowLeft, Send } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const mockLetters = [
  { id: 'LTR-2026-001', subject: 'Project Approval MAC', type: 'Incoming', sender: 'Ministry of Defence', date: '2026-06-01', status: 'Action Required' },
  { id: 'LTR-2026-002', subject: 'Budget Allocation Request', type: 'Outgoing', sender: 'ADRDE Finance', date: '2026-06-02', status: 'Sent' },
  { id: 'LTR-2026-003', subject: 'Vendor Equipment Delay', type: 'Incoming', sender: 'TechSuppliers Inc.', date: '2026-06-03', status: 'Resolved' },
  { id: 'LTR-2026-004', subject: 'Quarterly Audit Report', type: 'Draft', sender: 'Internal Audit', date: '2026-06-04', status: 'Draft' },
];

const Letters = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredLetters = mockLetters.filter(l => activeTab === 'All' || l.type === activeTab);

  const getIcon = (type) => {
    if (type === 'Incoming') return <ArrowRight className="text-blue-500" size={18} />;
    if (type === 'Outgoing') return <ArrowLeft className="text-green-500" size={18} />;
    return <Send className="text-gray-400" size={18} />;
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-main)]">Letters & Dispatch</h1>
          <p className="text-[var(--text-muted)]">Manage incoming, outgoing, and drafted letters.</p>
        </div>
        <Button variant="primary" className="gap-2 shrink-0">
          <Mail size={18} />
          Compose Letter
        </Button>
      </div>

      <Card className="border-0 shadow-sm rounded-xl overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="flex border-b border-gray-200">
            {['All', 'Incoming', 'Outgoing', 'Draft'].map(tab => (
              <button 
                key={tab}
                className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="p-4 flex flex-col sm:flex-row gap-4 border-b border-gray-100 bg-gray-50">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search letters by ID or subject..." 
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <Button variant="outline" className="gap-2 text-gray-600 bg-white hover:bg-gray-50">
              <Filter size={16} /> Filter
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-3 font-semibold text-xs text-gray-500 uppercase tracking-wider w-12">Type</th>
                  <th className="px-6 py-3 font-semibold text-xs text-gray-500 uppercase tracking-wider">Letter ID & Subject</th>
                  <th className="px-6 py-3 font-semibold text-xs text-gray-500 uppercase tracking-wider">Sender/Recipient</th>
                  <th className="px-6 py-3 font-semibold text-xs text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 font-semibold text-xs text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLetters.map((letter) => (
                  <tr key={letter.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        {getIcon(letter.type)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 group-hover:text-blue-600">{letter.subject}</div>
                      <div className="text-xs text-gray-500">{letter.id}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{letter.sender}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{letter.date}</td>
                    <td className="px-6 py-4">
                      <Badge variant={letter.status === 'Sent' || letter.status === 'Resolved' ? 'success' : letter.status === 'Draft' ? 'secondary' : 'warning'}>
                        {letter.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Letters;
