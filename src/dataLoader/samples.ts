import { z } from "zod";

const sampleSchema = z.object({
  "recording-rate": z.number(),
  "sample-type": z.string(),
  data: z.string(),
});

const samplesSchema = z.array(sampleSchema);

export type SamplesType = z.infer<typeof samplesSchema>;

const validateIncomingData = (jsonData: unknown): SamplesType => {
  const result = samplesSchema.safeParse(jsonData);

  if (!result.success) {
    throw new Error(`Validation of samplesData failed: ${result.error}`);
  }

  return result.data;
};

// TODO - clarify if can return [] or should throw Error
export const getSamplesData = (samplesData: SamplesType) =>
  validateIncomingData(samplesData);
