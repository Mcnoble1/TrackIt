# TrackIt

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

## Setup

### Initial setup
1. Clone this repository to your local machine.
2. Ensure [Docker](https://www.docker.com/) is installed and operational. Then, install `AlgoKit` following this [guide](https://github.com/algorandfoundation/algokit-cli#install).
3. Run `algokit project bootstrap all` in the project directory. This command sets up your environment by installing necessary dependencies, setting up a Python virtual environment, and preparing your `.env` file.
4. In the case of a smart contract project, execute `algokit generate env-file -a target_network localnet` from the `TrackIt-contracts` directory to create a `.env.localnet` file with default configuration for `localnet`.
5. To build your project, execute `algokit project run build`. This compiles your project and prepares it for running.
6. For project-specific instructions, refer to the READMEs of the child projects:
   - Smart Contracts: [TrackIt-contracts](projects/TrackIt-contracts/README.md)
   - Frontend Application: [TrackIt-frontend](projects/TrackIt-frontend/README.md)

> This project is structured as a monorepo, refer to the [documentation](https://github.com/algorandfoundation/algokit-cli/blob/main/docs/features/project/run.md) to learn more about custom command orchestration via `algokit project run`.

### Subsequently

1. If you update to the latest source code and there are new dependencies, you will need to run `algokit project bootstrap all` again.
2. Follow step 3 above.

### Continuous Integration / Continuous Deployment (CI/CD)

This project uses [GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) to define CI/CD workflows, which are located in the [`.github/workflows`](./.github/workflows) folder. You can configure these actions to suit your project's needs, including CI checks, audits, linting, type checking, testing, and deployments to TestNet.

For pushes to `main` branch, after the above checks pass, the following deployment actions are performed:
  - The smart contract(s) are deployed to TestNet using [AlgoNode](https://algonode.io).
  - The frontend application is deployed to a provider of your choice (Netlify, Vercel, etc.). See [frontend README](frontend/README.md) for more information.

> Please note deployment of smart contracts is done via `algokit deploy` command which can be invoked both via CI as seen on this project, or locally. For more information on how to use `algokit deploy` please see [AlgoKit documentation](https://github.com/algorandfoundation/algokit-cli/blob/main/docs/features/deploy.md).

## Tools

This project makes use of Python and React to build Algorand smart contracts and to provide a base project configuration to develop frontends for your Algorand dApps and interactions with smart contracts. The following tools are in use:

- Algorand, AlgoKit, and AlgoKit Utils
- Python dependencies including Poetry, Black, Ruff or Flake8, mypy, pytest, and pip-audit
- React and related dependencies including AlgoKit Utils, Tailwind CSS, daisyUI, use-wallet, npm, jest, playwright, Prettier, ESLint, and Github Actions workflows for build validation


## Integrating with smart contracts and application clients

Refer to the [TrackIt-contracts](projects/TrackIt-contracts/README.md) folder for overview of working with smart contracts, [projects/TrackIt-frontend](projects/TrackIt-frontend/README.md) for overview of the React project and the [projects/TrackIt-frontend/contracts](projects/TrackIt-frontend/src/contracts/README.md) folder for README on adding new smart contracts from backend as application clients on your frontend. The templates provided in these folders will help you get started.
When you compile and generate smart contract artifacts, your frontend component will automatically generate typescript application clients from smart contract artifacts and move them to `frontend/src/contracts` folder, see [`generate:app-clients` in package.json](projects/TrackIt-frontend/package.json). Afterwards, you are free to import and use them in your frontend application.

The frontend starter also provides an example of interactions with your TrackItClient in [`AppCalls.tsx`](projects/TrackIt-frontend/src/components/AppCalls.tsx) component by default.

