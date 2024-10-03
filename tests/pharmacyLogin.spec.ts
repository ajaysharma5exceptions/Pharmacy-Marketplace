import { test } from "@playwright/test";
import { pharmacyLoggedIn, pharmacyLogin } from "../Pages/login";
import { clickButton, fillValueAndVerify } from "../Pages/commandFunction";
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

const emailInput = "input[type='text']";
const passwordInput = "input[type='password']";

test("New aaproachlogin",async({page,baseURL})=>{
  await page.goto(`${baseURL}`);
  await fillValueAndVerify(page, emailInput, credentials.email);
  await fillValueAndVerify(page,passwordInput, credentials.password);
  await clickButton(page, 'SIGN IN');
});

