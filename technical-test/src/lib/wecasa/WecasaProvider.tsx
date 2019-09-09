import React from "react";

import { WecasaClient } from "./client";

import { WecasaContext } from "./WecasaContext";

interface Props {
  client: WecasaClient;
}

export default class WecasaProvider extends React.Component<Props> {
  constructor(props: Props, context: Object) {
    super(props, context);
    if (!props.client) {
      throw new Error("WecasaProvider was not passed a client instance.");
    }
  }

  render() {
    const { client, children } = this.props;
    if (!children) return null;
    return (
      <WecasaContext.Provider value={{ client }}>
        {this.props.children}
      </WecasaContext.Provider>
    );
  }
}
