import { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { FileUp, File, FileText, Download, Eye, FileSpreadsheet, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getDocuments } from '../services/dataService';

const getFileIcon = (type) => {
  switch(type) {
    case 'pdf': return <FileText className="text-red-500" size={24} />;
    case 'excel': return <FileSpreadsheet className="text-green-500" size={24} />;
    case 'doc': return <File className="text-blue-500" size={24} />;
    default: return <File className="text-gray-500" size={24} />;
  }
};

const Documents = () => {
  const { user } = useAuth();
  const canUpload = user?.role === 'Admin' || user?.role === 'Scientist';
  const [downloadMsg, setDownloadMsg] = useState('');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const data = await getDocuments();
        setDocuments(data);
      } catch (error) {
        console.error('Failed to fetch documents', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  const handleDownload = (filename) => {
    setDownloadMsg(`Mock Download: ${filename} is being generated and saved...`);
    setTimeout(() => setDownloadMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-main)]">Document Center</h1>
          <p className="text-[var(--text-muted)]">Secure repository for meeting files and records.</p>
        </div>
        
        {canUpload ? (
          <Button variant="primary" className="gap-2 shrink-0">
            <FileUp size={18} />
            Upload File
          </Button>
        ) : (
          <Button variant="outline" className="gap-2 shrink-0" onClick={() => handleDownload('MAC_Summary_Report_Auto.pdf')}>
            <Download size={18} />
            Generate Full Report
          </Button>
        )}
      </div>

      {downloadMsg && (
        <div className="bg-blue-50 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 p-4 rounded-lg flex items-center justify-between animate-in fade-in slide-in-from-top-4">
          <span>{downloadMsg}</span>
          <CheckCircle size={18} className="text-blue-500" />
        </div>
      )}

      <Card>
        <CardContent className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--bg-main)] border-b border-[var(--border-color)]">
                  <th className="p-4 font-semibold text-[var(--text-muted)] text-sm w-12">Type</th>
                  <th className="p-4 font-semibold text-[var(--text-muted)] text-sm">File Name</th>
                  <th className="p-4 font-semibold text-[var(--text-muted)] text-sm">Upload Date</th>
                  <th className="p-4 font-semibold text-[var(--text-muted)] text-sm">Uploaded By</th>
                  <th className="p-4 font-semibold text-[var(--text-muted)] text-sm">Status</th>
                  <th className="p-4 font-semibold text-[var(--text-muted)] text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" className="p-8 text-center text-[var(--text-muted)]">Loading documents...</td></tr>
                ) : documents.length === 0 ? (
                  <tr><td colSpan="6" className="p-8 text-center text-[var(--text-muted)]">No documents available.</td></tr>
                ) : documents.map((doc) => (
                  <tr key={doc._id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-main)] transition-colors">
                    <td className="p-4">{getFileIcon(doc.mimetype?.includes('pdf') ? 'pdf' : doc.mimetype?.includes('spreadsheet') ? 'excel' : 'doc')}</td>
                    <td className="p-4 font-medium text-[var(--text-main)]">{doc.title}</td>
                    <td className="p-4 text-sm text-[var(--text-muted)]">{new Date(doc.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-sm text-[var(--text-muted)]">{doc.uploader?.name || 'Unknown'}</td>
                    <td className="p-4">
                      <Badge variant={doc.approvalStatus === 'Approved' ? 'success' : doc.approvalStatus === 'Rejected' ? 'danger' : 'warning'}>
                        {doc.approvalStatus}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost" title="Preview">
                          <Eye size={16} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          title="Download"
                          onClick={() => handleDownload(doc.title || 'Document')}
                        >
                          <Download size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Mock Generate Report Section for Admin */}
      {canUpload && (
         <Card className="border-[var(--color-primary-light)] bg-blue-50/50 dark:bg-blue-900/10">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--text-main)]">Downloadable Meeting Report</h3>
                <p className="text-sm text-[var(--text-muted)]">Generate a comprehensive auto-formatted PDF containing all schedules, attendees, and approved agendas.</p>
              </div>
            </div>
            <Button variant="primary" onClick={() => handleDownload('Comprehensive_MAC_Report_06_15.pdf')} className="shrink-0 gap-2">
              <Download size={18} />
              Generate PDF Report
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Documents;
