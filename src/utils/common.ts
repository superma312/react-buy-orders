import { IBuyOrderPartial } from "../store/reducers/buy-order";

export const validateBuyOrderForm = (data: IBuyOrderPartial) => {
  if (!data.name || !data.budget || data.countries?.length === 0 || data.datasetIds?.length === 0) {
    return false;
  }

  return true;
};