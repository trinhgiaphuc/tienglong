import { getUserToken } from '@lib/utils';

describe("get user token funtion", () => {
  test.skip("works properly", () => {
    expect(getUserToken({ cookies: { USER_ACCESS_TOKEN: "Hello" } })).toBe(
      "Hello"
    );
    expect(getUserToken({ cookies: { USER_ACCESS_TOKEN: "Him" } })).toBe("Him");
  });

  test.skip("throw error when the provided arguement is not sufficent", () => {
    expect(getUserToken({ cookies: { MY_TOKEN: "123123" } })).toBe("");
    expect(getUserToken({ cookies: { USER_ACCESS_TOKEN: "" } })).toBe("");
    expect(getUserToken({})).toBe("");
  });
});
