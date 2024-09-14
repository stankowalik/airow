import {
  processTrainingData,
  processLapsData,
  getHeartRateSamples,
  HeartRatesWithIndexesType,
  ProcessedLapsDataType,
} from "../../dataProcessor";
import { LapsType, SamplesType, SummaryType } from "../../dataLoader";

jest.mock("../../dataProcessor/lapsProcessor", () => ({
  processLapsData: jest.fn(),
}));

jest.mock("../../dataProcessor/samplesProcessor", () => ({
  getHeartRateSamples: jest.fn(),
}));

const mockLapsData: LapsType = [
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

const mockSamplesData: SamplesType = [
  {
    "recording-rate": 5,
    "sample-type": "2",
    data: "70,80,90",
  },
  {
    "recording-rate": 5,
    "sample-type": "2",
    data: "60,70,80",
  },
  {
    "recording-rate": 5,
    "sample-type": "2",
    data: "100,110,90",
  },
  {
    "recording-rate": 5,
    "sample-type": "2",
    data: "88,99,111",
  },
];

const mockSamplesJustOneLapData: SamplesType = [
  {
    "recording-rate": 5,
    "sample-type": "2",
    data: "70,80,90",
  },
  {
    "recording-rate": 5,
    "sample-type": "2",
    data: "60,70,80",
  },
];

const mockSummaryData: SummaryType = {
  userId: "12345",
  activityType: "INDOOR_CYCLING",
  deviceName: "SmartWatch XYZ",
  maxHeartRateInBeatsPerMinute: 180,
  durationInSeconds: 5400,
  activityId: 9480958402,
  activityName: "Indoor Cycling",
  startTimeInSeconds: 1661158927,
  startTimeOffsetInSeconds: 7200,
  averageHeartRateInBeatsPerMinute: 150,
  activeKilocalories: 561,
};

const mockHeartRatesSamples = [
  [
    { index: 0, heartRate: 70 },
    { index: 1, heartRate: 80 },
    { index: 2, heartRate: 90 },
    { index: 3, heartRate: 60 },
    { index: 4, heartRate: 70 },
    { index: 5, heartRate: 80 },
  ],
  [
    { index: 0, heartRate: 100 },
    { index: 1, heartRate: 110 },
    { index: 2, heartRate: 90 },
    { index: 3, heartRate: 88 },
    { index: 4, heartRate: 99 },
    { index: 5, heartRate: 111 },
  ],
];

const mockProcessedLapsData = [
  {
    startTimeInSeconds: 1000,
    totalDistanceInMeters: 5000,
    timerDurationInSeconds: 3600,
    heartRateSamples: [
      { index: 0, heartRate: 70 },
      { index: 1, heartRate: 80 },
      { index: 2, heartRate: 90 },
      { index: 3, heartRate: 60 },
      { index: 4, heartRate: 70 },
      { index: 5, heartRate: 80 },
    ],
  },
  {
    startTimeInSeconds: 2000,
    totalDistanceInMeters: 10000,
    timerDurationInSeconds: 7200,
    heartRateSamples: [
      { index: 0, heartRate: 100 },
      { index: 1, heartRate: 110 },
      { index: 2, heartRate: 90 },
      { index: 3, heartRate: 88 },
      { index: 4, heartRate: 99 },
      { index: 5, heartRate: 111 },
    ],
  },
];

describe("processData", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (getHeartRateSamples as jest.Mock).mockReturnValue(mockHeartRatesSamples);
    (processLapsData as jest.Mock).mockReturnValue(mockProcessedLapsData);
  });

  it("should process data correctly and return the expected object", () => {
    //Act
    const result = processTrainingData(
      mockLapsData,
      mockSamplesData,
      mockSummaryData
    );

    //Assert
    const expected = {
      activityOverview: {
        userId: "12345",
        activityType: "INDOOR_CYCLING",
        deviceName: "SmartWatch XYZ",
        maxHeartRateInBeatsPerMinute: 180,
        durationInSeconds: 5400,
      },
      lapsData: mockProcessedLapsData,
    };

    expect(result).toEqual(expected);
  });

  it("should handle empty lapsData and heart rate samples", () => {
    //Arrange
    const emptyLapsData: LapsType = [];
    const emptySamplesData: SamplesType = [];
    const emptyHeartRatesSamples: HeartRatesWithIndexesType = [];
    const emptyProcessedLapsData: ProcessedLapsDataType = [];

    (getHeartRateSamples as jest.Mock).mockReturnValue(emptyHeartRatesSamples);
    (processLapsData as jest.Mock).mockReturnValue(emptyProcessedLapsData);

    //Act
    const result = processTrainingData(
      emptyLapsData,
      emptySamplesData,
      mockSummaryData
    );

    //Assert
    const expected = {
      activityOverview: {
        userId: "12345",
        activityType: "INDOOR_CYCLING",
        deviceName: "SmartWatch XYZ",
        maxHeartRateInBeatsPerMinute: 180,
        durationInSeconds: 5400,
      },
      lapsData: [],
    };

    expect(result).toEqual(expected);
  });

  it("should throw an error when heart rate samples and laps count do not match", () => {
    //Arrange
    (getHeartRateSamples as jest.Mock).mockReturnValue([
      [
        { index: 0, heartRate: 70 },
        { index: 1, heartRate: 80 },
      ],
      [
        { index: 0, heartRate: 60 },
        { index: 1, heartRate: 70 },
      ],
      [
        { index: 0, heartRate: 90 },
        { index: 1, heartRate: 100 },
      ],
    ]);

    //Act & Assert
    expect(() =>
      processTrainingData(
        mockLapsData,
        mockSamplesJustOneLapData,
        mockSummaryData
      )
    ).toThrow("Heart rates samples does not match the number of laps");
  });
});
