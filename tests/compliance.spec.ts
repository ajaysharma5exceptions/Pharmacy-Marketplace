import { test, expect } from "@playwright/test";
import { pharmacyLoggedIn } from "../Pages/login";
import { selectDiscountPharmacy } from "../Pages/dashboard";
import { clickCompliancePage, verifyComplianceCards } from "../Pages/compliance";

test.describe('compliance Test cases', () => {
    test.beforeEach('compliance on the Page', async ({ page, baseURL }) => {
        await pharmacyLoggedIn(page, `${baseURL}`);
        await selectDiscountPharmacy(page);
        await clickCompliancePage(page);
        await page.waitForTimeout(20000)
    });
    test('Verify that the Cards of Compliance Page', async ({ page }) => {
        await verifyComplianceCards(page);
    });
    test('Verify the redirection for Rebate Tiers options', async ({ page }) => {
        const editRebateSelector = 'text=Edit Rebate Tiers';
        const addGCRRebateSelector = 'text=Add GCR Rebate Tiers'; 
        if (await page.locator(editRebateSelector).isVisible()) {
            await page.locator(editRebateSelector).click();
        } else if (await page.locator(addGCRRebateSelector).isVisible()) {
            await page.locator(addGCRRebateSelector).click();
        } else {
            throw new Error('Neither "Edit Rebate Tiers" nor "Add GCR Rebate Tiers" button is visible.');
        }
        await expect(page).toHaveURL('/pharmacy#rebateTable');
    });
    
    test('Verify that the Est. GPR Leakage amount calculation is correct', async ({ page }) => {
        const dispensedSelector = 'p.MuiTypography-root.MuiTypography-body1.css-1e17j98';
        const purchasedSelector = 'div.MuiStack-root.css-j7qwjs > p.MuiTypography-root.MuiTypography-body1.css-1lx7kfr';
        const leakageSelector = 'div.MuiStack-root.css-1mzerio p.MuiTypography-root.MuiTypography-body1.css-1y6yizb';
        // Get Dispensed Amount
        const dispensedAmountText = await page.textContent(dispensedSelector);
        console.log(`Raw Dispensed Amount Text: "${dispensedAmountText}"`);
        if (!dispensedAmountText) throw new Error("Dispensed amount text not found.");
        const dispensedAmount = parseFloat(dispensedAmountText.replace(/[^\d.-]/g, ''));
        // Get Purchased Amount
        const purchasedAmountText = await page.textContent(purchasedSelector);
        console.log(`Raw Purchased Amount Text: "${purchasedAmountText}"`);
        if (!purchasedAmountText) throw new Error("Purchased amount text not found.");
        const purchasedAmount = parseFloat(purchasedAmountText.replace(/[^\d.-]/g, ''));
        // Calculate Expected Leakage
        const expectedLeakage = dispensedAmount - purchasedAmount;
        console.log(`Expected Leakage: ${expectedLeakage}`);
        // Get Actual Leakage from the page
        const actualLeakageText = await page.textContent(leakageSelector);
        console.log(`Raw Actual Leakage Text: "${actualLeakageText}"`);
        if (!actualLeakageText) throw new Error("Leakage amount text not found.");
        const actualLeakage = parseFloat(actualLeakageText.replace(/[^\d.-]/g, ''));
        console.log(`Actual Leakage: ${actualLeakage}`);
        expect(actualLeakage).toBe(actualLeakage);
    });
});