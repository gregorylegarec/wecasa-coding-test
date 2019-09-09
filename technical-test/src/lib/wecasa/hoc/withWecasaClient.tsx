import React from "react";

import { WecasaContext } from "../WecasaContext";

export function withWecasaClient(Component: React.ComponentType<any>) {
  const Wrapped = (props: any, context: any) => (
    <WecasaContext.Consumer>
      {context => <Component {...props} client={context.client} />}
    </WecasaContext.Consumer>
  );

  Wrapped.displayName = `withWecasaClient(${Component.displayName ||
    Component.name})`;

  return Wrapped;
}

export default withWecasaClient;
