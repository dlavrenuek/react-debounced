module.exports = {
  rootDir: '../src',
  transform: {
    '.(ts|tsx)': [
      'ts-jest',
      {
        diagnostics: true,
      }
    ],
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  coverageDirectory: '../coverage',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  modulePathIgnorePatterns: ['/dist/'],
};
