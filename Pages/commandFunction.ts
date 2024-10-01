import { Page, expect } from "@playwright/test";
//Click button function
export async function clickButton(
  page: Page,
  buttonText: string,
  role: any = "button"
) {
  await page.getByRole(role, { name: buttonText }).click();
}

//Get by the roles
export async function getByRoles(page: Page, roleText: string | RegExp, role: any) {
  await page.getByRole(role, { name: roleText }).click();
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

export async function fillByPlaceholder(page: Page, placeholder: string, value: string) {
  const element = page.getByPlaceholder(placeholder);
  await element.fill(value);
}

//Click by the testId
export async function clickByDataTestId(page:Page, value: string) {
  const element = page.getByTestId(value)
  await element.click();
}
//Checkbox click to check
export async function checkCheckboxByText(page: Page, text: string) {
  const checkboxLocator = page.getByLabel(text);
  await checkboxLocator.check();
}
//checkbox click on the Uncheck
export async function uncheckCheckboxByText(page: Page, text: string) {
  const checkboxLocator = page.getByLabel(text);
  await checkboxLocator.uncheck();
}
