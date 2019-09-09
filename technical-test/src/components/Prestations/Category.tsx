import React from "react";

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
          <li>{prestation.title}</li>
        ))}
      </ul>
    </section>
  );
});

export default Category;
