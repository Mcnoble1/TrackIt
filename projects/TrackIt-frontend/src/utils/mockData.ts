import { randomUUID } from 'crypto';

export const mockProducts = [
  {
    productId: 'PRD-2024-001',
    name: 'Premium Rice',
    manufacturer: 'Golden Harvest Nigeria Ltd',
    origin: 'Kebbi State, Nigeria',
    category: 'Food & Beverages',
    timestamp: Date.now() - 5000000,
    expiryDate: Date.now() + 15000000,
    batchNumber: 'BAT-001-2024',
    isAuthentic: true
  },
  {
    productId: 'PRD-2024-002',
    name: 'Paracetamol Extra',
    manufacturer: 'PharmaCare Ltd',
    origin: 'Lagos, Nigeria',
    category: 'Pharmaceuticals',
    timestamp: Date.now() - 3000000,
    expiryDate: Date.now() + 31536000000, // 1 year
    batchNumber: 'BAT-002-2024',
    isAuthentic: true
  },
  {
    productId: 'PRD-2024-003',
    name: 'Smartphone X1',
    manufacturer: 'TechGlobal Nigeria',
    origin: 'Lagos, Nigeria',
    category: 'Electronics',
    timestamp: Date.now() - 2000000,
    batchNumber: 'BAT-003-2024',
    isAuthentic: true
  }
];

export const mockHistory = {
  'PRD-2024-001': [
    {
      type: 'PRODUCT_CREATION',
      location: 'Kebbi State Factory',
      timestamp: Date.now() - 5000000,
      temperature: 25,
      humidity: 45
    },
    {
      type: 'LOCATION_UPDATE',
      location: 'Abuja Distribution Center',
      timestamp: Date.now() - 4000000,
      temperature: 24,
      humidity: 50
    },
    {
      type: 'LOCATION_UPDATE',
      location: 'Lagos Warehouse',
      timestamp: Date.now() - 2000000,
      temperature: 26,
      humidity: 55
    }
  ],
  'PRD-2024-002': [
    {
      type: 'PRODUCT_CREATION',
      location: 'Lagos Factory',
      timestamp: Date.now() - 3000000,
      temperature: 22,
      humidity: 40
    },
    {
      type: 'LOCATION_UPDATE',
      location: 'Ibadan Distribution Center',
      timestamp: Date.now() - 2000000,
      temperature: 23,
      humidity: 45
    }
  ],
  'PRD-2024-003': [
    {
      type: 'PRODUCT_CREATION',
      location: 'Lagos Assembly Plant',
      timestamp: Date.now() - 2000000
    },
    {
      type: 'QUALITY_CHECK',
      location: 'Quality Control Center',
      timestamp: Date.now() - 1500000,
      status: 'PASSED'
    }
  ]
};

export const generateMockProduct = () => {
  const productId = `PRD-${Date.now().toString().slice(-4)}-${randomUUID().slice(0, 4)}`;
  return {
    productId,
    name: 'New Test Product',
    manufacturer: 'Test Manufacturer Ltd',
    origin: 'Lagos, Nigeria',
    category: 'Electronics',
    timestamp: Date.now(),
    batchNumber: `BAT-${Date.now().toString().slice(-3)}`,
    isAuthentic: true
  };
};