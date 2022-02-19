import { useEthers, useEtherBalance } from "@usedapp/core";
import { Button } from "react-bootstrap";

export default function ConnectMM() {
    const { activateBrowserWallet, account } = useEthers();
    const etherBalance = useEtherBalance(account);

    function handleConnectWallet() {
        activateBrowserWallet();
      }

    return account ? (
        <p className='m-4'>
            {etherBalance && etherBalance} ETH
        </p>
    ) : (
        <Button className='m-4 bg-dark border border-dark' onClick={activateBrowserWallet}>Connect to a wallet</Button>
    );
}