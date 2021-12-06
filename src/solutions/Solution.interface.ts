export interface Solution {
  first: (input: string) => string | number
  second?: (input: string) => string | number
  benchmarkRuns?: number
}
