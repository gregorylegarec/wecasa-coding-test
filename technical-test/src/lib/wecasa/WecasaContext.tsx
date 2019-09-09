import React from "react";

import WecasaClient from "./client";

interface WecasaContextTypes {
  client: WecasaClient | null;
}

const emptyContext: WecasaContextTypes = { client: null };

export const WecasaContext = React.createContext(emptyContext);

export default WecasaContext;
