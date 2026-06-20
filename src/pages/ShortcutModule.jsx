import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { ArrowLeft, Box, CheckCircle, Clock, X, Plus } from 'lucide-react';
import { getModuleEntries, addModuleEntry } from '../services/dataService';

const ShortcutModule = () => {
  const { moduleName } = useParams();
  const title = moduleName.replace(/-/g, ' ');
  const [entries, setEntries] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchEntries();
  }, [moduleName]);

  const fetchEntries = async () => {
    try {
      const data = await getModuleEntries(moduleName);
      setEntries(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateEntry = async (e) => {
    e.preventDefault();
    try {
      await addModuleEntry(moduleName, formData);
      setShowAddModal(false);
      setFormData({ title: '', content: '' });
      fetchEntries();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-[#F4F7F9] min-h-screen">
      <div className="mb-4">
        <Link to="/dashboard" className="text-blue-600 hover:underline flex items-center gap-2 text-sm font-medium">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>
      
      <div className="mb-8">
        <p className="text-[#647C9F] text-xs font-bold tracking-wider uppercase mb-2">Internal Module</p>
        <h1 className="text-3xl font-bold text-[#0B1727] mb-1 capitalize">{title}</h1>
        <p className="text-[#647C9F] text-sm">Welcome to the {title} workspace. Future integrations will be mapped here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 shadow-sm rounded-xl overflow-hidden bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Box size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Records</p>
              <h3 className="text-2xl font-bold text-gray-900">{entries.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm rounded-xl overflow-hidden bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Processed Tasks</p>
              <h3 className="text-2xl font-bold text-gray-900">89</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm rounded-xl overflow-hidden bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Actions</p>
              <h3 className="text-2xl font-bold text-gray-900">12</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm rounded-xl overflow-hidden bg-white">
        <div className="border-b border-gray-100 px-6 py-4">
          <h3 className="font-bold text-gray-800">Module Actions</h3>
        </div>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <button onClick={() => setShowAddModal(true)} className="bg-[#152B47] text-white px-4 py-2 rounded shadow-sm hover:bg-[#0B1727] transition-colors text-sm font-medium flex items-center gap-2">
              <Plus size={16} /> Create New Entry
            </button>
          </div>
          
          <div className="mt-8">
            {entries.length === 0 ? (
              <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg text-center bg-gray-50">
                <p className="text-gray-500 text-sm">
                  This module has no records. Create a new entry to get started.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {entries.map(entry => (
                  <div key={entry._id} className="border border-gray-200 p-4 rounded bg-white shadow-sm hover:shadow transition-shadow">
                    <h4 className="font-bold text-[#0B1727]">{entry.title}</h4>
                    <p className="text-sm text-gray-600 mt-2 mb-4">{entry.content}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
                      <span>By: {entry.createdBy?.name || 'System'}</span>
                      <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Entry to {title}</h2>
              <button onClick={() => setShowAddModal(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <form onSubmit={handleCreateEntry} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title / ID</label>
                <input required type="text" className="w-full border rounded px-3 py-2" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea required rows={4} className="w-full border rounded px-3 py-2" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})}></textarea>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-[#152B47] text-white py-2 rounded shadow hover:bg-[#0B1727]">Save Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortcutModule;
