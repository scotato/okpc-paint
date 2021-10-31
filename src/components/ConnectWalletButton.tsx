import { useWallet } from "@gimmixorg/use-wallet";
import { ENSName } from "react-ens-name";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { Button } from "./Button";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "1a9ea31c95f044869eb21e3ef97acb14",
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
