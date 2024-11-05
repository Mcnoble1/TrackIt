import * as algokit from '@algorandfoundation/algokit-utils'
import { TrackItClient } from './contracts/TrackIt'

export function create(
  algorand: algokit.AlgorandClient,
  tiClient: TrackItClient,
  product: bigint,
  productName: string,
  sender: string,
  quantity: bigint,
  setAppId: (id: number) => void
) {
  return async () => {
    let productId = product

    if (productId === 0n) {
      const assetCreate = await algorand.send.assetCreate({
        sender,
        total: quantity,
      })
      productId = BigInt(assetCreate.confirmation.assetIndex!)
    }

    const createResult = await tiClient.create.createApplication({ productId, productName })

    const mbrTxn = await algorand.transactions.payment({
      sender,
      receiver: createResult.appAddress,
      amount: algokit.algos(0.1 + 0.1),
      extraFee: algokit.algos(0.001),
    })

    await tiClient.optInToAsset({ mbrTxn })

    await algorand.send.assetTransfer({
      sender,
      receiver: createResult.appAddress,
      assetId: productId,
      amount: quantity,
    })

    setAppId(Number(createResult.appId))
  }
}

export function buy(
  algorand: algokit.AlgorandClient,
  tiClient: TrackItClient,
  sender: string,
  appAddress: string,
  unitaryPrice: bigint,
  quantity: bigint,
  setUnitsLeft: (units: bigint) => void
) {
  return async () => {

    const buyerTxn = await algorand.transactions.payment({
      sender,
      receiver: appAddress,
      amount: algokit.microAlgos(Number(unitaryPrice * quantity)),
      extraFee: algokit.algos(0.001),
    })

    await tiClient.mint({ buyerTxn, quantity })

    const state = await tiClient.getGlobalState()
    const info = await algorand.account.getAssetInformation(appAddress, state.productId!.asBigInt())
    setUnitsLeft(info.balance);
  }
}


export function deleteApp(
  algorand: algokit.AlgorandClient,
  tiClient: TrackItClient,
  setAppId: (id: number) => void
) {
  return async () => {
    await tiClient.delete.deleteApplication({}, {sendParams: {fee: algokit.algos(0.003)}})
    setAppId(0)
  }
}
