import { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Mail, Search, Filter, ArrowRight, ArrowLeft, Send, X } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { getLetters, addLetter } from '../services/dataService';

const Letters = () => {
  const [letters, setLetters] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [showCompose, setShowCompose] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [formData, setFormData] = useState({
    subject: '',
    type: 'Incoming',
    sender: '',
    recipient: '',
    content: ''
  });

  useEffect(() => {
    fetchLetters();
  }, []);

  const fetchLetters = async () => {
    try {
      const data = await getLetters();
      setLetters(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleComposeSubmit = async (e) => {
    e.preventDefault();
    try {
      await addLetter(formData);
      setShowCompose(false);
      fetchLetters();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredLetters = letters.filter(l => activeTab === 'All' || l.type === activeTab);
  const [activeTab, setActiveTab] = useState('All');

  const filteredLetters = letters.filter(l => activeTab === 'All' || l.type === activeTab);

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
        <Button variant="primary" className="gap-2 shrink-0" onClick={() => setShowCompose(true)}>
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
                  <tr key={letter._id} onClick={() => setSelectedLetter(letter)} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        {getIcon(letter.type)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 group-hover:text-blue-600">{letter.subject}</div>
                      <div className="text-xs text-gray-500">{letter.letterId}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{letter.type === 'Incoming' ? letter.sender : letter.recipient}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(letter.createdAt).toLocaleDateString()}</td>
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

      {showCompose && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Compose Letter</h2>
              <button onClick={() => setShowCompose(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <form onSubmit={handleComposeSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input required type="text" className="w-full border rounded px-3 py-2" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select className="w-full border rounded px-3 py-2" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option value="Incoming">Incoming</option>
                    <option value="Outgoing">Outgoing</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">{formData.type === 'Incoming' ? 'Sender' : 'Recipient'}</label>
                  <input required type="text" className="w-full border rounded px-3 py-2" value={formData.type === 'Incoming' ? formData.sender : formData.recipient} onChange={e => {
                    if (formData.type === 'Incoming') setFormData({...formData, sender: e.target.value});
                    else setFormData({...formData, recipient: e.target.value});
                  }} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Letter Content</label>
                <textarea required rows={4} className="w-full border rounded px-3 py-2" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})}></textarea>
              </div>
              <div className="pt-2">
                <Button type="submit" variant="primary" className="w-full">Dispatch Letter</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedLetter && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg border-t-4 border-blue-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold">{selectedLetter.subject}</h2>
                <span className="text-sm text-gray-500">{selectedLetter.letterId} | {new Date(selectedLetter.createdAt).toLocaleDateString()}</span>
              </div>
              <button onClick={() => setSelectedLetter(null)}><X size={20} className="text-gray-500 hover:text-gray-900" /></button>
            </div>
            <div className="bg-gray-50 p-4 rounded mb-4">
              <p className="text-sm"><strong>Type:</strong> {selectedLetter.type}</p>
              <p className="text-sm"><strong>From:</strong> {selectedLetter.sender || 'N/A'}</p>
              <p className="text-sm"><strong>To:</strong> {selectedLetter.recipient || 'N/A'}</p>
              <p className="text-sm mt-2"><strong>Status:</strong> {selectedLetter.status}</p>
            </div>
            <div className="border border-gray-200 p-4 rounded text-sm text-gray-700 whitespace-pre-wrap h-48 overflow-y-auto">
              {selectedLetter.content || 'No content available.'}
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={() => setSelectedLetter(null)}>Close Viewer</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Letters;
