import { expect, test, } from "@playwright/test";
import { pharmacyLoggedIn } from "../Pages/login";
import { addToCartItems, autoSuggetionSearch, dashbordSearch, invalidNDCSearch, randomSearch, selectDiscountPharmacy, threeLetterSearch, validNDCSearch } from "../Pages/dashboard";
import { secondaryOpportunitySearch } from "../Pages/opportunity";
import { clickByText, fillByPlaceholder } from "../Pages/commandFunction";

test.describe("Dashboard Testcase", () => {
    test.beforeEach("Login", async ({ page, baseURL }) => {
        await pharmacyLoggedIn(page, `${baseURL}`);
        await selectDiscountPharmacy(page); //click on the Discount pharmacy
    });
    test('Verify that the the search free text generic drug name', async ({ page }) => {
        await randomSearch(page);
        await page.getByPlaceholder('Find an item').press('Enter');
        const rowSelector = 'div[data-id="3065cfa6-b764-4891-ba18-ef20b4c9dfb1"]';
        await expect(page.locator(rowSelector)).toBeVisible();
    });

    test("Verify that the valid NDC drug", async ({ page }) => {
        await validNDCSearch(page);
        const rowSelector = 'div[data-id="21592c90-c30a-4251-8784-eb8724c48c7e"]';
        await expect(page.locator(rowSelector)).toBeVisible();
    });
    test("Verify that the Invalid NDC drug", async ({ page }) => {
        await invalidNDCSearch(page);
        const verifyText = await page.getByText('No results found for:');
        await expect(verifyText).toBeVisible();
    });

    test("Verify that the search at least the first three letters of drug name with a space", async ({ page }) => {
        await threeLetterSearch(page);
        const rowSelector = 'div[data-id="c153d509-3396-42c8-8882-dac5249b3560"]';
        await expect(page.locator(rowSelector)).toBeVisible();

    });
    test.skip("Verify that the add to cart when searching", async ({ page }) => {
        await addToCartItems(page);
        const sendOrderButton = await page.locator('button[data-testid="bluepax_secondary-placeOrderButton"]');
        await sendOrderButton.click();
        await expect(sendOrderButton).toBeVisible();
        const rowSelector = 'div[data-id="6718aeebdbe8be3831889b52"]';
        await expect(page.locator(rowSelector)).toBeVisible();
    });

    test('Verify that the when search the drug and click on the view Dispensing', async ({ page }) => {
        await randomSearch(page);
        await page.getByPlaceholder('Find an item').press('Enter');
        await page.locator('[data-testid="BarChartIcon"]').first().click();
        await expect(page).toHaveURL('https://app.dev.pharmacymarketplace.com/search?term=72789024901&name=Vitamin%20D%20(Ergocalciferol)%201.25%20MG%20(50000%20UT)');
    });

    test('Verify that the auto suggetiong is working', async ({ page }) => {
        await autoSuggetionSearch(page);
    });
    test('Verify that the random search', async ({ page }) => {
        await randomSearch(page);
        await page.getByPlaceholder('Find an item').press('Enter');
        await expect(page.getByText('Inventory Search Results: "vitamin"')).toBeVisible();
    });

    test('Verify Exclude Tablets & Capsules toggle on search page.', async ({ page }) => {
        await randomSearch(page);
        await page.getByPlaceholder('Find an item').press('Enter');
        await clickByText(page, 'Exclude Tablets & Capsules');
    });

    test('Verify Highlight When "All Wholesalers" Selected', async ({ page }) => {
        await dashbordSearch(page);
        const wholesalerSelect = page.getByTestId("wholesalersSelect");
        await expect(wholesalerSelect).toHaveText('All Wholesalers');
    });
    test('Verify search with the empty input.', async ({ page }) => {
        await page.getByPlaceholder('Find an item').press('Enter');
    });
    test('Verify that the validation of secondary search', async ({ page }) => {
        await dashbordSearch(page);
        const inputSelector = 'input[placeholder="Search the results..."]';
        await page.locator(inputSelector).fill('Vitamin D (Ergocalciferol) 50000 UNIT');
        const rowSelector = 'div[data-id="bad4a11b-27fc-4e25-9673-07deb65b67fc"]';
        await expect(page.locator(rowSelector)).toBeVisible();
    });
});
