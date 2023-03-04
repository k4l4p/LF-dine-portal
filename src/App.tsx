import React, { useState } from "react"
import CreateNFT from "./components/CreateNFT";
import Header from "./components/Header"
import MintSuccess from "./components/MintSuccess"
import { ConnectPage } from "./components/WalletConnection";

function App() {
  const [count, setCount] = useState(0)
  return (
    <main className="font-dm-sans">
      <Header />
      {/* <ConnectPage /> */}
      {/* <CreateNFT /> */}
      <MintSuccess />
    </main>
  );
}

export default App;
