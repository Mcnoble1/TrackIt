# Supply Chain Track - Blockchain-Based Product Authentication

A decentralized supply chain management system built on Algorand blockchain for product authentication and tracking in Nigerian markets.

## Technical Overview

### Core Technologies

- **Frontend**: React 18 with TypeScript
- **Blockchain**: Algorand SDK
- **Styling**: Tailwind CSS
- **Wallet Integration**: Pera Wallet Connect
- **QR Code**: html5-qrcode for scanning, qrcode.react for generation
- **Build Tool**: Vite
- **State Management**: React Context API
- **Routing**: React Router v6
- **Notifications**: React Hot Toast

### Architecture

The application follows a modular architecture with:

- Context-based wallet management
- Component-based UI design
- Smart contract integration for blockchain operations
- Real-time product tracking and verification
- QR code-based product authentication

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- An Algorand wallet (Pera Wallet recommended)
- TestNet Algos for testing (get from [Algorand TestNet Dispenser](https://bank.testnet.algorand.network/))

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd supply-chain-track
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Algorand Integration

The project uses Algorand's TestNet for all blockchain operations. Key integrations:

1. **Wallet Connection**:
   - Connect using Pera Wallet
   - View wallet balance and address
   - Sign transactions for product operations

2. **Smart Contract Operations**:
   - Product registration
   - Ownership transfer
   - Location updates
   - Authentication verification

## Key Features and Achievements

### 1. Smart Contract Implementation

- **Product Registration**: Create unique product identifiers on the blockchain
- **Ownership Management**: Transfer and track product ownership
- **Location Tracking**: Record and verify product movement
- **Authentication System**: Verify product authenticity

### 2. User Interface

- **Dashboard**: Real-time overview of supply chain operations
- **Product Management**: Create, track, and transfer products
- **QR Code Integration**: Generate and scan product verification codes
- **Responsive Design**: Mobile-friendly interface

### 3. Security Features

- **Blockchain Verification**: Every product has a unique blockchain footprint
- **QR Code Authentication**: Quick and secure product verification
- **Wallet Integration**: Secure transaction signing
- **Role-Based Access**: Different interfaces for suppliers and customers

### 4. Supply Chain Features

- **Real-time Tracking**: Monitor product location and status
- **Temperature Monitoring**: Track storage conditions
- **Batch Management**: Handle product batches
- **History Tracking**: Complete product journey visualization

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React context providers
├── contracts/          # Algorand smart contract integration
├── pages/              # Main application pages
└── utils/             # Helper functions and utilities
```

## Technical Implementation Details

### Smart Contract Integration

The `SupplyChainContract.ts` file contains the core blockchain logic:

- Product creation with unique identifiers
- Ownership transfer mechanisms
- Location and status updates
- Authentication verification

### Wallet Integration

`WalletContext.tsx` manages:

- Wallet connection state
- Transaction signing
- Balance updates
- Authentication status

### Product Verification

The verification system includes:

- QR code generation for products
- Scanner implementation for verification
- Blockchain-based authenticity checks
- Complete product history retrieval

## Future Enhancements

1. **Multi-Wallet Support**: Integration with additional Algorand wallets
2. **Batch Operations**: Bulk product management
3. **Advanced Analytics**: Supply chain insights and reporting
4. **Mobile App**: Native mobile application development
5. **IoT Integration**: Real-time sensor data integration

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.