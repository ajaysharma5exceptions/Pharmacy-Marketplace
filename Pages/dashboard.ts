import { Page, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();
//Click on the pharmacy
const  pharmacy = 'button[aria-controls="pharmacy-picker"]'

export async function dashboardCards(page: Page) {
    const cardsvisible = page.getByText('Current GPR');
    await expect(cardsvisible).toBeTruthy();
    await expect(page.getByText('Current GPR')).toBeTruthy();
    await expect(page.getByText('CURRENT GCR')).toBeTruthy();
    await expect(page.getByText('GENERICS BUDGET')).toBeTruthy();
    await expect(page.getByText('TOTAL SAVINGS')).toBeTruthy();
    await expect(page.getByText('COMPLETED ORDERS')).toBeTruthy();
}
