import { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Package, Search, Plus, Filter, AlertTriangle } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const mockInventory = [
  { id: 'INV-001', item: 'Dell Precision Workstations', category: 'IT Hardware', quantity: 15, location: 'Lab 3', status: 'In Stock' },
  { id: 'INV-002', item: 'Aerospace Grade Aluminum', category: 'Raw Materials', quantity: 4, location: 'Warehouse A', status: 'Low Stock' },
  { id: 'INV-003', item: 'Testing Multimeters', category: 'Electronics', quantity: 0, location: 'Lab 1', status: 'Out of Stock' },
  { id: 'INV-004', item: 'Projector Screens', category: 'Office Supplies', quantity: 2, location: 'Conf Room', status: 'In Stock' },
];

const Inventory = () => {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-main)]">Inventory Management</h1>
          <p className="text-[var(--text-muted)]">Track IT assets, hardware, and raw materials.</p>
        </div>
        <Button variant="primary" className="gap-2 shrink-0">
          <Plus size={18} />
          Add Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Package size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Items</p>
              <h3 className="text-2xl font-bold text-gray-900">4,209</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Low Stock Alerts</p>
              <h3 className="text-2xl font-bold text-gray-900">12</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm rounded-xl overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="p-4 flex flex-col sm:flex-row gap-4 border-b border-gray-100 bg-gray-50">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search inventory..." 
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
                  <th className="px-6 py-3 font-semibold text-xs text-gray-500 uppercase tracking-wider">Item ID & Name</th>
                  <th className="px-6 py-3 font-semibold text-xs text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 font-semibold text-xs text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 font-semibold text-xs text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 font-semibold text-xs text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockInventory.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 group-hover:text-blue-600">{item.item}</div>
                      <div className="text-xs text-gray-500">{item.id}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.location}</td>
                    <td className="px-6 py-4">
                      <Badge variant={item.status === 'In Stock' ? 'success' : item.status === 'Low Stock' ? 'warning' : 'danger'}>
                        {item.status}
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

export default Inventory;
