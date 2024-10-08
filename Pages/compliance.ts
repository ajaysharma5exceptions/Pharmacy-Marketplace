import { Page, expect } from "@playwright/test";
import { verifyTextContent } from "./commandFunction";

//MenuButton Click
export async function clickCompliancePage(page: Page) {
    const complianceMenuButton = page.locator('[data-testid="Compliance-menuButton"]');
    await complianceMenuButton.click();
};

export async function verifyComplianceCards(page: Page) {
    await verifyTextContent(page, "Est. GPR");
    await verifyTextContent(page, "Est. GCR");
    await verifyTextContent(page, "GPR Rebate Tiers");
    await verifyTextContent(page, "GCR Rebate Tiers for Brand Spend");

    //For the Est. GPR
    const gprStartDate = new Date();
    gprStartDate.setMonth(gprStartDate.getMonth() - 2);
    const gprEndDate = new Date();
    const gprEvaluationPeriod = `${gprStartDate.getMonth() + 1}/1/${gprStartDate.getFullYear()} — ${gprEndDate.getMonth() + 1}/${gprEndDate.getDate()}/${gprEndDate.getFullYear()} | 3 Months | Only Tablets & Capsules`;
    await verifyTextContent(page, `Evaluation Period: ${gprEvaluationPeriod}`);
    //for the Est. GCR
    const gcrStartDate = new Date();
    gcrStartDate.setDate(1); // Start date is the first day of the current month
    const gcrEndDate = new Date();
    const gcrEvaluationPeriod = `${gcrStartDate.getMonth() + 1}/1/${gcrStartDate.getFullYear()} — ${gcrEndDate.getMonth() + 1}/${gcrEndDate.getDate()}/${gcrEndDate.getFullYear()} | Month To Date`;

    await verifyTextContent(page, `Evaluation Period: ${gcrEvaluationPeriod}`); 
  };