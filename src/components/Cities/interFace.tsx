interface City {
  id: number | string;
  value: string;
  name: string;
}

export interface CitiesProps {
  cities: City[];
  setCity: (city: string) => void;
  city: string;
}
