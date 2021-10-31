import { useWallet } from "@gimmixorg/use-wallet";
import { ENSName } from "react-ens-name";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { Button } from "./Button";

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
      <Button onClick={() => connect({ providerOptions })}>connect</Button>
    );
};
