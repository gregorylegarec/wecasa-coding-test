import React from "react";
import { AnyAction, Dispatch } from "redux";
import { connect } from "react-redux";

import Prestations from "./components/Prestations";
import Address from "./components/Address";
import Appointment from "./components/Appointment";
import Confirmation from "./components/Confirmation";

import { updateBooking, resetBooking } from "./redux/ducks/booking";

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
  onBookingUpdate: (attributes: Object) => void;
  onBookingReset: () => void;
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
    this.handleSubmitAddress = this.handleSubmitAddress.bind(this);
    this.handleSubmitAppointment = this.handleSubmitAppointment.bind(this);
    this.handleConfirmation = this.handleConfirmation.bind(this);
  }

  handleSubmitPrestations(prestations: Array<string>) {
    const { onBookingUpdate } = this.props;
    onBookingUpdate({ prestations });
    this.nextStep();
  }

  handleSubmitAddress(address: string) {
    const { onBookingUpdate } = this.props;
    onBookingUpdate({ address });
    this.nextStep();
  }

  handleSubmitAppointment(appointment: Date) {
    const { onBookingUpdate } = this.props;
    onBookingUpdate({ appointment });
    this.nextStep();
  }

  handleConfirmation() {
    const { onBookingReset } = this.props;
    onBookingReset();
    this.nextStep();
  }

  nextStep() {
    const { stepIndex } = this.state;
    const shouldReset = stepIndex >= STEPS.length - 1;
    const nextIndex = shouldReset ? 0 : stepIndex + 1;
    this.setState({ stepIndex: nextIndex });
  }

  renderCurrentPage() {
    const { stepIndex } = this.state;
    switch (STEPS[stepIndex]) {
      case STEP_PRESTATIONS:
        return <Prestations onSubmit={this.handleSubmitPrestations} />;
      case STEP_ADDRESS:
        return <Address onSubmit={this.handleSubmitAddress} />;
      case STEP_APPOINTMENT:
        return <Appointment onSubmit={this.handleSubmitAppointment} />;
      case STEP_CONFIRMATION:
        return <Confirmation onDone={this.handleConfirmation} />;
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
  onBookingUpdate: (attributes: Object) =>
    dispatch<any>(updateBooking(attributes)),
  onBookingReset: () => dispatch<any>(resetBooking())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
