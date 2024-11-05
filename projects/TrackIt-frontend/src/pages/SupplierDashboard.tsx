import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, AlertTriangle, Truck, BarChart3 } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { SupplyChainContract } from '../contracts/SupplyChainContract';

export default function SupplierDashboard() {
  const { address } = useWallet();
  const [stats, setStats] = useState({
    activeShipments: 0,
    totalProducts: 0,
    pendingDeliveries: 0,
    qualityIssues: 0
  });

  useEffect(() => {
    // In production, fetch real stats from blockchain
    if (address) {
      setStats({
        activeShipments: 12,
        totalProducts: 156,
        pendingDeliveries: 8,
        qualityIssues: 2
      });
    }
  }, [address]);

  if (!address) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Please connect your wallet to continue</h2>
        <p className="text-gray-600 mt-2">You need to connect your Algorand wallet to access the supplier dashboard</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Supplier Dashboard</h1>
        <div className="text-sm text-gray-600">
          Connected: {`${address.slice(0, 4)}...${address.slice(-4)}`}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Truck}
          title="Active Shipments"
          value={stats.activeShipments}
          color="bg-blue-500"
        />
        <StatCard
          icon={Package}
          title="Total Products"
          value={stats.totalProducts}
          color="bg-emerald-500"
        />
        <StatCard
          icon={TrendingUp}
          title="Pending Deliveries"
          value={stats.pendingDeliveries}
          color="bg-yellow-500"
        />
        <StatCard
          icon={AlertTriangle}
          title="Quality Issues"
          value={stats.qualityIssues}
          color="bg-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Shipments</h2>
          <div className="space-y-4">
            <ShipmentItem
              id="SHP-2024-001"
              product="Electronics Batch"
              destination="Lagos"
              status="In Transit"
            />
            <ShipmentItem
              id="SHP-2024-002"
              product="Pharmaceutical Supplies"
              destination="Abuja"
              status="Delivered"
            />
            <ShipmentItem
              id="SHP-2024-003"
              product="Food Products"
              destination="Port Harcourt"
              status="Pending"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quality Metrics</h2>
          <div className="space-y-4">
            <QualityMetric
              label="On-Time Delivery"
              value={92}
              color="bg-emerald-500"
            />
            <QualityMetric
              label="Product Quality"
              value={98}
              color="bg-blue-500"
            />
            <QualityMetric
              label="Customer Satisfaction"
              value={95}
              color="bg-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

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

const ShipmentItem = ({ id, product, destination, status }: any) => (
  <div className="flex items-center justify-between py-3 border-b last:border-0">
    <div>
      <p className="font-medium text-gray-800">{product}</p>
      <p className="text-sm text-gray-500">ID: {id}</p>
    </div>
    <div className="text-right">
      <p className="text-sm text-gray-600">{destination}</p>
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${status === 'Delivered' ? 'bg-green-100 text-green-800' :
          status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'}`}>
        {status}
      </span>
    </div>
  </div>
);

const QualityMetric = ({ label, value, color }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`${color} rounded-full h-2`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);