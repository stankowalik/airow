import {
  processLapsData,
  HeartRatesWithIndexesType,
} from "../../dataProcessor";
import { LapsType } from "../../dataLoader";

describe("processLapsData", () => {
  it("should process laps data and map heart rate samples correctly", () => {
    //Arrange
    const lapsData: LapsType = [
      {
        startTimeInSeconds: 1000,
        totalDistanceInMeters: 5000,
        timerDurationInSeconds: 3600,
        airTemperatureCelsius: 28,
        heartRate: 107,
      },
      {
        startTimeInSeconds: 2000,
        totalDistanceInMeters: 10000,
        timerDurationInSeconds: 7200,
        airTemperatureCelsius: 28,
        heartRate: 107,
      },
    ];

    const heartRatesForLaps: HeartRatesWithIndexesType = [
      [
        { index: 0, heartRate: 70 },
        { index: 1, heartRate: 75 },
      ],
      [
        { index: 0, heartRate: 80 },
        { index: 1, heartRate: 85 },
      ],
    ];

    const expected = [
      {
        startTimeInSeconds: 1000,
        totalDistanceInMeters: 5000,
        timerDurationInSeconds: 3600,
        heartRateSamples: [
          { index: 0, heartRate: 70 },
          { index: 1, heartRate: 75 },
        ],
      },
      {
        startTimeInSeconds: 2000,
        totalDistanceInMeters: 10000,
        timerDurationInSeconds: 7200,
        heartRateSamples: [
          { index: 0, heartRate: 80 },
          { index: 1, heartRate: 85 },
        ],
      },
    ];

    //Act
    const result = processLapsData(lapsData, heartRatesForLaps);

    // Assert
    expect(result).toEqual(expected);
  });

  it("should handle an empty lapsData array", () => {
    //Arrange
    const lapsData: LapsType = [];
    const heartRatesForLaps: HeartRatesWithIndexesType = [];

    //Act
    const result = processLapsData(lapsData, heartRatesForLaps);

    //Assert
    expect(result).toEqual([]);
  });

  it("should handle mismatched heart rate samples and laps data lengths", () => {
    //Arrange
    // Mock data with mismatched lengths
    const lapsData: LapsType = [
      {
        startTimeInSeconds: 1000,
        totalDistanceInMeters: 5000,
        timerDurationInSeconds: 3600,
        airTemperatureCelsius: 28,
        heartRate: 107,
      },
    ];

    const heartRatesForLaps: HeartRatesWithIndexesType = [
      [
        { index: 0, heartRate: 70 },
        { index: 1, heartRate: 75 },
      ],
      [
        { index: 0, heartRate: 80 },
        { index: 1, heartRate: 85 },
      ],
    ];

    const expected = [
      {
        startTimeInSeconds: 1000,
        totalDistanceInMeters: 5000,
        timerDurationInSeconds: 3600,
        heartRateSamples: [
          { index: 0, heartRate: 70 },
          { index: 1, heartRate: 75 },
        ],
      },
    ];

    //Act
    // In this case, only the first lap should be processed because there's only one lap in lapsData
    const result = processLapsData(lapsData, heartRatesForLaps);

    //Arrange
    expect(result).toEqual(expected);
  });
});
