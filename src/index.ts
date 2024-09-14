import { getLapsData, getSamplesData, getSummaryData } from "./dataLoader";
import lapsData from "./inputData/lapsData.json";
import samplesData from "./inputData/samplesData.json";
import summaryData from "./inputData/summaryData.json";
import { processTrainingData } from "./dataProcessor";

export const main = () => {
  const laps = getLapsData(lapsData);
  const samples = getSamplesData(samplesData);
  const summary = getSummaryData(summaryData);

  return processTrainingData(laps, samples, summary);
};

main();
