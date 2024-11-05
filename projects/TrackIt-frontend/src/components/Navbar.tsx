import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, Search, PlusCircle, Send, LogOut, LogIn, LayoutDashboard, Shield } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

export default function Navbar() {
  const { address, connectWallet, disconnectWallet, isConnecting, balance, isAuthenticated } = useWallet();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const NavLink = ({ to, icon: Icon, text }: { to: string; icon: React.ElementType; text: string }) => (
    <Link 
      to={to} 
      className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors duration-200
        ${isActive(to) 
          ? 'text-emerald-600 bg-emerald-50' 
          : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'}`}
    >
      <Icon className="h-5 w-5" />
      <span>{text}</span>
    </Link>
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700">
            <Package className="h-8 w-8" />
            <span className="text-xl font-semibold text-gray-900">TrackIt</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/track" icon={Search} text="Track" />
            <NavLink to="/verify" icon={Shield} text="Verify" />
            <NavLink to="/create" icon={PlusCircle} text="Create" />
            <NavLink to="/transfer" icon={Send} text="Transfer" />
            {isAuthenticated && (
              <NavLink to="/dashboard" icon={LayoutDashboard} text="Dashboard" />
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {address ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:block text-sm text-gray-600">
                  <span className="block text-xs text-gray-500">Balance</span>
                  <span className="font-medium">{balance.toFixed(2)} ALGO</span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden md:inline">{address.slice(0, 4)}...{address.slice(-4)}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200 disabled:opacity-50"
              >
                <LogIn className="h-5 w-5" />
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}