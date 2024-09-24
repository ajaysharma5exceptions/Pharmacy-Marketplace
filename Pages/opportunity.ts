import { Page,expect } from "@playwright/test";
import { clickByDataTestId } from "./commandFunction";

export async function verifyOpportunityPage(page:Page) {
    clickByDataTestId(page,'Opportunity-menuButton');
};