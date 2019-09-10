import React from "react";
import { AnyAction, Dispatch } from "redux";
import { connect } from "react-redux";

import Prestations from "./components/Prestations";

import { updateBooking } from "./redux/ducks/booking";

const STEP_PRESTATIONS = "STEP_PRESTATIONS";
const STEP_ADDRESS = "STEP_ADDRESS";
const STEP_APPOINTMENT = "STEP_APPOINTMENT";
const STEP_CONFIRMATION = "STEP_CONFIRMATION";

const STEPS = [
  STEP_PRESTATIONS,
  STEP_ADDRESS,
  STEP_APPOINTMENT,
  STEP_CONFIRMATION
];

interface Props {
  onPrestationsSubmitted: (prestations: Array<string>) => void;
}

interface State {
  stepIndex: number;
}

export class App extends React.Component<Props, State> {
  state = {
    stepIndex: 0
  };

  constructor(props: Props) {
    super(props);
    this.handleSubmitPrestations = this.handleSubmitPrestations.bind(this);
  }

  handleSubmitPrestations(prestations: Array<string>) {
    const { onPrestationsSubmitted } = this.props;
    onPrestationsSubmitted(prestations);
    this.nextStep();
  }

  nextStep() {
    const { stepIndex } = this.state;
    const nextIndex = stepIndex < STEPS.length - 1 ? stepIndex + 1 : 0;
    this.setState({ stepIndex: nextIndex });
  }

  renderCurrentPage() {
    const { stepIndex } = this.state;
    switch (STEPS[stepIndex]) {
      case STEP_PRESTATIONS:
        return <Prestations onSubmit={this.handleSubmitPrestations} />;
      default:
        return <p>Étape incohérente</p>;
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Votre commande</h1>
        </header>
        {this.renderCurrentPage()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  onPrestationsSubmitted: (prestations: Array<string>) =>
    dispatch<any>(updateBooking({ prestations }))
});

export default connect(
  null,
  mapDispatchToProps
)(App);
