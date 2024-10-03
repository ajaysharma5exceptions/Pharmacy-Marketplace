import { Page,expect } from "@playwright/test";
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

//Click on the Discount Pharmacy
export async function selectDiscountPharmacy(page:Page) {
  await clickButton(page, "Daronco's Specialty Drugs");
  await clickByText(page, "Daronco's Discount Pharmacy");
};

export async function firstOptionSearch(page:Page) {
  const firstOption = await page.locator('#live-inventory-search-option-0')
  await firstOption.click();
};

export async function randomOptionSearch(page:Page) {
  const desiredOption = await page.locator('#live-inventory-search-listbox >> text=37205-0076-78');
    await desiredOption.click();
};
// Function to click on an option by index
export async function selectOptionByIndex(page: Page, listboxSelector: string, index: number) {
  const option = page.locator(`${listboxSelector} >> nth=${index}`);
  await option.click();
};

// Function to click on an option by its text
export async function selectOptionByText(page: Page, listboxSelector: string, optionText: string) {
  const option = page.locator(`${listboxSelector} >> text=${optionText}`);
  await option.click();
};
//Add to cart
 const dashboardInventory= {
  search: "Find an item",
  secondarySearch : "Search opportunity by drug name or NDC",
  searchOption: 'Vitamin',
  searchOptionValue: 0,
  searchOptionLocator: '#live-inventory-search-listbox',
  drugOptions: "23155070410",
  randomDrugName: "lis",
  qtyInputSelector: '[data-field="purchaseQuantity"] [data-testid="qtyTextField"]',
  qtyItemValue:  "5",
  addToCartButtonSelector:'[data-field="action"] [data-testid="AddShoppingCartIcon"]',
  shoppingCartIconSelector: '[data-testid="ShoppingCartIcon"]'
};
//Dashboard search drug with Vitamin 
export async function dashbordSearch(page:Page) {
  await fillByPlaceholder(page, dashboardInventory.search, dashboardInventory.searchOption);
  await selectOptionByIndex(page, dashboardInventory.searchOptionLocator, dashboardInventory.searchOptionValue);
};
//Dashboard search drug with drugOptions and add to cart
export async function addToCartItems(page: Page) {
  await fillByPlaceholder(page, dashboardInventory.search,dashboardInventory.drugOptions);
    await page.fill(dashboardInventory.qtyInputSelector, dashboardInventory.qtyItemValue);
    await page.click(dashboardInventory.addToCartButtonSelector);
    await page.click(dashboardInventory.shoppingCartIconSelector);
};
//Dashboard search drug with randomDrugName and add to cart
export async function addToCartOther(page:Page) {
  await fillByPlaceholder(page,dashboardInventory.search,dashboardInventory.randomDrugName);
  await firstOptionSearch(page);
  await page.fill(dashboardInventory.qtyInputSelector, dashboardInventory.qtyItemValue);
  await page.click(dashboardInventory.addToCartButtonSelector);
};
//Dashboard Upgrade
export async function  upgradeNow(page:Page) {
  const confirmMessage = "#alert-dialog-slide-description"
  const upgradeNow = "Upgrade Now"
  const upgradeMessage = "Request Upgrade"
  await page.getByText(upgradeNow).click();
  await expect(page.locator(confirmMessage)).toBeVisible();
  await page.getByText(upgradeMessage).click();
};