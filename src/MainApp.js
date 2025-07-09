import BridgeAbi from "./MultiChainBridge.json";
import MultiChainAbi from "./MultiChainDex.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Swap from "./components/Swap";

function MainApp() {
  const [MultiChainDex, setMultiChainDex] = useState(null);
  const [MultiChainBridge, setMultiChainBridge] = useState(null);
  const [contractsReady, setContractsReady] = useState(false);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const initiateContracts = async () => {
      try {
        if (!window.ethereum) {
          alert("Please install Wallet");
          return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const _signer = provider.getSigner();
        setSigner(_signer);



        const dexContract = new ethers.Contract(
          MultiChainDexAddress,
          MultiChainAbi.abi,
          _signer
        );
        const bridgeContract = new ethers.Contract(
          MultiChainBridgeAddress,
          BridgeAbi.abi,
          _signer
        );

        setMultiChainDex(dexContract);
        setMultiChainBridge(bridgeContract);

        console.log("DexContract:", dexContract);
        console.log("BridgeContract:", bridgeContract);
      } catch (error) {
        alert("Something went wrong");
        console.error("Contract init error:", error);
      }
    };

    initiateContracts();
  }, []);

  useEffect(() => {
    if (MultiChainDex && MultiChainBridge && signer) {
      setContractsReady(true);
    }
  }, [MultiChainDex, MultiChainBridge, signer]);

  return (
    <div>
      {contractsReady ? (
        <Swap
          dexContract={MultiChainDex}
          signer={signer}
          bridgeContract={MultiChainBridge}
        />
      ) : (
        <div className="text-white text-center mt-10">
          🔄 Loading contracts...
        </div>
      )}
    </div>
  );
}

export default MainApp;
