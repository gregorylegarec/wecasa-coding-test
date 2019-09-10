import React from "react";
import { AnyAction, Dispatch } from "redux";
import { connect } from "react-redux";

import Category from "./Category";

import { formatPrice } from "../../helpers/format";
import { WecasaClient } from "../../lib/wecasa/client";
import { withWecasaClient } from "../../lib/wecasa/hoc/withWecasaClient";
import { Universe } from "../../lib/wecasa/types";
import { AppState } from "../../redux/reducer";
import { fetchHaircutUniverse } from "../../redux/ducks/haircut";
import {
  isFetchingHaircutUniverse,
  getHaircutUniverse,
  getPrestations,
  getPrestationsTotalPrice
} from "../../redux/selectors";

interface Props {
  client: WecasaClient;
  onMount: Function;
  onSubmit: Function;
  isFetchingHaircutUniverse: boolean;
  haircutUniverse: Universe;
  prestations: Array<string>;
  totalPrice: number;
}

class Prestations extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.onMount();
  }

  handleSubmit() {
    const { onSubmit, prestations } = this.props;
    onSubmit(prestations);
  }

  render() {
    const {
      isFetchingHaircutUniverse,
      haircutUniverse,
      totalPrice,
      prestations
    }: Props = this.props;
    const hasCategories =
      haircutUniverse.categories && haircutUniverse.categories.length;
    if (isFetchingHaircutUniverse) {
      return <p>Chargement...</p>;
    } else if (hasCategories) {
      return (
        <>
          <h2>Sélectionnez les prestations</h2>
          {haircutUniverse.categories.map(category => (
            <Category key={category.reference} category={category} />
          ))}
          <p>Total: {formatPrice(totalPrice)}</p>
          <button disabled={!prestations.length} onClick={this.handleSubmit}>
            Suivant
          </button>
        </>
      );
    } else {
      return <p>Aucune catégorie.</p>;
    }
  }
}

const mapStateToProps = (state: AppState) => ({
  isFetchingHaircutUniverse: isFetchingHaircutUniverse(state),
  haircutUniverse: getHaircutUniverse(state),
  prestations: getPrestations(state),
  totalPrice: getPrestationsTotalPrice(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
  ownProps: Props
) => ({
  onMount: () => dispatch<any>(fetchHaircutUniverse(ownProps.client))
});

export default withWecasaClient(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Prestations)
);
