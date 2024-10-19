import { useState } from "react";

import { useWallet } from "@meshsdk/react";

import { getProvider } from "~/components/cardano/mesh-wallet";
import LiveCodeDemo from "~/components/sections/live-code-demo";
import TwoColumnsScroll from "~/components/sections/two-columns-scroll";
import { getContract } from "./common";

export default function OwnershipSendRefScriptOnchain() {
  return (
    <TwoColumnsScroll
      sidebarTo="sendRefScriptOnchain"
      title="Send Ref Script Onchain"
      leftSection={Left()}
      rightSection={Right()}
    />
  );
}

function Left() {
  return (
    <>
      <p></p>
    </>
  );
}

function Right() {
  const { wallet, connected } = useWallet();
  const [userInput, setUserInput] = useState<string>("10000000");

  async function runDemo() {
    const contract = getContract(wallet);
    // "OracleNFT" | "OracleValidator" | "ContentRegistry" | "ContentRefToken" | "OwnershipRegistry" | "OwnershipRefToken"
    const tx = await contract.sendRefScriptOnchain("OracleValidator");
    const signedTx = await wallet.signTx(tx);
    console.log("signedTx", signedTx);
    // const txHash = await wallet.submitTx(signedTx);
    const blockchainProvider = getProvider();
    const txHash = await blockchainProvider.submitTx(signedTx);
    return txHash;
  }

  let code = ``;
  code += `const tx = await contract.mintOneTimeMintingPolicy();\n`;
  code += `const signedTx = await wallet.signTx(tx);\n`;
  code += `const txHash = await wallet.submitTx(signedTx);\n`;

  return (
    <LiveCodeDemo
      title="Send Ref Script Onchain"
      subtitle=""
      runCodeFunction={runDemo}
      code={code}
      disabled={!connected}
      runDemoButtonTooltip={
        !connected ? "Connect wallet to run this demo" : undefined
      }
      runDemoShowBrowseWalletConnect={true}
    ></LiveCodeDemo>
  );
}
