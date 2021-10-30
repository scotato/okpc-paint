import { Contract } from '@ethersproject/contracts'
import { useContractFunction } from '@usedapp/core'
import { utils } from 'ethers'
// import { useScreen } from './useScreen'
import { abi, address } from '../contract'

// const price = 40000000000000000;
// const validNetworkId = 1;
// const initialSupply = 5555;

export const useMint = () => {
  // const { pixelsMatrix } = useScreen()
  const contractInterface = new utils.Interface(abi)
  const contract = new Contract(address, contractInterface)
  const { state, send } = useContractFunction(contract, 'deposit', { transactionName: 'Wrap' })

  return { send, state }
}
