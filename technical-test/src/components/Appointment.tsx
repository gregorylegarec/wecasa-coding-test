import React from "react";

interface Props {
  onSubmit: (appointment: Date) => void;
}

const defaultAppointment = new Date("2019-10-12T14:30:00+02:00");

export const Appointment = React.memo((props: Props) => (
  <div>
    <h2>Votre rendez-vous</h2>
    <p>Le rendez-vous utilisé sera : {defaultAppointment.toISOString()}</p>
    <button onClick={() => props.onSubmit(defaultAppointment)}>Suivant</button>
  </div>
));

export default Appointment;
