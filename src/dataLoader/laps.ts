import { z } from "zod";

const lapSchema = z.object({
  startTimeInSeconds: z.number(),
  airTemperatureCelsius: z.number(),
  heartRate: z.number(),
  totalDistanceInMeters: z.number(),
  timerDurationInSeconds: z.number(),
});

const lapsSchema = z.array(lapSchema);

export type LapsType = z.infer<typeof lapsSchema>;

const validateIncomingData = (jsonData: unknown): LapsType => {
  const result = lapsSchema.safeParse(jsonData);

  if (!result.success) {
    throw new Error(`Validation of lapsData failed: ${result.error}`);
  }

  return result.data;
};

// TODO - clarify if can return [] or should throw Error
export const getLapsData = (lapsData: LapsType) =>
  validateIncomingData(lapsData);
