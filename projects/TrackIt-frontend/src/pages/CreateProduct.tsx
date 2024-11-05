import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { SupplyChainContract } from '../contracts/SupplyChainContract';
import ProductForm from '../components/ProductForm';
import ProductQRCode from '../components/ProductQRCode';
import toast from 'react-hot-toast';

const CreateProduct = () => {
  const { address } = useWallet();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [createdProduct, setCreatedProduct] = useState<any>(null);
  const contract = new SupplyChainContract();

  const handleSubmit = async (data: any) => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    try {
      const txn = await contract.createProduct(
        address,
        data.productId,
        data.name,
        data.location,
        data.category,
        data.manufacturer,
        Date.now(),
        data.expiryDate ? new Date(data.expiryDate).getTime() : undefined,
        data.batchNumber
      );
      
      setCreatedProduct(data);
      toast.success('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product');
    } finally {
      setIsLoading(false);
    }
  };

  if (!address) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Please connect your wallet to continue</h2>
        <p className="text-gray-600 mt-2">You need to connect your Algorand wallet to create products</p>
      </div>
    );
  }

  if (createdProduct) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
              <Package className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Product Created Successfully!</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-gray-600">Product ID</dt>
                  <dd className="font-medium">{createdProduct.productId}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600">Name</dt>
                  <dd className="font-medium">{createdProduct.name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600">Manufacturer</dt>
                  <dd className="font-medium">{createdProduct.manufacturer}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600">Location</dt>
                  <dd className="font-medium">{createdProduct.location}</dd>
                </div>
                {createdProduct.batchNumber && (
                  <div>
                    <dt className="text-sm text-gray-600">Batch Number</dt>
                    <dd className="font-medium">{createdProduct.batchNumber}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold mb-4">Verification QR Code</h3>
              <ProductQRCode productId={createdProduct.productId} />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => setCreatedProduct(null)}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
            >
              Create Another Product
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Package className="h-6 w-6 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-800">Create New Product</h1>
        </div>
        <ProductForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          buttonText="Create Product"
        />
      </div>
    </div>
  );
};

export default CreateProduct;