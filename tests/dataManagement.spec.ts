import { test } from "@playwright/test";
import { pharmacyLoggedIn } from "../Pages/login";
import path from "path";
import fs from 'fs';
import { selectDiscountPharmacy } from "../Pages/dashboard";
import { clickOnDataManagement, uploadFile, verifyDataManagementPage } from "../Pages/dataManagement";
import { clickByText } from "../Pages/commandFunction";

test.describe("Data Management", () => {
    test.beforeEach("Data Management Page", async ({ page, baseURL }) => {
        await pharmacyLoggedIn(page, `${baseURL}`);
        await selectDiscountPharmacy(page);
        await clickOnDataManagement(page);
    });
    test("Verify that the Data Management Page", async ({ page }) => {
        await verifyDataManagementPage(page);
    });
    test("Verify that the Import RX Data", async ({ page }) => {
         await page.waitForTimeout(7000);
        await clickByText(page, "Import RX Data");
        const dropzone = await page.locator('#myAwesomeDropzone');
        const filePath = path.resolve('E://FileUpload/rxdata.csv');
        const fileBuffer = fs.readFileSync(filePath);
        // await dropzone.setInputFiles(filePath); 
        const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
        await dataTransfer.evaluate((dt, fileBuffer) => {
            const file = new File([new Uint8Array(fileBuffer)], 'rxdata.csv', { type: 'text/csv' });
            dt.items.add(file);
          }, fileBuffer);
        
          // Dispatch the drop event on the Dropzone element
          await dropzone.dispatchEvent('drop', { dataTransfer });
    });
});
