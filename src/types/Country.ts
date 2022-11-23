export interface ICountry {
  countryCode: string;
  name: string;
  storedData: {
    datasetId: number;
    recordCount: number;
  }[];
}
