import React from "react";

interface Props {
  onSubmit: (address: string) => void;
}

const defaultAddress = "46 Rue René Clair, 75018 Paris";

export const Address = React.memo((props: Props) => (
  <div>
    <h2>Votre addresse</h2>
    <p>L'adresse utilisée sera : {defaultAddress}</p>
    <button onClick={() => props.onSubmit(defaultAddress)}>Suivant</button>
  </div>
));

export default Address;
