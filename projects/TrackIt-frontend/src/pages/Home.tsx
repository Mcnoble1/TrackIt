import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Shield, Truck, Users, BarChart3, QrCode } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-emerald-700">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-20"
            src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            alt="Warehouse"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Secure Supply Chain Management
          </h1>
          <p className="mt-6 text-xl text-emerald-100 max-w-3xl">
            Track, verify, and manage your products from source to destination using blockchain technology.
            Ensure authenticity and combat counterfeiting in Nigerian markets.
          </p>
          <div className="mt-10 flex space-x-4">
            <Link to="/track" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-emerald-700 bg-white hover:bg-emerald-50">
              Track Product
            </Link>
            <Link to="/create" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-600">
              Register Product
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              End-to-End Supply Chain Solutions
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Feature
                icon={<Shield className="h-8 w-8" />}
                title="Product Authentication"
                description="Verify product authenticity using blockchain technology and QR codes to combat counterfeiting."
              />
              <Feature
                icon={<Truck className="h-8 w-8" />}
                title="Real-time Tracking"
                description="Monitor your products' journey from source to destination with detailed location updates."
              />
              <Feature
                icon={<Users className="h-8 w-8" />}
                title="Supplier Management"
                description="Connect with verified suppliers and manage relationships through our platform."
              />
              <Feature
                icon={<BarChart3 className="h-8 w-8" />}
                title="Analytics Dashboard"
                description="Get insights into your supply chain performance and identify areas for improvement."
              />
              <Feature
                icon={<Package className="h-8 w-8" />}
                title="Inventory Management"
                description="Track stock levels and manage inventory across multiple locations."
              />
              <Feature
                icon={<QrCode className="h-8 w-8" />}
                title="QR Code Integration"
                description="Generate and scan QR codes for quick product verification and tracking."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Supported Product Categories</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCategory
              image="https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              title="Pharmaceuticals"
              description="Ensure the authenticity of medical products and maintain proper storage conditions."
            />
            <ProductCategory
              image="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              title="Food & Beverages"
              description="Track freshness and maintain food safety throughout the supply chain."
            />
            <ProductCategory
              image="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              title="Electronics"
              description="Verify authenticity and track warranty information for electronic products."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="relative">
    <div className="absolute h-12 w-12 rounded-md bg-emerald-500 text-white flex items-center justify-center">
      {icon}
    </div>
    <div className="ml-16">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-base text-gray-500">{description}</p>
    </div>
  </div>
);

const ProductCategory = ({ image, title, description }: { image: string; title: string; description: string }) => (
  <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
    <div className="flex-shrink-0">
      <img className="h-48 w-full object-cover" src={image} alt={title} />
    </div>
    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-3 text-base text-gray-500">{description}</p>
      </div>
    </div>
  </div>
);