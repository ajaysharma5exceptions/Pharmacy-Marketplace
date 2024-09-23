import { Page } from "@playwright/test";
import { clickButton, clickByText, fillByPlaceholder, verifyTextContent } from "./commandFunction";

export async function dashboardCards(page: Page) {
  await clickButton(page, "Daronco's Specialty Drugs");
  await clickByText(page, "Daronco's Discount Pharmacy");
  await verifyTextContent(page, "CURRENT GPR");
  await verifyTextContent(page, "CURRENT GCR");
  await verifyTextContent(page, "GENERICS BUDGET");
  await verifyTextContent(page, "TOTAL SAVINGS");
  await verifyTextContent(page, "COMPLETED ORDERS");
};

export async function firstOptionSearch(page:Page) {
  const firstOption = await page.locator('#live-inventory-search-option-0')
  await firstOption.click();
}

export async function randomOptionSearch(page:Page) {
  const desiredOption = await page.locator('#live-inventory-search-listbox >> text=37205-0076-78');
    await desiredOption.click();
}
// Function to click on an option by index
export async function selectOptionByIndex(page: Page, listboxSelector: string, index: number) {
  const option = page.locator(`${listboxSelector} >> nth=${index}`);
  await option.click();
}

// Function to click on an option by its text
export async function selectOptionByText(page: Page, listboxSelector: string, optionText: string) {
  const option = page.locator(`${listboxSelector} >> text=${optionText}`);
  await option.click();
}
//Add to cart
export async function addToCartItems(page: Page) {
  const addToCartButtonSelector = '[data-field="action"] [data-testid="AddShoppingCartIcon"]';
  const shoppingCartIconSelector = '[data-testid="ShoppingCartIcon"]';
  const qtyInputSelector = '[data-field="purchaseQuantity"] [data-testid="qtyTextField"]';
  const qtyItemValue = '5';
  const searchInventoryPlaceholder = 'Find an item';
  const drugOptionValue = '23155070410';

  await fillByPlaceholder(page, searchInventoryPlaceholder, drugOptionValue);
  await page.locator(qtyInputSelector).fill(qtyItemValue);
  await page.click(addToCartButtonSelector);
  await page.click(shoppingCartIconSelector);
}