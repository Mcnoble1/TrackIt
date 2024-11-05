import React, { useState } from 'react';
import { Shield, CheckCircle, XCircle, Package, Calendar, Factory, MapPin, QrCode } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { useSearchParams } from 'react-router-dom';
import { SupplyChainContract } from '../contracts/SupplyChainContract';
import QRScanner from '../components/QRScanner';
import toast from 'react-hot-toast';

interface VerificationResult {
  isAuthentic: boolean;
  details?: {
    productId: string;
    name: string;
    manufacturer: string;
    origin: string;
    category: string;
    timestamp: number;
    expiryDate?: number;
    batchNumber?: string;
  };
  history?: any[];
}

const VerifyProduct = () => {
  const [searchParams] = useSearchParams();
  const { address } = useWallet();
  const [productId, setProductId] = useState(searchParams.get('id') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const contract = new SupplyChainContract();

  const handleVerify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!productId.trim()) {
      toast.error('Please enter a product ID');
      return;
    }

    setIsLoading(true);
    try {
      const verificationResult = await contract.verifyProduct(productId);
      setResult(verificationResult);
      
      if (!verificationResult.isAuthentic) {
        toast.error('Product verification failed. This product may be counterfeit.');
      } else {
        toast.success('Product verified successfully!');
      }
    } catch (error) {
      console.error('Error verifying product:', error);
      toast.error('Failed to verify product. Please try again.');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanResult = (scannedProductId: string) => {
    setProductId(scannedProductId);
    handleVerify();
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="h-6 w-6 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-800">Verify Product Authenticity</h1>
        </div>

        <form onSubmit={handleVerify} className="mb-8">
          <div className="flex space-x-4">
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter Product ID"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={() => setShowScanner(true)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <QrCode className="h-5 w-5" />
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                <Shield className="h-5 w-5" />
              )}
              <span>Verify</span>
            </button>
          </div>
        </form>

        {showScanner && (
          <QRScanner
            onResult={handleScanResult}
            onClose={() => setShowScanner(false)}
          />
        )}

        {result && (
          <div className="space-y-6">
            <div className={`p-4 rounded-lg ${result.isAuthentic ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex items-center space-x-3">
                {result.isAuthentic ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
                <h2 className="text-lg font-semibold">
                  {result.isAuthentic ? 'Authentic Product' : 'Verification Failed'}
                </h2>
              </div>
            </div>

            {result.isAuthentic && result.details && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProductDetail
                  icon={Package}
                  label="Product Name"
                  value={result.details.name}
                />
                <ProductDetail
                  icon={Factory}
                  label="Manufacturer"
                  value={result.details.manufacturer}
                />
                <ProductDetail
                  icon={MapPin}
                  label="Origin"
                  value={result.details.origin}
                />
                <ProductDetail
                  icon={Calendar}
                  label="Manufacturing Date"
                  value={formatDate(result.details.timestamp)}
                />
                {result.details.expiryDate && (
                  <ProductDetail
                    icon={Calendar}
                    label="Expiry Date"
                    value={formatDate(result.details.expiryDate)}
                  />
                )}
                {result.details.batchNumber && (
                  <ProductDetail
                    icon={Package}
                    label="Batch Number"
                    value={result.details.batchNumber}
                  />
                )}
              </div>
            )}

            {result.isAuthentic && result.history && result.history.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Product Journey</h3>
                <div className="relative">
                  {result.history.map((event, index) => {
                    const data = JSON.parse(atob(event.note));
                    return (
                      <div key={index} className="flex items-start mb-8">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-medium text-gray-900">
                              {data.type === 'LOCATION_UPDATE' ? data.location : 'Status Update'}
                            </h4>
                            <span className="text-sm text-gray-500">
                              {formatDate(data.timestamp)}
                            </span>
                          </div>
                          {data.temperature && (
                            <p className="mt-1 text-sm text-gray-600">
                              Temperature: {data.temperature}°C
                            </p>
                          )}
                          {data.humidity && (
                            <p className="mt-1 text-sm text-gray-600">
                              Humidity: {data.humidity}%
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ProductDetail = ({ 
  icon: Icon, 
  label, 
  value 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: string;
}) => (
  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
    <Icon className="h-5 w-5 text-gray-500" />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  </div>
);

export default VerifyProduct;