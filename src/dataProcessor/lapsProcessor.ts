import { LapsType } from "../dataLoader";
import { HeartRatesWithIndexesType } from "./samplesProcessor";

export type ProcessedLapsDataType = {
  startTimeInSeconds: number;
  totalDistanceInMeters: number;
  timerDurationInSeconds: number;
  heartRateSamples: {
    index: number;
    heartRate: number;
  }[];
}[];

export const processLapsData = (
  lapsData: LapsType,
  heartRatesForLaps: HeartRatesWithIndexesType
): ProcessedLapsDataType =>
  lapsData.map((lap, index) => {
    return {
      startTimeInSeconds: lap.startTimeInSeconds,
      totalDistanceInMeters: lap.totalDistanceInMeters,
      timerDurationInSeconds: lap.timerDurationInSeconds,
      heartRateSamples: heartRatesForLaps[index],
    };
  });
