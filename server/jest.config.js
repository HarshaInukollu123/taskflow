export default {
    transform: {
      '^.+\\.js$': 'babel-jest', // Use Babel to transform .js files
    },
    testEnvironment: 'node', // Use Node environment
  };