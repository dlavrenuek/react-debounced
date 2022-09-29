module.exports = {
  rootDir: '../src',
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: true,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  coverageDirectory: '../coverage',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  modulePathIgnorePatterns: ['/dist/'],
};
