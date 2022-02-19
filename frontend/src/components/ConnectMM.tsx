import { useEthers, useEtherBalance } from "@usedapp/core";
import { Button } from "react-bootstrap";

export default function ConnectMM() {
    const { activateBrowserWallet, account } = useEthers();

    function handleConnectWallet() {
        activateBrowserWallet();
      }

    return account ? (
        <h1> {account} </h1>
    ) : (
        <Button className='m-4 bg-dark border border-dark' onClick={activateBrowserWallet}>Connect to a wallet</Button>
    );
}