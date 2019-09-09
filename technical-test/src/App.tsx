import React from "react";

import Prestations from "./components/Prestations";

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <h1>Votre commande</h1>
      </header>
      <Prestations />
    </div>
  );
};

export default App;
