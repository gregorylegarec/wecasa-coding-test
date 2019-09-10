import React from "react";
import { AnyAction, Dispatch } from "redux";
import { connect } from "react-redux";

import Prestations from "./components/Prestations";
import Address from "./components/Address";
import Appointment from "./components/Appointment";
import Confirmation from "./components/Confirmation";

import { Booking } from "./lib/wecasa/types";
import WecasaClient from "./lib/wecasa/client";
import { withWecasaClient } from "./lib/wecasa/hoc/withWecasaClient";
import { AppState } from "./redux/reducer";
import { getBooking, isSavingBooking } from "./redux/selectors";
import {
  updateBooking,
  resetBooking,
  saveBooking
} from "./redux/ducks/booking";

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
  booking: Booking;
  isSaving: boolean;
  client: WecasaClient;
  onBookingUpdate: (attributes: Object) => void;
  onBookingReady: () => void;
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
    this.saveBooking();
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

  saveBooking() {
    const { onBookingReady } = this.props;
    onBookingReady();
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
    const { isSaving } = this.props;
    return (
      <div className="App">
        <header>
          <h1>Votre commande</h1>
        </header>
        {isSaving ? <p>Sauvegarde ...</p> : this.renderCurrentPage()}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  booking: getBooking(state),
  isSaving: isSavingBooking(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
  ownProps: Props
) => ({
  onBookingUpdate: (attributes: Object) =>
    dispatch<any>(updateBooking(attributes)),
  onBookingReady: () => dispatch<any>(saveBooking(ownProps.client)),
  onBookingReset: () => dispatch<any>(resetBooking())
});

export default withWecasaClient(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
