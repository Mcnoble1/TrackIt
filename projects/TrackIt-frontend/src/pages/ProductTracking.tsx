import React, { useState } from 'react';
import { Search, Package, MapPin, Clock } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { SupplyChainContract } from '../contracts/SupplyChainContract';
import toast from 'react-hot-toast';

const ProductTracking = () => {
  const { address } = useWallet();
  const [productId, setProductId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const contract = new SupplyChainContract();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId.trim()) {
      toast.error('Please enter a product ID');
      return;
    }

    setIsLoading(true);
    try {
      const transactions = await contract.getProductHistory(productId);
      setHistory(transactions.transactions || []);
      if (!transactions.transactions?.length) {
        toast.error('No history found for this product');
      }
    } catch (error) {
      console.error('Error fetching product history:', error);
      toast.error('Failed to fetch product history');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Package className="h-6 w-6 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-800">Track Product</h1>
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex space-x-4">
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter Product ID"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                <Search className="h-5 w-5" />
              )}
              <span>Track</span>
            </button>
          </div>
        </form>

        {history.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Product History</h2>
            <div className="relative">
              {history.map((event, index) => (
                <div key={index} className="flex items-start mb-8">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {event.note ? JSON.parse(atob(event.note)).location : 'Location Update'}
                      </h3>
                      <span className="text-sm text-gray-500">
                        <Clock className="inline h-4 w-4 mr-1" />
                        {new Date(event.round * 1000).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      Transaction ID: {event.id}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTracking;