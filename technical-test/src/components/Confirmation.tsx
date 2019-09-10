import React from "react";

interface OwnProps {
  onDone: () => void;
}

export const Confirmation = React.memo((props: OwnProps) => (
  <div>
    <p>Votre commande est bien enregistrée : </p>
    <button onClick={props.onDone}>Nouvelle réservation</button>
  </div>
));

export default Confirmation;
