import { expect, Locator, Page } from "@playwright/test";
import UserType from "../types/UserType";

const editUser = async (
  page: Page,
  editButton: Locator,
  userInfo: UserType,
  runValidations: () => void
) => {
  editButton.click();

  await page.waitForSelector("input#firstName");
  const inputExists = await page.isVisible("input#firstName");
  expect(inputExists).toBe(true);

  await page.fill("#firstName", userInfo.firstName);
  await page.fill("#lastName", userInfo.lastName);
  await page.fill("#phoneNumber", userInfo.phoneNumber);

  await page.pause();
  await page.click('button:has-text("Save")');

  await runValidations();
};

export { editUser };
