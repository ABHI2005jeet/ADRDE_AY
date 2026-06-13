import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { ArrowLeft, Box, CheckCircle, Clock } from 'lucide-react';

const ShortcutModule = () => {
  const { moduleName } = useParams();
  const title = moduleName.replace(/-/g, ' ');

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
              <h3 className="text-2xl font-bold text-gray-900">124</h3>
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
            <button className="bg-[#152B47] text-white px-4 py-2 rounded shadow-sm hover:bg-[#0B1727] transition-colors text-sm font-medium">
              Create New Entry
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded shadow-sm hover:bg-gray-50 transition-colors text-sm font-medium">
              View Audit Logs
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded shadow-sm hover:bg-gray-50 transition-colors text-sm font-medium">
              Manage Configuration
            </button>
          </div>
          <div className="mt-8 p-8 border-2 border-dashed border-gray-200 rounded-lg text-center bg-gray-50">
            <p className="text-gray-500 text-sm">
              This module acts as a placeholder for <strong>{title}</strong>. When real endpoints are mapped, the data grid will appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShortcutModule;
