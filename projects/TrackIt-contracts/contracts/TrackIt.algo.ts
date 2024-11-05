/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable lines-between-class-members */
import { Contract } from '@algorandfoundation/tealscript';

export class TrackIt extends Contract {
  // The ID of the product/asset we are tracking
  productId = GlobalStateKey<AssetID>();
  productName = GlobalStateKey<string>();
  registeredProduct = GlobalStateKey<AssetID>();
  createApplication(productId: AssetID, productName: string): void {
    this.productId.value = productId;
    this.productName.value = productName;
  }

  // mint token for supplier/manufacturer
  mint(): AssetID {
    verifyTxn(this.txn, { sender: this.app.creator }); // only the creator can mint token for supplier/manufacturer or create a new product
    assert(!this.registeredProduct.exists, 'The product is already registered and callable only once');
    const registeredProduct = sendAssetCreation({
      configAssetTotal: 1_000,
      configAssetFreeze: this.app.address, // can't send the token to someone else
    });

    this.registeredProduct.value = registeredProduct;

    return registeredProduct;
  }

  //  create and add product to the supply chain
  createProduct(
    sender: string,
    productId: AssetID,
    name: string,
    origin: string,
    category: string,
    manufacturer: string,
    timestamp: uint64,
    expiryDate: uint64,
    batchNumber: string
  ): void {
    assert(this.txn.sender.assetBalance(this.registeredProduct.value) === 1, 'Get the product token first');

    sendPayment({
      sender: this.app.creator,
      receiver: this.app.creator,
      amount: 0,
      // note,
    });
  }

  getRegisteredProduct(): AssetID {
    return this.registeredProduct.value;
  }

  // register method for supplier/manufacturer that gives them the ASA and freezes it so that it can't be transferred to someone else
  register(registeredProduct: AssetID): void {
    assert(this.txn.sender.assetBalance(this.registeredProduct.value) === 0, 'The product is already registered');
    sendAssetTransfer({
      xferAsset: this.registeredProduct.value,
      assetAmount: 1,
      assetReceiver: this.txn.sender,
    });
    sendAssetFreeze({
      freezeAsset: this.registeredProduct.value,
      freezeAssetAccount: this.txn.sender,
      freezeAssetFrozen: true,
    });
  }

  // Setting the new product ID
  setProductId(productId: AssetID): void {
    assert(this.txn.sender === this.app.creator, 'Only the creator can set the product ID');
    this.productId.value = productId;
  }

  // Opt the contract address into the asset
  optInToAsset(mbrTxn: PayTxn): void {
    assert(this.txn.sender === this.app.creator, 'Only the creator can opt in to the asset');
    verifyPayTxn(mbrTxn, {
      receiver: this.app.address,
      amount: globals.minBalance + globals.assetOptInMinBalance,
    });

    sendAssetTransfer({
      xferAsset: this.productId.value,
      assetAmount: 0,
      assetReceiver: this.app.address,
    });
  }

  // Update the product location
  updateProductLocation(
    sender: string,
    productId: AssetID,
    location: string,
    timestamp: uint64,
  ): void {
    assert(this.productId.value.id !== 0, 'The product ID is not set');

    sendPayment({
      sender: this.app.creator,
      receiver: this.app.creator,
      amount: 0,
    });
  }

  // Transfer ownership of the product
  transferOwnership(sender: string, receiver: string): void {
    assert(this.productId.value.id !== 0, 'The product ID is not set');

    sendPayment({
      sender: this.app.creator,
      receiver: this.app.creator,
      amount: 0,
    });
  }

  // Get the product ID
  getProductId(): AssetID {
    return this.productId.value;
  }

  // Get the product location
  getProductLocation(productId: AssetID): AssetID {
    return this.productId.value;
  }

  // Get the product history
  getProductHistory(productId: AssetID): AssetID {
    return this.productId.value;
  }

  // Verify the product authenticity
  verifyProductAuthenticity(productId: AssetID): AssetID {
    return this.productId.value;
  }

  deleteApplication(): void {
    assert(this.txn.sender === this.app.creator, 'Only the creator can delete the application');
    sendAssetTransfer({
      xferAsset: this.productId.value,
      assetAmount: this.app.address.assetBalance(this.productId.value),
      assetReceiver: this.app.creator,
      assetCloseTo: this.app.creator,
    });

    sendPayment({
      receiver: this.app.creator,
      amount: this.app.address.balance,
      closeRemainderTo: this.app.creator,
    });
  }
}
