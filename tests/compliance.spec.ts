import { test } from "@playwright/test";
import { pharmacyLoggedIn } from "../Pages/login";
import { selectDiscountPharmacy } from "../Pages/dashboard";
import { clickCompliancePage, verifyComplianceCards } from "../Pages/compliance";

test.describe('compliance Test cases',()=>{
test.beforeEach('compliance on the Page',async({page, baseURL})=>{
    await pharmacyLoggedIn(page,`${baseURL}`);
    await selectDiscountPharmacy(page);
    await clickCompliancePage(page);
});
test('Verify that the Cards of Compliance Page',async({page})=>{
    await verifyComplianceCards(page);
});
});