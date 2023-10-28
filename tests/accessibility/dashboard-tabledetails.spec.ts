import { expect, test } from '@playwright/test';
import { CreateDashboardPage } from '../pages/create-dashboard.page';
import {
  DashboardsIndexPage,
  PreferencesDialog,
} from '../pages/dashboards-index.page';
import { ApplicationFrame } from '../pages/application-frame.page';
import { randomUUID } from 'crypto';
import { accessibilityTest } from './accessibility';
import { deleteDashboard } from './delete-utils';

test.describe('Accessibility', () => {
  test.skip(' As a user, I can check the dashboard with details', async ({
    page,
  }) => {
    const dashboardsPage = new DashboardsIndexPage(page);
    const createDashboardPage = new CreateDashboardPage(page);
    const application = new ApplicationFrame(page);
    const preferencesDialog = new PreferencesDialog(page);

    // Introduce uniqueness to isolate test runs
    const dashboardDescription = `My dashboard description ${randomUUID()}`;

    await createDashboardPage.goto();
    await createDashboardPage.nameField.type('My Dashboard');
    await createDashboardPage.descriptionField.type(dashboardDescription);
    await expect(application.notification).toBeHidden();
    await createDashboardPage.createButton.click();
    await expect(page).toHaveURL(/dashboards\/[a-zA-Z0-9_-]{12}/);
    await createDashboardPage.expectIsNotCurrentPage();
    await expect(application.notification).toBeVisible();
    await expect(application.notification).toContainText(
      'Successfully created dashboard "My Dashboard".',
    );
    await dashboardsPage.goto();
    //Click the Preferences icon in dashboard
    await page.getByRole('button', { name: 'Preferences' }).click();
    // Click 100 dashboards in the Select page size
    await preferencesDialog.oneHundredDashboardsPageSizeOption.click();
    //Click confirm
    await page.getByRole('button', { name: 'Confirm' }).click();
    //Accessibility test for Dashboard page for details in dashboard table
    //Once ES lint rules are updated can use console.log
    // console.log(
    //   'Accessibility Issues for Dashboard page for details in dashboard table: ',
    // );
    await accessibilityTest(page);

    //Delete the created dashboard
    await deleteDashboard(page, 'My dashboard', dashboardDescription);
  });
});
