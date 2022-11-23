export interface IBuyOrder {
  id: string;
  name: string;
  createdAt: Date;
  datasetIds: number[];
  countries: string[];
  budget: number;
}

type Partial<T> = {
  [P in keyof T]: T[P] | null;
};

export type IBuyOrderPartial = Partial<IBuyOrder>;
