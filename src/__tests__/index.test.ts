import { main } from "..";

describe("main", () => {
  it("should call getLapsData, getSamplesData, and getSummaryData with correct arguments and return the result from processData", () => {
    //Arrange
    const expectedResult = {
      activityOverview: {
        userId: "1234567890",
        activityType: "INDOOR_CYCLING",
        deviceName: "instinct2",
        maxHeartRateInBeatsPerMinute: 190,
        durationInSeconds: 3667,
      },
      lapsData: [
        {
          startTimeInSeconds: 1661158927,
          totalDistanceInMeters: 15,
          timerDurationInSeconds: 600,
          heartRateSamples: [
            { index: 0, heartRate: 120 },
            { index: 1, heartRate: 126 },
            { index: 2, heartRate: 122 },
            { index: 3, heartRate: 140 },
            { index: 4, heartRate: 142 },
            { index: 5, heartRate: 155 },
            { index: 6, heartRate: 145 },
            { index: 7, heartRate: 141 },
            { index: 8, heartRate: 147 },
            { index: 9, heartRate: 155 },
            { index: 10, heartRate: 160 },
            { index: 11, heartRate: 180 },
            { index: 12, heartRate: 152 },
            { index: 13, heartRate: 120 },
          ],
        },
        {
          startTimeInSeconds: 1661158929,
          totalDistanceInMeters: 30,
          timerDurationInSeconds: 900,
          heartRateSamples: [
            { index: 0, heartRate: 143 },
            { index: 1, heartRate: 151 },
            { index: 2, heartRate: 164 },
            { index: 3, heartRate: NaN },
            { index: 4, heartRate: 173 },
            { index: 5, heartRate: 181 },
            { index: 6, heartRate: 180 },
            { index: 7, heartRate: 182 },
            { index: 8, heartRate: 170 },
            { index: 9, heartRate: 188 },
            { index: 10, heartRate: 181 },
            { index: 11, heartRate: 174 },
            { index: 12, heartRate: 172 },
            { index: 13, heartRate: 158 },
          ],
        },
      ],
    };

    //Act
    const result = main();

    //Assert
    expect(result).toEqual(expectedResult);
  });
});
