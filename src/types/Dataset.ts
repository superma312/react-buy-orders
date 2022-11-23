export interface IDataset {
  id: number;
  name: string;
  label: string;
  description?: string;
  thumbnailUrl: string;
  costPerRecord: number;
}
