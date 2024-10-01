import { test, expect, Page } from "@playwright/test";
import { pharmacyLoggedIn } from "../Pages/login";
import {
  secondaryOpportunitySearch,
  switchPrimarySecondary,
  verifyOpportunityCards,
  verifyOpportunityPage,
} from "../Pages/opportunity";
import { selectDiscountPharmacy } from "../Pages/dashboard";


test.describe("To verify the Opportunity page", () => {
  test.beforeEach("Login info the application", async ({ page, baseURL }) => {
    await pharmacyLoggedIn(page, `${baseURL}`);
    await selectDiscountPharmacy(page);
    await verifyOpportunityPage(page);
  });

  test("Verify that the Oppotunity page", async ({ page }) => {
    await verifyOpportunityCards(page);
  });
  test("Search NDC from the Secondary", async ({ page }) => {
    await secondaryOpportunitySearch(page);
  });
  test("Swith the tabs Secondary to Primary",async ({page}) => {
    await switchPrimarySecondary(page);
  })
});
