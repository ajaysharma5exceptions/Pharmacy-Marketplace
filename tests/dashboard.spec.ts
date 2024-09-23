const dashboardInventory= {
  verifyDashboardPage: "Kiran Vishwakarma",
  search: "Find an item",
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

import { test} from "@playwright/test";
import { pharmacyLoggedIn } from "../Pages/login";
import { addToCartItems, dashboardCards, firstOptionSearch, selectOptionByIndex} from "../Pages/dashboard";
import {fillByPlaceholder, verifyTextContent} from "../Pages/commandFunction";

test.describe("Dashboard Testcase", () => {
  test.beforeEach("Login", async ({ page, baseURL }) => {
    await pharmacyLoggedIn(page, `${baseURL}`);
    await verifyTextContent(page, dashboardInventory.verifyDashboardPage);
  });

  test("Verify the Dashboard cards visible",async({page})=>{
    await dashboardCards(page);
  });

  test("Select a product from the dropdown based on text", async ({ page }) => {
    await fillByPlaceholder(page, dashboardInventory.search, dashboardInventory.searchOption);
    await selectOptionByIndex(page,dashboardInventory.searchOptionLocator,dashboardInventory.searchOptionValue);
  });

  test("Add to add drug items",async({page})=>{
    await fillByPlaceholder(page, dashboardInventory.search,dashboardInventory.drugOptions);
    await page.fill(dashboardInventory.qtyInputSelector, dashboardInventory.qtyItemValue);
    await page.click(dashboardInventory.addToCartButtonSelector);
    await page.click(dashboardInventory.shoppingCartIconSelector);
  });

  test("OtherItem",async({page})=>{
    await fillByPlaceholder(page,dashboardInventory.search,dashboardInventory.randomDrugName);
    await firstOptionSearch(page);
    await page.fill(dashboardInventory.qtyInputSelector, dashboardInventory.qtyItemValue);
    await page.click(dashboardInventory.addToCartButtonSelector);
  });

 test("Test Items to add",async({page})=>{
  await addToCartItems(page)
});
});
