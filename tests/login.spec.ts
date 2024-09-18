import { Page, test } from "@playwright/test";
import * as dotenv from "dotenv";
import { pharmacyLogin, pharmacyLoginInvalid } from "../Pages/login";
import { verifyTextContent } from "../Pages/commandFunction";
dotenv.config();

const validEmail = process.env.VALID_EMAIL;
const validPassword = process.env.VALID_PASSWORD;
const invalidEmail = process.env.INVALID_EMAIL;
const invalidPassword = process.env.INVALID_PASSWORD;

test.describe("Login Pharmacy logintestcases", () => {
  test("Login with the Valid credentials", async ({ page, baseURL }) => {
    await page.goto(`${baseURL}`);
    await pharmacyLoginInvalid(page, invalidEmail, invalidPassword);
    await pharmacyLogin(page, validEmail, validPassword);
    await verifyTextContent(page, "Kiran Vishwakarma");
  });
});
