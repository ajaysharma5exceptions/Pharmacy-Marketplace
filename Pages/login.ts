import { Page, expect } from "@playwright/test";

const emailInput = "input[type='text']";
const passwordInput = "input[type='password']";
const loginButton = "signInBtn";

//Hanld the repeat elements
async function fillLoginFields(
  page: Page,
  emailAddress: string,
  password: string
) {
  await page.locator(emailInput).fill(emailAddress);
  await page.locator(passwordInput).fill(password);
}
//Login with the valid  credentials

export async function pharmacyLogin(
  page: Page,
  emailAddress: any,
  password: any
) {
  await fillLoginFields(page, emailAddress, password);
  await page.getByTestId(loginButton).click();
}

//Login with the invalid credentials
export async function pharmacyLoginInvalid(
  page: Page,
  emailAddress: any,
  password: any
) {
  await fillLoginFields(page, emailAddress, password);
  await page.getByTestId("signInBtn").click();
}
//Empty Login
export async function pharmacyEmptyLogin(page: Page) {
  await page.getByTestId("signInBtn").click();
  await expect(page.getByTestId("signInBtn")).toBeDisabled();
}
