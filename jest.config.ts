import type { Config } from "@jest/types";

// Jest configuration object
const config: Config.InitialOptions = {
  // Specify the root directory for the project
  roots: ["<rootDir>/src"],

  // Transform TypeScript files using ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Coverage options
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // Pattern to detect test files
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

  // Setup files after environment is installed
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // Enable verbose output during tests
  verbose: true,
};

export default config;
