import { expect, test } from '@playwright/test';
import {
  DashboardsIndexPage,
  GettingStartedSection,
} from '../pages/dashboards-index.page';

test.describe('Homepage For Iot Application - Getting Started', () => {
  // Positive Scenario - Checking for the existence of Getting Started
  test('Existence of Getting Started Section in the dashboard', async ({
    page,
  }) => {
    test.slow();

    const dashboardsPage = new DashboardsIndexPage(page);
    const gettingStartedSection = new GettingStartedSection(page);

    // Navigate to the dashboard page
    await dashboardsPage.goto();

    // Check if the "Getting Started" section is present
    expect(gettingStartedSection.gettingStartedButton).toBeDefined();
  });

  // Positive Scenario - Getting Started remains in expanded by default
  test('The "Getting Started" container remains expanded by default', async ({
    page,
  }) => {
    const dashboardsPage = new DashboardsIndexPage(page);
    const gettingStartedSection = new GettingStartedSection(page);

    // Navigate to the dashboard page
    await dashboardsPage.goto();

    // Check if "Getting Started" container is expanded by default
    await expect(gettingStartedSection.gettingStartedButton).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  //Positive scenario - Click Getting started for expansion and collapsed modes
  test('getting started section expand and collapse ', async ({ page }) => {
    const dashboardsPage = new DashboardsIndexPage(page);
    const gettingStartedSection = new GettingStartedSection(page);

    // Navigate to the dashboard page
    await dashboardsPage.goto();

    // Collapse the "Getting Started" section
    await gettingStartedSection.collapseGettingStarted();

    // Check if the "Getting Started" section is collapsed
    await expect(gettingStartedSection.gettingStartedButton).toHaveAttribute(
      'aria-expanded',
      'false',
    );

    // Expand the "Getting Started" section
    await gettingStartedSection.expandGettingStarted();

    // Check if the "Getting Started" section is expanded
    await expect(gettingStartedSection.gettingStartedButton).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  // Positive scenario - Check the appearence of Step 1 in Getting Started
  test('step 1 text is visible in getting started Section', async ({
    page,
  }) => {
    const dashboardsPage = new DashboardsIndexPage(page);

    // Navigate to the dashboard page
    await dashboardsPage.goto();

    // Locate the path for Step 1
    const step1 = page.locator("//div[text()='Step 1: Create your dashboard']");
    // Check if Step 1 text is visibile
    await expect(step1).toBeVisible();

    // Locate the path fot the Step 1 inner text
    const step1Text = page.locator(
      "//div[text()='Step 1: Create your dashboard']/following-sibling::div",
    );
    // Check if Step 1 inner text is visible
    await expect(step1Text).toBeVisible();
  });

  // Positive scenario - Check the appearence of Step 2 in Getting Started
  test('step 2 text is visible in getting started Section', async ({
    page,
  }) => {
    const dashboardsPage = new DashboardsIndexPage(page);

    // Navigate to the dashboard page
    await dashboardsPage.goto();

    // Locate the path for Step 2
    const step2 = page.locator("//div[text()='Step 2: Add widget']");
    // Check if Step 2 text is visibile
    await expect(step2).toBeVisible();

    // Locate the path fot the Step 2 inner text
    const step2Text = page.locator(
      "//div[text()='Step 2: Add widget']/following-sibling::div",
    );
    // Check if Step 2 inner text is visible
    await expect(step2Text).toBeVisible();
  });

  // Positive scenario - Check the appearence of Step 3 in Getting Started
  test('step 3 text is visible in getting started Section', async ({
    page,
  }) => {
    const dashboardsPage = new DashboardsIndexPage(page);

    // Navigate to the dashboard page
    await dashboardsPage.goto();

    // Locate the path for Step 3
    const step3 = page.locator(
      "//div[text()='Step 3: Browse and add your assets']",
    );
    // Check if Step 3 text is visibile
    await expect(step3).toBeVisible();

    // Locate the path fot the Step 3 inner text
    const step3Text = page.locator(
      "//div[text()='Step 3: Browse and add your assets']/following-sibling::div",
    );
    // Check if Step 3 inner text is visible
    await expect(step3Text).toBeVisible();
  });

  // Positive Scenario - Locate the info tooltip and assert navigation
  test('click info tooltip and assert navigation', async ({ page }) => {
    const dashboardsPage = new DashboardsIndexPage(page);

    // Navigate to the dashboard page
    await dashboardsPage.goto();

    // Locate the info tooltip
    const infoTooltip = page.locator(
      'a.awsui_link_4c84z_8inq1_93.awsui_variant-info_4c84z_8inq1_212',
    );

    // Click the info tooltip
    await infoTooltip.click();

    // Wait for the new page to load
    await page.waitForLoadState('load');

    // Assert the navigation to the expected URL
    const expectedURL =
      'https://github.com/awslabs/iot-application/blob/main/docs/user-guide.md';
    expect(page.url()).toBe(expectedURL);
  });

  // Negative Scenario - Locate the info tooltip and assert navigation
  test('click info tooltip and assert navigation for negative scenario', async ({
    page,
  }) => {
    const dashboardsPage = new DashboardsIndexPage(page);

    // Navigate to the dashboard page
    await dashboardsPage.goto();

    // Locate the info tooltip
    const infoTooltip = page.locator(
      'a.awsui_link_4c84z_8inq1_93.awsui_variant-info_4c84z_8inq1_212',
    );

    // Click the info tooltip
    await infoTooltip.click();

    // Wait for the new page to load
    await page.waitForLoadState('load');

    // Assert the navigation does not match an unexpected URL
    const unexpectedURL = 'https://unexpected-url.com';
    expect(page.url()).not.toBe(unexpectedURL);
  });

  // Negative Scenario - Getting Started should not be expandable
  test('The "Getting Started" should not be expandable', async ({ page }) => {
    const dashboardsPage = new DashboardsIndexPage(page);
    const gettingStartedSection = new GettingStartedSection(page);

    // Navigate to the dashboard page
    await dashboardsPage.goto();

    // Check if "Getting Started" container is not expandable
    const isExpandable =
      await gettingStartedSection.isGettingStartedExpandable();
    // Assert it is not expandable
    expect(isExpandable).toBeFalsy();
  });

  // Negative Scenario - Getting Started should not be collapsible
  test('The "Getting Started" should not be collapsible', async ({ page }) => {
    const dashboardsPage = new DashboardsIndexPage(page);
    const gettingStartedSection = new GettingStartedSection(page);

    // Navigate to the dashboard page
    await dashboardsPage.goto();

    // Check if "Getting Started" container is not collapsible
    const isCollapsible = await gettingStartedSection.isExpanded();
    // Assert it is not collapsible
    expect(isCollapsible).toBeTruthy();
  });

  // Negative Scenario - Getting Started section should not be collapsed initially
  test('Getting Started section should not be collapsed initially', async ({
    page,
  }) => {
    const dashboardsPage = new DashboardsIndexPage(page);
    const gettingStartedSection = new GettingStartedSection(page);

    // Navigate to the dashboard page
    await dashboardsPage.goto();

    // Check if the "Getting Started" section is not collapsed by default
    const isExpanded = await gettingStartedSection.isExpanded();
    // Assert it not to be collapsed
    expect(isExpanded).toBe(true);
  });
});
