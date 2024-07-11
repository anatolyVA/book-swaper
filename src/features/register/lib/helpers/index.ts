import { ICountry, IState } from "country-state-city";

export const getCountryCodeByName = (
  countries: ICountry[],
  name: string,
): string => {
  return countries.find((country) => country.name === name)?.isoCode || "";
};

export const getStateCodeByName = (states: IState[], name: string): string => {
  return states.find((state) => state.name === name)?.isoCode || "";
};
