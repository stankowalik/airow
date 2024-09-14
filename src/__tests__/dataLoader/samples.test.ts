import { getSamplesData, SamplesType } from "../../dataLoader";

const validSamplesData: SamplesType = [
  {
    "recording-rate": 60,
    "sample-type": "heart-rate",
    data: "72,73,74,75",
  },
  {
    "recording-rate": 30,
    "sample-type": "speed",
    data: "12,13,14",
  },
];

describe("getSamplesData", () => {
  it("should validate and return valid samples data", () => {
    //Act
    const result = getSamplesData(validSamplesData);

    //Assert
    expect(result).toEqual(validSamplesData);
  });

  it("should throw an error for invalid samples data (missing field)", () => {
    //Arrange
    const invalidSamplesData = [
      {
        "recording-rate": 60,
        // Missing "sample-type"
        data: "72,73,74,75",
      },
    ];

    //Act & Assert
    expect(() =>
      getSamplesData(invalidSamplesData as unknown as SamplesType)
    ).toThrow("Validation of samplesData failed");
  });

  it("should throw an error for invalid samples data (wrong type)", () => {
    //Arrange
    const invalidSamplesData = [
      {
        "recording-rate": "60", // Invalid type: should be number
        "sample-type": "heart-rate",
        data: "72,73,74,75",
      },
    ];

    //Act & Assert
    expect(() =>
      getSamplesData(invalidSamplesData as unknown as SamplesType)
    ).toThrow("Validation of samplesData failed");
  });

  it("should handle empty array of samples data (valid case)", () => {
    //Arrange
    const emptySamplesData: SamplesType = [];

    //Act
    const result = getSamplesData(emptySamplesData);

    //Assert
    expect(result).toEqual([]);
  });
});
