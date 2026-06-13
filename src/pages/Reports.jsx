import { Card, CardContent } from '../components/ui/Card';
import { FileBarChart, Download, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getMeetings, getInventory } from '../services/dataService';

const Reports = () => {
  const [downloadMsg, setDownloadMsg] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);

  const generateMeetingReport = async () => {
    try {
      setIsGenerating(true);
      setDownloadMsg('Fetching meeting data...');
      const meetings = await getMeetings();
      
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Monthly MAC Meeting Summary', 14, 22);
      
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
      
      const tableColumn = ["ID", "Title", "Date", "Status", "Priority"];
      const tableRows = [];

      meetings.forEach(meeting => {
        const rowData = [
          meeting._id.substring(0, 8).toUpperCase(),
          meeting.title,
          new Date(meeting.date).toLocaleDateString(),
          meeting.status,
          meeting.priority || 'Medium'
        ];
        tableRows.push(rowData);
      });

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [21, 43, 71] }
      });
      
      doc.save('MAC_Meeting_Summary.pdf');
      setDownloadMsg('PDF Downloaded successfully!');
    } catch (err) {
      setDownloadMsg('Failed to generate report.');
    } finally {
      setIsGenerating(false);
      setTimeout(() => setDownloadMsg(''), 5000);
    }
  };

  const generateInventoryReport = async () => {
    try {
      setIsGenerating(true);
      setDownloadMsg('Fetching inventory data...');
      const inventory = await getInventory();
      
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Inventory Audit Report', 14, 22);
      
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
      
      const tableColumn = ["Item ID", "Name", "Category", "Quantity", "Status"];
      const tableRows = [];

      inventory.forEach(item => {
        const rowData = [
          item.itemId,
          item.name,
          item.category,
          item.quantity.toString(),
          item.status
        ];
        tableRows.push(rowData);
      });

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [21, 43, 71] }
      });
      
      doc.save('Inventory_Audit_Report.pdf');
      setDownloadMsg('PDF Downloaded successfully!');
    } catch (err) {
      setDownloadMsg('Failed to generate report.');
    } finally {
      setIsGenerating(false);
      setTimeout(() => setDownloadMsg(''), 5000);
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-main)]">Automated Reports</h1>
          <p className="text-[var(--text-muted)]">Generate and download PDF reports for meetings and inventory.</p>
        </div>
      </div>

      {downloadMsg && (
        <div className="bg-[#D1F4E0] text-[#10b981] p-4 rounded-lg flex items-center justify-between font-medium">
          {downloadMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <FileBarChart size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Monthly MAC Meeting Summary</h3>
                <p className="text-sm text-gray-500 mb-4">Detailed compilation of all meetings, agendas, attendees, and resolutions for the current month.</p>
                <Button variant="outline" onClick={generateMeetingReport} disabled={isGenerating} className="w-full justify-center gap-2">
                  <Download size={16} /> {isGenerating ? 'Generating...' : 'Generate PDF'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <FileText size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Inventory Audit Report</h3>
                <p className="text-sm text-gray-500 mb-4">A complete snapshot of all tracked assets, low stock warnings, and pending acquisition requests.</p>
                <Button variant="outline" onClick={generateInventoryReport} disabled={isGenerating} className="w-full justify-center gap-2">
                  <Download size={16} /> {isGenerating ? 'Generating...' : 'Generate PDF'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
