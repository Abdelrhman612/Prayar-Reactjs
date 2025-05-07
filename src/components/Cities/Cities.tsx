import type { CitiesProps } from "./interFace";

const Cities = ({ cities, setCity, city }: CitiesProps) => {
  const handleCityChange = (selectedCity: string) => {
    setCity(selectedCity);
  };

  return (
    <div className="city">
      <h3>المدينه</h3>
      <select value={city} onChange={(e) => handleCityChange(e.target.value)}>
        {cities.map((city) => (
          <option key={city.id} value={city.value}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Cities;
