// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';

import { server } from './__tests__/__mocks__/msw/server.js';


beforeAll(() => {
  return server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


window.alert = console.log;
