// Import additional matchers from Jest DOM (useful for testing React components)
import "@testing-library/jest-dom/extend-expect";

// Reset mock implementations and states before each test
beforeEach(() => {
  jest.clearAllMocks();
});

// Clean up after all tests have run
afterAll(() => {
  jest.restoreAllMocks();
});
