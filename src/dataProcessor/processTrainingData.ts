import { LapsType, SamplesType, SummaryType } from "../dataLoader";
import { ProcessedLapsDataType, processLapsData } from "./lapsProcessor";
import { getHeartRateSamples } from "./samplesProcessor";

export type ProcessedDataType = {
  activityOverview: {
    userId: string;
    activityType: string;
    deviceName: string;
    maxHeartRateInBeatsPerMinute: number;
    durationInSeconds: number;
  };
  lapsData: ProcessedLapsDataType;
};

export const processTrainingData = (
  lapsData: LapsType,
  samplesData: SamplesType,
  summaryData: SummaryType
): ProcessedDataType => {
  const heartRatesSamples = getHeartRateSamples(
    samplesData,
    summaryData.activityType
  );

  if (heartRatesSamples.length !== lapsData.length) {
    // TODO - introduce logger
    //logger.error(
    //   `Heart rates samples does not match the number of laps. Heart rates: ${heartRatesSamples}, lapsData: ${lapsData} `
    // );
    throw new Error("Heart rates samples does not match the number of laps");
  }
  const processedLapsData = processLapsData(lapsData, heartRatesSamples);

  return {
    activityOverview: {
      userId: summaryData.userId,
      activityType: summaryData.activityType,
      deviceName: summaryData.deviceName,
      maxHeartRateInBeatsPerMinute: summaryData.maxHeartRateInBeatsPerMinute,
      durationInSeconds: summaryData.durationInSeconds,
    },
    lapsData: processedLapsData,
  };
};
