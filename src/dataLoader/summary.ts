import { z } from "zod";

export type ActivityTypeForLap = "INDOOR_CYCLING" | "OUTDOOR_CYCLING"; // OUTDOOR_CYCLING added just to show different behavior in case of heart rates sample

const summarySchema = z.object({
  userId: z.string(),
  activityId: z.number(),
  activityName: z.string(),
  durationInSeconds: z.number(),
  startTimeInSeconds: z.number(),
  startTimeOffsetInSeconds: z.number(),
  activityType: z
    .string()
    .transform((value) => value.toUpperCase())
    .refine((value) => ["INDOOR_CYCLING", "OUTDOOR_CYCLING"].includes(value), {
      message: "Invalid activity type",
    }),
  averageHeartRateInBeatsPerMinute: z.number(),
  activeKilocalories: z.number(),
  deviceName: z.string(),
  maxHeartRateInBeatsPerMinute: z.number(),
});

export type SummaryType = z.infer<typeof summarySchema>;

const validateIncomingData = (jsonData: unknown): SummaryType => {
  const result = summarySchema.safeParse(jsonData);

  if (!result.success) {
    throw new Error(`Validation of summaryData failed: ${result.error}`);
  }

  return result.data;
};

// TODO - clarify if can return [] or should throw Error
export const getSummaryData = (summaryData: SummaryType) =>
  validateIncomingData(summaryData);
