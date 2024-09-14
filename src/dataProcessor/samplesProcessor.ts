import { SamplesType } from "../dataLoader";

export type HeartRatesWithIndexesType = {
  index: number;
  heartRate: number;
}[][];

const HEART_RATE_SAMPLES = "2";

export const getHeartRateSamples = (
  samplesData: SamplesType,
  activityTypeForLap: string
): HeartRatesWithIndexesType => {
  const heartRateSamples = samplesData.filter(
    (sample) => sample["sample-type"] === HEART_RATE_SAMPLES
  );

  let heartRatesForLaps: string[][];
  heartRatesForLaps = heartRateSamples.map((sample) => sample.data.split(","));

  if (activityTypeForLap === "INDOOR_CYCLING") {
    heartRatesForLaps = pairHeartRatesArrays(heartRatesForLaps);
  }

  const heartRatesWithIndexes = heartRatesForLaps.map((heartRates) => {
    return heartRates.map((heartRate, index) => {
      // TODO: not sure if the heartRate === null should be filtered out - if yes it can be done here
      return {
        index: index,
        heartRate: Number(heartRate),
      };
    });
  });

  return heartRatesWithIndexes;
};

const pairHeartRatesArrays = (heartRatesForLaps: string[][]) => {
  if (heartRatesForLaps.length % 2 !== 0) {
    // TODO - logger.error(...)
    throw new Error("Sample heart rates data missing as they should be even.");
  }
  const pairedArrays: string[][] = [];

  // Group the arrays in pairs
  for (let i = 0; i < heartRatesForLaps.length; i += 2) {
    pairedArrays.push([...heartRatesForLaps[i], ...heartRatesForLaps[i + 1]]);
  }

  return pairedArrays;
};
