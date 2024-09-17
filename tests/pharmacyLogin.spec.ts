import { test } from "@playwright/test";
import { pharmacyLoggedIn, pharmacyLogin } from "../Pages/login";
const credentials = {
  email: "kiran.vishwakarma@5exceptions.com",
  password: "yPFgj1QoQ3Lk8R0hU3Cp",
};

test("Login with first approach", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  await pharmacyLogin(page, credentials.email, credentials.password);
});

test("Login", async ({ page, baseURL }) => {
  await pharmacyLoggedIn(page, `${baseURL}`);  // Use 'await' to wait for the login process
});

