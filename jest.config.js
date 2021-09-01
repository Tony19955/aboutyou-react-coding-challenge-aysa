module.exports = {
  roots: ['<rootDir>/src'],
  testRegex: '(/__tests__/.*\\.test)\\.(ts|tsx|js)$',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
};
