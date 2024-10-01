import { test } from "@playwright/test";
import { pharmacyLoggedIn } from "../Pages/login";
import { addToCartItems, addToCartOther, dashboardCards, dashbordSearch, upgradeNow } from "../Pages/dashboard";
test.describe("Dashboard Testcase", () => {
  test.beforeEach("Login", async ({ page, baseURL }) => {
    await pharmacyLoggedIn(page, `${baseURL}`);
  });
  //Upgrade Now
  test("Upgrade Now Click", async ({ page }) => {
    await upgradeNow(page);
  });
  //Dashboard Visibility Testcase 
  test("Verify the Dashboard cards visible", async ({ page }) => {
    await dashboardCards(page);
  });

  //Search the Items
  test("Select a product from the dropdown based on text", async ({ page }) => {
    await dashbordSearch(page);
  });

  //Search the Items and add to cart randomDrugName
  test("randomDrugName search", async ({ page }) => {
    await addToCartOther(page);
  });
  //Search the Items and add to cart 
  test("Test Items to add to cart with 23155070410", async ({ page }) => {
    await addToCartItems(page)
  });
});
