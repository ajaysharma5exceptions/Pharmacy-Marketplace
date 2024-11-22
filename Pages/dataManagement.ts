import {  Page} from "@playwright/test";
import { verifyTextContent } from "./commandFunction";

//MenuButton Click
export async function clickOnDataManagement(page: Page) {
    const dataManagementMenuButton = page.locator('[data-testid="Data Management-menuButton"]');
    await dataManagementMenuButton.click();
};

//Verify the datamanagement page
export async function verifyDataManagementPage(page:Page) {
    await verifyTextContent(page, "IMPORT RX DATA");
    await verifyTextContent(page, "IMPORT INVOICES");
    await verifyTextContent(page, "DELETE");
    await verifyTextContent(page, "Dispensing & Purchasing Activity");
    await verifyTextContent(page, "Dispensed Prescriptions");
    await verifyTextContent(page, "McKesson Purchases");
    await verifyTextContent(page, "Today");
    await verifyTextContent(page, "Back");
    await verifyTextContent(page, "Next");
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    const currentMonthYear = currentDate.toLocaleString('default', options);
    await verifyTextContent(page, currentMonthYear);
}

export async function uploadFile(page: Page, filePath: string) {
    await page.waitForTimeout(7000);
    const importRXClick = page.locator('[data-testid="MedicationIcon"]');
   await importRXClick.click();

//     // Then click on the Dropzone button to trigger the file upload
    const dropzoneButtonSelector = 'form#myAwesomeDropzone button.dz-button';
    await page.locator(dropzoneButtonSelector).click();

//     // Set the file to upload using the hidden file input
    const fileInputSelector = 'input[type="file"]'; // Assuming the file input is hidden within the Dropzone
    await page.locator(fileInputSelector).setInputFiles(filePath);
}