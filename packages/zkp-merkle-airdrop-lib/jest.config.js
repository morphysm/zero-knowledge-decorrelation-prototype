/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?|js?)$',
  testPathIgnorePatterns: ['/lib/', '/node_modules/'],
  collectCoverage: true,
  testTimeout: 60000,
};
