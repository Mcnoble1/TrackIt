import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

const Dashboard = () => {
  const { address } = useWallet();
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeShipments: 0,
    registeredUsers: 0,
    alerts: 0
  });

  useEffect(() => {
    // In a real application, fetch these stats from the blockchain
    setStats({
      totalProducts: 156,
      activeShipments: 23,
      registeredUsers: 45,
      alerts: 2
    });
  }, []);

  const StatCard = ({ icon: Icon, title, value, color }: any) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  if (!address) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Please connect your wallet to continue</h2>
        <p className="text-gray-600 mt-2">You need to connect your Algorand wallet to access the dashboard</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Supply Chain Dashboard</h1>
        <div className="text-sm text-gray-600">
          Connected: {`${address.slice(0, 4)}...${address.slice(-4)}`}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Package}
          title="Total Products"
          value={stats.totalProducts}
          color="bg-blue-500"
        />
        <StatCard
          icon={TrendingUp}
          title="Active Shipments"
          value={stats.activeShipments}
          color="bg-green-500"
        />
        <StatCard
          icon={Users}
          title="Registered Users"
          value={stats.registeredUsers}
          color="bg-purple-500"
        />
        <StatCard
          icon={AlertTriangle}
          title="Active Alerts"
          value={stats.alerts}
          color="bg-red-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {/* This would be populated with real blockchain data in production */}
          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center space-x-3">
              <Package className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">New product registered</p>
                <p className="text-sm text-gray-500">Product ID: PRD-2024-001</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">2 minutes ago</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Shipment location updated</p>
                <p className="text-sm text-gray-500">Lagos → Abuja</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">15 minutes ago</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="font-medium">Temperature alert</p>
                <p className="text-sm text-gray-500">Shipment PRD-2024-003</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;