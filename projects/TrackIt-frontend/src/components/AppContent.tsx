import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from '../pages/Home';
import ProductTracking from '../pages/ProductTracking';
import CreateProduct from '../pages/CreateProduct';
import TransferOwnership from '../pages/TransferOwnership';
import Dashboard from '../pages/Dashboard';
import SupplierDashboard from '../pages/SupplierDashboard';
import VerifyProduct from '../pages/VerifyProduct';
import { Toaster } from 'react-hot-toast';

export default function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/track" element={<ProductTracking />} />
            <Route path="/create" element={<CreateProduct />} />
            <Route path="/transfer" element={<TransferOwnership />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/supplier" element={<SupplierDashboard />} />
            <Route path="/verify" element={<VerifyProduct />} />
          </Routes>
        </div>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}