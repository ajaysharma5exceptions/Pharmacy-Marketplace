import { Page, expect } from "@playwright/test";
import {
  clickByDataTestId,
  clickByText,
  fillByPlaceholder,
  getByRoles,
  verifyTextContent,
} from "./commandFunction";
import { selectOptionByIndex } from "./dashboard";

export async function verifyOpportunityPage(page: Page) {
  const opportunityMenuButton = page.locator(
    '[data-testid="Opportunity-menuButton"]'
  );
  await opportunityMenuButton.click();
}

export async function verifyOpportunityCards(page: Page) {
  await verifyTextContent(page, "Secondary Savings Opportunity");
  await verifyTextContent(page, "Secondary Spend Budget");
  await verifyTextContent(page, "Est. GPR");
  await verifyTextContent(page, "Est. GCR");
  await getByRoles(page, /Secondary Spend Budget \$.+/, "link");
  await getByRoles(page, /Est\. GCR.*No data found Import/, "link");
  await expect(page).toHaveURL(
    "https://app.dev.pharmacymarketplace.com/settings"
  );
  await verifyOpportunityPage(page);
}

export async function secondaryOpportunitySearch(page: Page) {
  const secondaryOpportunity = {
    secondarySearch: "Search opportunity by drug name or NDC",
    searchOption: "Vitamin",
    searchOptionValue: 0,
    searchOptionLocator: "#live-inventory-search-listbox",
    drugOptions: "23155070410",
    randomDrugName: "lis",
    qtyInputSelector:
      '[data-field="purchaseQuantity"] [data-testid="qtyTextField"]',
    qtyItemValue: "5",
    addToCartButtonSelector:
      '[data-field="action"] [data-testid="AddShoppingCartIcon"]',
    shoppingCartIconSelector: '[data-testid="ShoppingCartIcon"]',
  };
  await fillByPlaceholder(
    page,
    secondaryOpportunity.secondarySearch,
    secondaryOpportunity.drugOptions
  );
  await page.fill(
    secondaryOpportunity.qtyInputSelector,
    secondaryOpportunity.qtyItemValue
  );
  await page.click(secondaryOpportunity.addToCartButtonSelector);
  await page.click(secondaryOpportunity.shoppingCartIconSelector);
}

// export async function switchPrimarySecondary(page: Page) {
//     await clickByText(page,'Primary');
//     await clickByText(page,'Secondary');
// }

export async function switchPrimarySecondary(page: Page) {
    const switchPrimarySecondaryButton = page.locator('[data-testid="Opportunity-menuButton"]');
    const isPrimarySelected = await page.locator('text=Primary').getAttribute('aria-current') === 'page';
  
    if (isPrimarySelected) {
      await clickByText(page, "Secondary");
    } else {
      await clickByText(page, "Primary");
    }
  }
  