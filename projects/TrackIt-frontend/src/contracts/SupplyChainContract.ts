import algosdk from 'algosdk';

export class SupplyChainContract {
  private algodClient: algosdk.Algodv2;
  private indexerClient: algosdk.Indexer;
  
  constructor(
    private network: string = 'TestNet',
    private token = '',
    private server = 'https://testnet-api.algonode.cloud',
    private port = 443
  ) {
    this.algodClient = new algosdk.Algodv2(token, server, port);
    this.indexerClient = new algosdk.Indexer(token, server, port);
  }

  async createProduct(
    sender: string,
    productId: string,
    name: string,
    origin: string,
    category: string,
    manufacturer: string,
    timestamp: number,
    expiryDate?: number,
    batchNumber?: string
  ) {
    try {
      const suggestedParams = await this.algodClient.getTransactionParams().do();
      
      const note = new TextEncoder().encode(JSON.stringify({
        type: 'PRODUCT_CREATION',
        productId,
        name,
        origin,
        category,
        manufacturer,
        timestamp,
        expiryDate,
        batchNumber
      }));

      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender,
        to: sender,
        amount: 0,
        note,
        suggestedParams
      });

      return txn;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product transaction');
    }
  }

  async updateProductLocation(
    sender: string,
    productId: string,
    location: string,
    timestamp: number,
    temperature?: number,
    humidity?: number,
    handler?: string
  ) {
    try {
      const suggestedParams = await this.algodClient.getTransactionParams().do();
      
      const note = new TextEncoder().encode(JSON.stringify({
        type: 'LOCATION_UPDATE',
        productId,
        location,
        timestamp,
        temperature,
        humidity,
        handler
      }));

      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender,
        to: sender,
        amount: 0,
        note,
        suggestedParams
      });

      return txn;
    } catch (error) {
      console.error('Error updating location:', error);
      throw new Error('Failed to create location update transaction');
    }
  }

  async transferOwnership(
    sender: string,
    receiver: string,
    productId: string,
    timestamp: number,
    transferType: 'SUPPLIER_TO_DISTRIBUTOR' | 'DISTRIBUTOR_TO_RETAILER' | 'RETAILER_TO_CUSTOMER',
    verificationCode?: string
  ) {
    try {
      const suggestedParams = await this.algodClient.getTransactionParams().do();
      
      const note = new TextEncoder().encode(JSON.stringify({
        type: 'OWNERSHIP_TRANSFER',
        productId,
        newOwner: receiver,
        timestamp,
        transferType,
        verificationCode
      }));

      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender,
        to: receiver,
        amount: 1000,
        note,
        suggestedParams
      });

      return txn;
    } catch (error) {
      console.error('Error transferring ownership:', error);
      throw new Error('Failed to create ownership transfer transaction');
    }
  }

  async verifyProduct(productId: string): Promise<{
    isAuthentic: boolean;
    details?: any;
    history?: any[];
  }> {
    try {
      const transactions = await this.getProductHistory(productId);
      
      if (!transactions?.transactions?.length) {
        return { isAuthentic: false };
      }

      // Find the creation transaction
      const creation = transactions.transactions.find((t: any) => {
        try {
          const noteStr = Buffer.from(t.note, 'base64').toString();
          const noteData = JSON.parse(noteStr);
          return noteData.type === 'PRODUCT_CREATION';
        } catch {
          return false;
        }
      });

      if (!creation) {
        return { isAuthentic: false };
      }

      const creationData = JSON.parse(Buffer.from(creation.note, 'base64').toString());

      return {
        isAuthentic: true,
        details: creationData,
        history: transactions.transactions.map((t: any) => ({
          ...t,
          note: Buffer.from(t.note, 'base64').toString()
        }))
      };
    } catch (error) {
      console.error('Error verifying product:', error);
      throw new Error('Failed to verify product');
    }
  }

  async getProductHistory(productId: string) {
    try {
      if (!productId) {
        throw new Error('Product ID is required');
      }

      const notePrefix = new TextEncoder().encode(JSON.stringify({ productId }));
      const transactions = await this.indexerClient
        .searchForTransactions()
        .notePrefix(notePrefix)
        .do();

      if (!transactions?.transactions) {
        return { transactions: [] };
      }

      return transactions;
    } catch (error) {
      console.error('Error fetching product history:', error);
      throw new Error('Failed to fetch product history');
    }
  }

  async reportQualityIssue(
    sender: string,
    productId: string,
    issueType: string,
    description: string,
    timestamp: number,
    evidence?: string
  ) {
    try {
      const suggestedParams = await this.algodClient.getTransactionParams().do();
      
      const note = new TextEncoder().encode(JSON.stringify({
        type: 'QUALITY_ISSUE',
        productId,
        issueType,
        description,
        timestamp,
        evidence
      }));

      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender,
        to: sender,
        amount: 0,
        note,
        suggestedParams
      });

      return txn;
    } catch (error) {
      console.error('Error reporting quality issue:', error);
      throw new Error('Failed to create quality issue report');
    }
  }

  async addSupplierCertification(
    sender: string,
    certificationId: string,
    certifierAddress: string,
    validUntil: number,
    certificationDetails: any
  ) {
    try {
      const suggestedParams = await this.algodClient.getTransactionParams().do();
      
      const note = new TextEncoder().encode(JSON.stringify({
        type: 'SUPPLIER_CERTIFICATION',
        certificationId,
        certifierAddress,
        validUntil,
        ...certificationDetails
      }));

      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender,
        to: certifierAddress,
        amount: 1000,
        note,
        suggestedParams
      });

      return txn;
    } catch (error) {
      console.error('Error adding supplier certification:', error);
      throw new Error('Failed to create supplier certification');
    }
  }
}