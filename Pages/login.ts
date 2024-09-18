import { Page, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import { clickButton, verifyTextContent } from "./commandFunction";
dotenv.config();
const emailInput = "input[type='text']";
const passwordInput = "input[type='password']";

// Function to fill login fields
async function fillLoginFields(page: Page, emailAddress: string, password: string) {
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
  await clickButton(page, 'SIGN IN');
}

//Login with the invalid credentials
export async function pharmacyLoginInvalid(
  page: Page,
  emailAddress: any,
  password: any
) {
  await fillLoginFields(page, emailAddress, password);
  await clickButton(page, 'SIGN IN');

}
// Main login function 
export async function pharmacyLoggedIn(page: Page, baseURL: string) {
  const validEmail = process.env.VALID_EMAIL;
  const validPassword = process.env.VALID_PASSWORD;
  await page.goto(`${baseURL}`);
  await pharmacyLogin(page, validEmail!, validPassword!);
}