import React from "react";
import { connect } from "react-redux";

import { Prestation } from "../../lib/wecasa/types";
import { getNumPrestations } from "../../redux/selectors";
import { AppState } from "../../redux/reducer";

interface OwnProps {
  prestation: Prestation;
}

interface ReduxStateProps {
  // Number of prestations with same reference already picked up
  numPrestations: number;
}

type Props = ReduxStateProps & OwnProps;

export class PrestationControl extends React.Component<Props> {
  render() {
    const { prestation, numPrestations = 0 } = this.props;
    const { title } = prestation;
    return (
      <li>
        {title} ({numPrestations})
      </li>
    );
  }
}

const mapStateToProps = (
  state: AppState,
  ownProps: OwnProps
): ReduxStateProps => ({
  numPrestations: getNumPrestations(state, ownProps.prestation.reference)
});

export default connect<ReduxStateProps, null, OwnProps, AppState>(
  mapStateToProps
)(PrestationControl);
