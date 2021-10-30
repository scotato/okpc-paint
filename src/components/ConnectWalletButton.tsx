import { useWallet } from "@gimmixorg/use-wallet";
import { ENSName } from "react-ens-name";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "INFURA_ID", // FILL THIS IN TO ENABLE WALLET CONNECT!
    },
  },
};

export const ConnectWalletButton = () => {
  const { connect, account } = useWallet();
  if (account) return <ENSName address={account} />;
  else
    return (
      <button onClick={() => connect({ providerOptions })}>
        Connect Wallet
      </button>
    );
};
