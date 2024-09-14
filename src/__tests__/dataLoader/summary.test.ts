import { getSummaryData, SummaryType } from "../../dataLoader";

const validSummaryData: SummaryType = {
  userId: "user123",
  activityId: 1,
  activityName: "Cycling",
  durationInSeconds: 3600,
  startTimeInSeconds: 1620000000,
  startTimeOffsetInSeconds: 0,
  activityType: "INDOOR_CYCLING",
  averageHeartRateInBeatsPerMinute: 130,
  activeKilocalories: 500,
  deviceName: "Garmin",
  maxHeartRateInBeatsPerMinute: 180,
};

describe("getSummaryData", () => {
  it("should validate and return valid summary data", () => {
    //Act
    const result = getSummaryData(validSummaryData);

    //Assert
    expect(result).toEqual(validSummaryData);
  });

  it("should throw an error for invalid activityType (unsupported type)", () => {
    //Arrange
    const invalidSummaryData = {
      ...validSummaryData,
      activityType: "RUNNING", // Invalid activity type, should be either "INDOOR_CYCLING" or "OUTDOOR_CYCLING"
    };

    //Act & Assert
    expect(() =>
      getSummaryData(invalidSummaryData as unknown as SummaryType)
    ).toThrow("Validation of summaryData failed");
  });

  it("should handle case-insensitive activityType", () => {
    //Arrange
    const summaryDataWithLowerCaseActivityType = {
      ...validSummaryData,
      activityType: "indoor_cycling", // Lowercase activityType
    };

    //Act
    const result = getSummaryData(summaryDataWithLowerCaseActivityType);

    //Assert
    expect(result.activityType).toBe("INDOOR_CYCLING");
  });

  it("should throw an error for invalid summary data (wrong type for userId)", () => {
    //Arrange
    const invalidSummaryData = {
      ...validSummaryData,
      userId: 123, // Invalid type, should be a string
    };

    //Act & Assert
    expect(() =>
      getSummaryData(invalidSummaryData as unknown as SummaryType)
    ).toThrow("Validation of summaryData failed");
  });

  it("should throw an error for invalid summary data (missing required field)", () => {
    //Arrange
    const invalidSummaryData = {
      ...validSummaryData,
      // Missing required field 'activityName'
      activityName: undefined,
    };

    //Act & Assert
    expect(() =>
      getSummaryData(invalidSummaryData as unknown as SummaryType)
    ).toThrow("Validation of summaryData failed");
  });

  it("should throw an error for invalid maxHeartRateInBeatsPerMinute type", () => {
    //Arrange
    const invalidSummaryData = {
      ...validSummaryData,
      maxHeartRateInBeatsPerMinute: "180", // Invalid type, should be a number
    };

    //Act & Assert
    expect(() =>
      getSummaryData(invalidSummaryData as unknown as SummaryType)
    ).toThrow("Validation of summaryData failed");
  });
});
