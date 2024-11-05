import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { SupplyChainContract } from '../contracts/SupplyChainContract';
import toast from 'react-hot-toast';

const TransferOwnership = () => {
  const { address } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const contract = new SupplyChainContract();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    setIsLoading(true);
    try {
      const txn = await contract.transferOwnership(
        address,
        data.receiverAddress as string,
        data.productId as string,
        Date.now()
      );
      
      // In production, sign and send the transaction
      toast.success('Ownership transferred successfully!');
    } catch (error) {
      console.error('Error transferring ownership:', error);
      toast.error('Failed to transfer ownership');
    } finally {
      setIsLoading(false);
    }
  };

  if (!address) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Please connect your wallet to continue</h2>
        <p className="text-gray-600 mt-2">You need to connect your Algorand wallet to transfer ownership</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Send className="h-6 w-6 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-800">Transfer Ownership</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="productId" className="block text-sm font-medium text-gray-700">
              Product ID
            </label>
            <input
              type="text"
              name="productId"
              id="productId"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="PRD-2024-001"
            />
          </div>

          <div>
            <label htmlFor="receiverAddress" className="block text-sm font-medium text-gray-700">
              Receiver's Algorand Address
            </label>
            <input
              type="text"
              name="receiverAddress"
              id="receiverAddress"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="Enter Algorand address"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center space-x-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <Send className="h-5 w-5" />
            )}
            <span>Transfer Ownership</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransferOwnership;