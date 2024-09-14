import {
  getHeartRateSamples,
  HeartRatesWithIndexesType,
} from "../../dataProcessor";
import { SamplesType } from "../../dataLoader";

const testSamplesData: SamplesType = [
  {
    "recording-rate": 5,
    "sample-type": "1",
    data: "100,110,120",
  },
  {
    "recording-rate": 5,
    "sample-type": "2",
    data: "100,110",
  },
  {
    "recording-rate": 5,
    "sample-type": "2",
    data: "90,95",
  },
  {
    "recording-rate": 5,
    "sample-type": "1",
    data: "100,110,120",
  },
  {
    "recording-rate": 5,
    "sample-type": "2",
    data: "80,85",
  },
  {
    "recording-rate": 5,
    "sample-type": "2",
    data: "75,65",
  },
];

describe("getHeartRateSamples", () => {
  it("should filter heart rate samples and return heart rates with indexes for non-cycling activity", () => {
    //Act
    const result: HeartRatesWithIndexesType = getHeartRateSamples(
      testSamplesData,
      "OUTDOOR_CYCLING"
    );

    //Assert

    const expectedHeartRatesWithIndexes: HeartRatesWithIndexesType = [
      [
        { index: 0, heartRate: 100 },
        { index: 1, heartRate: 110 },
      ],
      [
        { index: 0, heartRate: 90 },
        { index: 1, heartRate: 95 },
      ],
      [
        { index: 0, heartRate: 80 },
        { index: 1, heartRate: 85 },
      ],
      [
        { index: 0, heartRate: 75 },
        { index: 1, heartRate: 65 },
      ],
    ];

    expect(result).toEqual(expectedHeartRatesWithIndexes);
  });

  it("should pair heart rate arrays when activity type is INDOOR_CYCLING", () => {
    //Act
    const result: HeartRatesWithIndexesType = getHeartRateSamples(
      testSamplesData,
      "INDOOR_CYCLING"
    );

    //Assert
    const expectedPairedHeartRatesWithIndexes: HeartRatesWithIndexesType = [
      [
        { index: 0, heartRate: 100 },
        { index: 1, heartRate: 110 },
        { index: 2, heartRate: 90 },
        { index: 3, heartRate: 95 },
      ],
      [
        { index: 0, heartRate: 80 },
        { index: 1, heartRate: 85 },
        { index: 2, heartRate: 75 },
        { index: 3, heartRate: 65 },
      ],
    ];

    expect(result).toEqual(expectedPairedHeartRatesWithIndexes);
  });

  it("should throw an error if heart rate samples for INDOOR_CYCLING are odd", () => {
    //Arrange
    const unevenIndoorCyclingData: SamplesType = [
      {
        "recording-rate": 5,
        "sample-type": "2",
        data: "100,110",
      },
      {
        "recording-rate": 5,
        "sample-type": "2",
        data: "90,95",
      },
      {
        "recording-rate": 5,
        "sample-type": "2",
        data: "80,85",
      },
    ];

    //Act & Assert
    expect(() =>
      getHeartRateSamples(unevenIndoorCyclingData, "INDOOR_CYCLING")
    ).toThrow("Sample heart rates data missing as they should be even.");
  });

  it("should handle empty heart rate samples gracefully", () => {
    //Arrange
    const emptySamplesData: SamplesType = [
      {
        "recording-rate": 5,
        "sample-type": "1",
        data: "100,110,120",
      },
    ];

    //Act
    const result: HeartRatesWithIndexesType = getHeartRateSamples(
      emptySamplesData,
      "OUTDOOR_CYCLING"
    );

    //Assert
    expect(result).toEqual([]);
  });

  it("should convert heart rate strings to numbers", () => {
    //Arrange
    const mockHeartRateData: SamplesType = [
      {
        "recording-rate": 5,
        "sample-type": "2",
        data: "60,70,80",
      },
    ];

    //Act
    const result: HeartRatesWithIndexesType = getHeartRateSamples(
      mockHeartRateData,
      "OUTDOOR_CYCLING"
    );

    //Assert
    const expectedHeartRatesWithIndexes: HeartRatesWithIndexesType = [
      [
        { index: 0, heartRate: 60 },
        { index: 1, heartRate: 70 },
        { index: 2, heartRate: 80 },
      ],
    ];

    expect(result).toEqual(expectedHeartRatesWithIndexes);
  });
});
