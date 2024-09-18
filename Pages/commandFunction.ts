import { Page, expect } from "@playwright/test";
//Click button function
export async function clickButton(
  page: Page,
  buttonText: string,
  role: any = "button"
) {
  await page.getByRole(role, { name: buttonText }).click();
}

//Fill value function with Expect
export async function fillValueAndVerify(
  page: Page,
  locator: string,
  value: string
) {
  await page.locator(locator).fill(value);
  await expect(page.locator(locator)).toHaveValue(value);
}

// Function to verify text content using getByText
export async function clickByText(page: Page, text: string) {
  const element = page.getByText(text);
  await element.click();
}

// Function to fill an input field found by text content
export async function fillByText(page: Page, text: string, value: string) {
  const element = page.getByText(text).locator("input");
  await element.fill(value);
}

// Function to verify text content
export async function verifyTextContent(page: Page, text: string) {
  const textLocator = page.getByText(text);
  await expect(textLocator).toBeVisible();
}
