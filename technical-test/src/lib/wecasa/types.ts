export interface Prestation {
  reference: string;
  title: string;
  duration: number;
  price: number;
}

export interface PrestationCategory {
  reference?: string;
  title?: string;
  prestations: Array<Prestation>;
}

export interface Universe {
  reference?: string;
  title?: string;
  categories: Array<PrestationCategory>;
}

export interface Booking {
  prestations: Array<string>;
  appointment?: Date;
  address?: string;
}
