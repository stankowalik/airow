import { getLapsData, LapsType } from "../../dataLoader";

const validLapsData: LapsType = [
  {
    startTimeInSeconds: 1000,
    airTemperatureCelsius: 25,
    heartRate: 120,
    totalDistanceInMeters: 5000,
    timerDurationInSeconds: 1800,
  },
  {
    startTimeInSeconds: 2000,
    airTemperatureCelsius: 28,
    heartRate: 130,
    totalDistanceInMeters: 10000,
    timerDurationInSeconds: 3600,
  },
];

describe("getLapsData", () => {
  it("should validate and return valid laps data", () => {
    //Act
    const result = getLapsData(validLapsData);

    //Assert
    expect(result).toEqual(validLapsData);
  });

  it("should throw an error for invalid laps data (wrong type)", () => {
    //Arrange
    const invalidLapsData = [
      {
        startTimeInSeconds: "1000", // Invalid type, should be a number
        airTemperatureCelsius: 25,
        heartRate: 120,
        totalDistanceInMeters: 5000,
        timerDurationInSeconds: 1800,
      },
    ];

    //Act & Assert
    expect(() => getLapsData(invalidLapsData as unknown as LapsType)).toThrow(
      "Validation of lapsData failed"
    );
  });

  it("should throw an error for invalid laps data (missing field)", () => {
    //Arrange
    const invalidLapsData = [
      {
        startTimeInSeconds: 1000,
        airTemperatureCelsius: 25,
        heartRate: 120,
        // Missing totalDistanceInMeters
        timerDurationInSeconds: 1800,
      },
    ];

    //Act & Assert
    expect(() => getLapsData(invalidLapsData as unknown as LapsType)).toThrow(
      "Validation of lapsData failed"
    );
  });

  it("should validate empty laps data", () => {
    //Arrange
    const emptyLapsData: LapsType = [];

    //Act
    const result = getLapsData(emptyLapsData);

    // Assert
    expect(result).toEqual([]);
  });
});
