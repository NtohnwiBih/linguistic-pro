/** Simulates network latency while the prototype has no backend. Remove with the mocks. */
export const simulateLatency = (ms = 700) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
