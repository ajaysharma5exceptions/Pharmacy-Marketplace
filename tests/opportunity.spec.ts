import { expect, test } from "@playwright/test";
import { pharmacyLoggedIn } from "../Pages/login";
import {
  allWholeSalerDropdownFilter,
  dosageFilters,
  hideDrugItems,
  secondaryOpportunitySearch,
  switchPrimarySecondary,
  unhideDrugItems,
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
  test("Swith the tabs Secondary to Primary", async ({ page }) => {
    await switchPrimarySecondary(page);
  });

  test("All Wholesalers filter", async ({ page }) => {
    await allWholeSalerDropdownFilter(page);
  });
  test("Verify that the Dosage Forms filters Options", async ({ page }) => {
    await dosageFilters(page);
  });
  test("Verify that the hide button should be hide the drug", async ({ page }) => {
    await hideDrugItems(page);
  });
  test("Verify that the Unhide Drug Items", async ({ page }) => {
    await unhideDrugItems(page);
  });
});
