import { test } from "@playwright/test";
import { pharmacyLoggedIn } from "../Pages/login";
import { verifyOpportunityPage } from "../Pages/opportunity";
import { selectDiscountPharmacy } from "../Pages/dashboard";

test.describe("To verify the Opportunity page", () => {
  test.beforeEach("Login info the application", async ({ page, baseURL }) => {
    await pharmacyLoggedIn(page, `${baseURL}`);
    await selectDiscountPharmacy(page);
    // await verifyOpportunityPage(page);
    await page.locator('Opportunity-menuButton').click();
  });

  test("Verify that the Oppotunity page", async ({ page }) => {
    // await verifyOpportunityPage(page);
  });
});
