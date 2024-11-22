import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { fillByIdFirstElement, fillByPlaceholder } from "../Pages/commandFunction";
const firstName = faker.name.firstName(); // Random first name
const lastName = faker.name.lastName(); // Random last name
const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@yopmail.com`; // Random email
test.describe('TruVideo login', () => {
    test.beforeEach('LoggedIN', async ({ page }) => {

        await page.goto("https://rc.truvideo.com/login");
        await fillByPlaceholder(page, 'Email/Username', 'rahul.kapse@5exceptions.com');
        await fillByPlaceholder(page, 'Password', 'rahul434');
        await page.locator("input[type='submit']").click();

    });
    test('Create RO', async ({ page }) => {
        await page.locator("a[href='/crud/repair-order']").click();
        await page.locator("#repair-order-add").click();
        await fillByIdFirstElement(page, 'jobServiceNumber', '344');
        await fillByIdFirstElement(page, 'customer.firstName', 'John Deo');
        await fillByIdFirstElement(page, 'customer.lastName', 'Ro');
        await page.locator('#add-repair-order-save').click();
    });

    test('Create Users', async ({ page }) => {
        const otherDropdown = page.locator('a:has-text("Other")');
        await otherDropdown.click();
        await page.getByRole('link', { name: 'Users' }).click();
        await page.getByRole('button', { name: 'Add User' }).click();
        await page.getByLabel('Roles (Required)').click();
        await page.locator('#select2-drop').getByText('Administrator').click();
        await page.locator('ul').filter({ hasText: 'Administrator' }).click();
        await page.getByLabel('Roles (Required)').click();
        await page.locator('#select2-drop').getByText('Auto Send Spec One Step').click();
        await page.getByText('Administrator Auto Send Spec').click();
        await page.getByLabel('Roles (Required)').click();
        await page.locator('#select2-drop').getByText('Chat Executive').click();
        await page.getByLabel('Dealers').click();
        await page.locator('#select2-drop').getByText('Kenility', { exact: true }).click();
        await page.getByLabel('First Name (Required)').fill(firstName);
        await page.getByLabel('Last Name (Required)').fill(lastName);
        await page.getByLabel('Email (Required)').fill(email);
        await page.locator("##page-title-save").click();
    });
    
    test('Add SO', async ({ page }) => {
        const prospectsLink = page.locator('a:has-text("Prospects")');
        await prospectsLink.click();
        await page.locator("#sales-order-add").click();
        await page.getByLabel('First Name (Required)').fill(firstName);
        await page.getByLabel('Last Name (Required)').fill(lastName);
        await page.locator("input[data-submit='save']").click();
    });

    test('Update dealer settings',async({page})=>{
        const otherDropdown = page.locator('a:has-text("Other")');
        await otherDropdown.click();
        await page.getByRole('link', { name: 'Organization' }).hover();
        await page.getByRole('link', { name: 'Dealers' }).click();
        await page.locator("#dealer-add").click();
    });
});
