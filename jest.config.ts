import type { Config } from '@jest/types';

//This code is from jest documentation, and it is used to configure Jest for a TypeScript project.
// It specifies that the preset is 'ts-jest', which allows Jest to understand TypeScript files. 
// The test environment is set to 'node', and the roots for test files are specified as '<rootDir>/tests'. 
// The testMatch pattern indicates that Jest should look for files ending with '.test.ts' in the specified roots.
// The configuration also enables verbose output, collects coverage information from all TypeScript files in
// the 'src' directory, and specifies that the coverage reports should be output to a 'coverage' directory.
const config: Config.InitialOptions = {
preset: 'ts-jest',
testEnvironment: 'node',
roots: ['<rootDir>/tests'],
testMatch: ['**/*.test.ts'],
verbose: true,
collectCoverage: true,
collectCoverageFrom: ['src/**/*.{ts,tsx}'],
coverageDirectory: 'coverage',
};
export default config;