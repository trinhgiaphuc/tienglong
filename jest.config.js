{
  // jest.config.js
  const nextJest = require("next/jest");

  const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: "./",
  });

  // Add any custom config to be passed to Jest
  const customJestConfig = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

    moduleDirectories: ["node_modules", "<rootDir>"],

    testEnvironment: "jest-environment-jsdom",
    testPathIgnorePatterns: ["__mocks__"],

    transformIgnorePatterns: ["<rootDir>/node_modules/@firebase"],

    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/$1",
      "^@firebase/(.*)$": "<rootDir>/node_modules/@firebase/$1",
      "^firebase/(.*)$": "<rootDir>/node_modules/firebase/$1",
      "^@components/(.*)$": "<rootDir>/components/$1",
      "^@lib/(.*)$": "<rootDir>/lib/$1",
      "^assets/(.*)$": "<rootDir>/assets/$1",
      "^styles/(.*)$": "<rootDir>/styles/$1",
      "^@pages/(.*)$": "<rootDir>/pages/$1",
    },
  };

  // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
  module.exports = createJestConfig(customJestConfig);
}
