import React from "react";
import { AnyAction, Dispatch } from "redux";
import { connect } from "react-redux";

import { formatPrice } from "../../helpers/format";
import { Prestation } from "../../lib/wecasa/types";
import { getNumPrestations } from "../../redux/selectors";
import { AppState } from "../../redux/reducer";
import { addPrestation, removePrestation } from "../../redux/ducks/prestations";

interface OwnProps {
  prestation: Prestation;
}

interface ReduxStateProps {
  // Number of prestations with same reference already picked up
  numPrestations: number;
}

interface ReduxDispatchProps {
  onAddPrestation: (reference: Prestation["reference"]) => void;
  onRemovePrestation: (reference: Prestation["reference"]) => void;
}

type Props = ReduxStateProps & ReduxDispatchProps & OwnProps;

export class PrestationControl extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleAdd() {
    const { onAddPrestation, prestation } = this.props;
    onAddPrestation(prestation.reference);
  }

  handleRemove() {
    const { onRemovePrestation, prestation } = this.props;
    onRemovePrestation(prestation.reference);
  }

  render() {
    const { prestation, numPrestations = 0 } = this.props;
    const { price, title } = prestation;
    return (
      <li>
        {title} {formatPrice(price)} ({numPrestations}){" "}
        <button onClick={this.handleAdd}>+</button>{" "}
        <button onClick={this.handleRemove}>-</button>
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

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
  ownProps: OwnProps
): ReduxDispatchProps => ({
  onAddPrestation: (reference: Prestation["reference"]) =>
    dispatch<any>(addPrestation(reference)),
  onRemovePrestation: (reference: Prestation["reference"]) =>
    dispatch<any>(removePrestation(reference))
});

export default connect<ReduxStateProps, ReduxDispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(PrestationControl);
