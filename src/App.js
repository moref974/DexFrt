// src/index.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddLiquidity from "./components/AddLiquidity";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pool from "./components/Pool";
import ViewLiquidity from "./utils/ViewLiquidity";
import { AppProvider } from "./context/AppContext";
import ReactDOM from "react-dom/client";
import "@rainbow-me/rainbowkit/styles.css";
import NavBar from "./components/NavBar";
import Swap from "./components/Swap";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AddLiq from "./utils/AddLiq";
const config = getDefaultConfig({
  appName: "My RainbowKit App",
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  projectId: "2333a20f32e87ba58104eabb94939831",
  ssr: true,
});

const queryClient = new QueryClient();

function MyApp() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<Swap />} />
              <Route path="/ViewLiquidity" element={<ViewLiquidity />}/>
              <Route path="/addliquidity" element={<AddLiquidity />} />
              <Route path="/AddLiq" element={<AddLiq />}></Route>
              <Route path="/Pool" element={<Pool/>}></Route>
              <Route path="/swap" element={<Swap/>}></Route>
            </Routes>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              pauseOnHover
              theme="dark"
            />
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <MyApp />
  </AppProvider>
);
export default MyApp;
