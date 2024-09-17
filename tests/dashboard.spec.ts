import { test, expect } from "@playwright/test";
import { pharmacyLoggedIn } from "../Pages/login";
import { dashboardCards } from "../Pages/dashboard";

test.describe("Dashboard Testcase", () => {
  test.beforeEach("Login", async ({ page,baseURL}) => {
  await pharmacyLoggedIn(page, `${baseURL}`);

  });
  test('Verify the Dashboard cards visible',async({page})=>{
    dashboardCards(page);
  });
});
