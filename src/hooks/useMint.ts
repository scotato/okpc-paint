import { useMemo, useState } from 'react';
import { TINY83__factory } from '../tiny83-sdk';
import { useWallet } from '@gimmixorg/use-wallet';
import { BigNumberish, utils, ContractTransaction } from 'ethers';

export enum TxStatus {
  PENDING,
  COMPLETED,
  FAILED
}

export const useMint = () => {
  const { provider } = useWallet();
  const encode256 = (val: string) => utils.defaultAbiCoder.encode(['uint256'], [val])
  
  const contract = useMemo(
    () =>
      provider
        ? TINY83__factory.connect(
            '0x7deb38a22694608a58b28970320d39ee50e7bc0f',
            provider.getSigner()
          )
        : null,
    [provider]
  );

  const [state, setState] =
    useState<{ status: TxStatus; hash?: string; error?: string }>();

  const send = async (leftPart: BigNumberish, rightPart: BigNumberish) => {
    if (!provider) throw new Error('No provider');
    if (!contract) throw new Error('Contract not initialized');
    let tx: ContractTransaction;
    try {
      tx = await contract.mint(leftPart, rightPart, {
        value: utils.parseEther('0.04')
      });
      setState({ status: TxStatus.PENDING, hash: tx.hash });
      await tx.wait();
      setState({ status: TxStatus.COMPLETED, hash: tx.hash });
    } catch (error) {
      setState({ status: TxStatus.FAILED, error: error as string });
    }
  };

  return { send, state, encode256 };
};
