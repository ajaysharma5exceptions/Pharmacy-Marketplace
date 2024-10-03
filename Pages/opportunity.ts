import { Page, expect } from "@playwright/test";
import {
  checkCheckboxByText,
  clickByDataTestId,
  clickByText,
  fillByPlaceholder,
  getByRoles,
  uncheckCheckboxByText,
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
export async function secondaryOpportunitySearch(page: Page) {
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

export async function switchPrimarySecondary(page: Page) {
  const switchPrimarySecondaryButton = page.locator(
    '[data-testid="Opportunity-menuButton"]'
  );
  const isPrimarySelected =
    (await page.locator("text=Primary").getAttribute("aria-current")) ===
    "page";

  if (isPrimarySelected) {
    await clickByText(page, "Secondary");
  } else {
    await clickByText(page, "Primary");
  }
}

export async function allWholeSalerDropdownFilter(page: Page) {
  await clickByDataTestId(page, "wholesalersSelect");
  await page.getByLabel("Capital Drug").check();
  const verifylebalText = page
    .getByTestId("wholesalersSelect")
    .getByText("Capital Drug");
  await expect(verifylebalText).toBeVisible();
}
const moreFilterOptions = {
  // Categories (Checkboxes)
  onlyShowBrands: "input[name='onlyShowBrands']",
  onlyHiddenItems: "input[name='onlyShowHidden']",
  onlyShowRefrigeratedItems: "input[name='onlyShowRefrigerated']",
};

async function toggleAndVerifyFilter(page: Page, filterLocator: string) {
  const filter = page.locator(filterLocator);

  if (filterLocator.includes("input")) {
    await filter.click();
    await expect(filter).toBeChecked();
    await filter.click();
    await expect(filter).not.toBeChecked();
  } else {
    await filter.click();
  }
}

export async function verifyMoreFilters(page: Page) {
  await clickByText(page, "More Filters");
  const filters = [
    moreFilterOptions.onlyShowBrands,
    moreFilterOptions.onlyHiddenItems,
    moreFilterOptions.onlyShowRefrigeratedItems,
  ];
  for (const filter of filters) {
    await toggleAndVerifyFilter(page, filter);
  }
}

//For the new Dosage Forms filters
export async function dosageFilters(page: Page) {
  await clickByText(page, 'More Filters')
  await checkCheckboxByText(page, 'Only Tablets & Capsules');
  await uncheckCheckboxByText(page, 'Only Tablets & Capsules');
  await checkCheckboxByText(page, 'Exclude Tablets & Capsules');
  await uncheckCheckboxByText(page, 'Exclude Tablets & Capsules');
};

//Hide Drug Items from the list 
export async function hideDrugItems(page: Page) {
  await fillByPlaceholder(
    page,
    secondaryOpportunity.secondarySearch,
    secondaryOpportunity.drugOptions
  );
  await page.click('button[aria-label="Hide Item"]');
  const messageLocator = page.locator('#notistack-snackbar');
  await expect(messageLocator).toBeVisible();
  await clickByText(page, 'More Filters');
  await checkCheckboxByText(page, 'Only Hidden Items');
  await verifyOpportunityPage(page); //click to Opportunity
};

//Unhide  Drug Items from the list 
export async function unhideDrugItems(page: Page) {
  await clickByText(page, 'More Filters');
  await checkCheckboxByText(page, 'Only Hidden Items');
  await page.click('body');
  await fillByPlaceholder(
    page,
    secondaryOpportunity.secondarySearch,
    secondaryOpportunity.drugOptions
  );
  await page.click('button[aria-label="Hide Item"]');
  const messageLocator = page.locator('#notistack-snackbar');
  await expect(messageLocator).toBeVisible();
  await uncheckCheckboxByText(page, 'Only Hidden Items');
  await verifyOpportunityPage(page); //click to Opportunity
};

