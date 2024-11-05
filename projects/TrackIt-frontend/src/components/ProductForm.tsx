import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';

interface ProductFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  buttonText: string;
  buttonIcon?: React.ReactNode;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  isLoading = false,
  buttonText,
  buttonIcon = <Package className="h-5 w-5" />
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
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
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          placeholder="Agricultural Products"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          name="location"
          id="location"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          placeholder="Lagos, Nigeria"
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
          buttonIcon
        )}
        <span>{buttonText}</span>
      </button>
    </form>
  );
};

export default ProductForm;