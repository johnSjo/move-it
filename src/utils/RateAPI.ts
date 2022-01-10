import { RateResponse, ValidatedState } from '../store/Types';

export function createRateApiConfigString({
  routeDistance,
  floorSpace,
  secondarySpace,
  numberOfBulkyItems,
}: ValidatedState) {
  // TODO: question: the 'piano' option in the API is a boolean but it the UI sketch it looks like you should be able to
  // input several items -> which is correct?
  return [
    `distance=${routeDistance * 0.001}&`,
    `ordinaryVolume=${floorSpace}&`,
    `atticVolume=${secondarySpace}&`,
    `piano=${numberOfBulkyItems > 0 ? 'true' : 'false'}`,
  ].join('');
}

export async function fetchRate(config: string) {
  console.log(config);
  const result = await fetch(`https://moveitcaseapi.azurewebsites.net/api/Rate?${config}`);
  const data = await result.json();

  console.log(data);
  return data as RateResponse;
}
