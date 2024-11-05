import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { PeraWalletConnect } from "@perawallet/connect";
import toast from 'react-hot-toast';

interface WalletContextType {
  address: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
  balance: number;
  isAuthenticated: boolean;
  signer: {
    signTransaction: (txGroups: any[][], signerAddress?: string) => Promise<Uint8Array[]>;
    signData: (data: any[], signer: string) => Promise<Uint8Array[]>;
  } | null;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  isConnecting: false,
  balance: 0,
  isAuthenticated: false,
  signer: null,
});

export const useWallet = () => useContext(WalletContext);

const peraWallet = new PeraWalletConnect({
  shouldShowSignTxnToast: true
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchBalance = useCallback(async (addr: string) => {
    try {
      const algodClient = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', '');
      const accountInfo = await algodClient.accountInformation(addr).do();
      setBalance(accountInfo.amount / 1000000); // Convert microAlgos to Algos
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  }, []);

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    try {
      const accounts = await peraWallet.connect();
      const connectedAddress = accounts[0];
      setAddress(connectedAddress);
      await fetchBalance(connectedAddress);
      setIsAuthenticated(true);
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  }, [fetchBalance]);

  const disconnectWallet = useCallback(() => {
    peraWallet.disconnect();
    setAddress(null);
    setBalance(0);
    setIsAuthenticated(false);
    toast.success('Wallet disconnected');
  }, []);

  const signer = address ? {
    signTransaction: (txGroups: any[][], signerAddress?: string) => 
      peraWallet.signTransaction(txGroups, signerAddress),
    signData: (data: any[], signer: string) => 
      peraWallet.signData(data, signer)
  } : null;

  useEffect(() => {
    // Reconnect session
    peraWallet.reconnectSession().then((accounts) => {
      if (accounts.length) {
        const connectedAddress = accounts[0];
        setAddress(connectedAddress);
        fetchBalance(connectedAddress);
        setIsAuthenticated(true);
      }
    });

    // Setup disconnect event listener
    peraWallet.connector?.on("disconnect", () => {
      setAddress(null);
      setBalance(0);
      setIsAuthenticated(false);
    });

    return () => {
      peraWallet.disconnect();
    };
  }, [fetchBalance]);

  return (
    <WalletContext.Provider value={{
      address,
      connectWallet,
      disconnectWallet,
      isConnecting,
      balance,
      isAuthenticated,
      signer
    }}>
      {children}
    </WalletContext.Provider>
  );
};