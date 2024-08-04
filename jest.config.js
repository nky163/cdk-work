module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/cdk/app/test'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
