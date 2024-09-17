import { Page, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();
const firstCardsVisible = 'div[class= "MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-2.4 css-lh0cok"]';
const secondCardsVisible = 'div[class= "MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6 css-1dw2z7q"]';
//Select the Pharmacy Daronco's Discount Pharmacy to visible the cards
export async function dashboardCards(page:Page) {
    // await expect(page.locator("#pharmacy-picker")).toBeVisible();
    await page.getByRole('button', { name: 'Daronco\'s Specialty Drugs' }).click();
    await page.getByText('Daronco\'s Discount Pharmacy').click();
    await expect (page.locator('div[class= "MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-2.4 css-lh0cok"]')).toBeVisible();
    await expect (page.locator('div[class= "MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6 css-1dw2z7q"]')).toBeVisible();
}
