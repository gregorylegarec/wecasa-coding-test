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
  getPrestationsTotalPrice
} from "../../redux/selectors";

interface Props {
  client: WecasaClient;
  onMount: Function;
  isFetchingHaircutUniverse: boolean;
  haircutUniverse: Universe;
  totalPrice: number;
}

class Prestations extends React.Component<Props> {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const {
      isFetchingHaircutUniverse,
      haircutUniverse,
      totalPrice
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
