import React, { useEffect, useState } from "react";
import TokenSelectorModal from "../utils/TokenSelector";
import { useAppContext } from "../context/AppContext";
import cryptoIcons from "../utils/cryptoIcons";
import FeeTier from "../utils/FeeTier";
import TokensBg from "../utils/TokensBg";
import SecondPage from "../utils/SecondPage";
function AddLiquidity() {
  const { token, setToken } = useAppContext();
  const [image, setImage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const { selectedTier, setSelectedTier } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [network, setNetwork] = useState("");
  const [showTier, setShowTier] = useState(false);

  useEffect(() => {
    if (token && token.symbol) {
      setImage(token.symbol);
    }
  }, [token]);
  return (
    <div
      className="relative flex flex-col min-h-screen w-full justify-start pt-36
         items-center bg-gradient-to-br from-black via-[#120019] to-black px-4 py-10 overflow-x-hidden "
    >
      <TokensBg />
      <div className="w-full max-w-md p-4  border border-pink-400/20 backdrop-blur-sm shadow-[0_0_10px_#d946ef66]">
        <h2 className="text-md text-blue-400 text-center font-semibold hover:animate-pulse">
          Create Position
        </h2>
        <div className="w-full p-2 space-x-1 items-center justify-between">
          <p className="text-sm text-white">
            Choose the tokens you want to provide liquidity for. You can select
            tokens on all supported networks.
          </p>
          <div className="flex justify-center">
            {token && (
              <img
                src={cryptoIcons[image]}
                alt={token.symbol}
                className="w-8 h-8 mt-1 rounded-full"
              />
            )}
            <button
              onClick={() => {
                setShowModal(true);
                setModalTitle("token");
              }}
              className="flex w-full mr-6 items-center p-1 rounded-xl justify-center px-2 bg-transparent text-blue-400"
            >
              {" "}
              {token ? token.symbol : "Select (token)"}
            </button>
          </div>
          {selectedTier && (
            <div className="mt-2 text-sm text-green-400 text-center">
              Selected Fee Tier: {selectedTier}%
            </div>
          )}
          {token && (
            <button
              onClick={() => setShowTier((prev) => !prev)}
              className="mt-4 w-full p-2 rounded-lg bg-transparent text-white boredr border-pink-400/20 hover:bg-pink-400/20"
            >
              {showTier ? "Hide Hide Tier" : "Selecet Fee Tier"}
            </button>
          )}
          {selectedTier && (
            <div className="justify-center mt-4">
              <p className="text-xs text-center text-blue-400">
                Click on next to continue...
              </p>
              <div className="mt-1">
                <SecondPage />
              </div>
            </div>
          )}
          {
            <TokenSelectorModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title={modalTitle}
              onSelect={(token) => {
                if (modalTitle === "token") {
                  setToken(token);
                }
              }}
              setNetwork={setNetwork}
              network={network}
            />
          }
          {showTier && (
            <FeeTier
              isOpen={showTier}
              onSelect={(tier) => (setSelectedTier(tier), setShowTier(false))}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default AddLiquidity;
