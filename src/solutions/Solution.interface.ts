export interface Solution {
  first: (input: string) => string | number | Promise<string | number>
  second?: (input: string) => string | number | Promise<string | number>
  benchmarkRuns?: number
}
