import { test, expect } from "@playwright/test";
import { pharmacyLoggedIn } from "../Pages/login";
import { dashboardCards } from "../Pages/dashboard";
import {
  clickButton,
  clickByText,
  verifyTextContent,
} from "../Pages/commandFunction";

test.describe("Dashboard Testcase", () => {
  test.beforeEach("Login", async ({ page, baseURL }) => {
    await pharmacyLoggedIn(page, `${baseURL}`);
    await verifyTextContent(page, "Kiran Vishwakarma");
  });

  test("Verify the Dashboard cards visible", async ({ page }) => {
    await clickButton(page, "Daronco's Specialty Drugs");
    await clickByText(page, "Daronco's Discount Pharmacy");
    await verifyTextContent(page, "CURRENT GPR");
    await verifyTextContent(page, "CURRENT GCR");
    await verifyTextContent(page, "GENERICS BUDGET");
    await verifyTextContent(page, "TOTAL SAVINGS");
    await verifyTextContent(page, "COMPLETED ORDERS");
  });
});
