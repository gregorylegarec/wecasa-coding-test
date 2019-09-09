import React from "react";

import PrestationControl from "./PrestationControl";
import { PrestationCategory } from "../../lib/wecasa/types";

interface Props {
  category: PrestationCategory;
}

export const Category = React.memo((props: Props) => {
  const { category } = props;
  const { title, prestations } = category;
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {prestations.map(prestation => (
          <PrestationControl
            key={prestation.reference}
            prestation={prestation}
          />
        ))}
      </ul>
    </section>
  );
});

export default Category;
