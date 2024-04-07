import { test, expect, Locator, Page } from "@playwright/test";
import { generatePhoneNumber } from "./helpers";
import UserType from "src/types/UserType";
const APP_URL = "http://localhost:5173";
test("UsersList renders correctly", async ({ page }) => {
  await page.goto(APP_URL);

  await page.waitForSelector("h2");
  const heading = await page.$eval("h2", (el) => el.textContent);
  expect(heading).toContain("User List");
});

test("Clicking on New User button opens CreateUser component", async ({
  page,
}) => {
  await page.goto(APP_URL);
  await page.click('button:has-text("New User")'); // Click on the New User button
  await page.waitForSelector("input#firstName");
  const inputExists = await page.isVisible("input#firstName");
  expect(inputExists).toBe(true);
});

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
test("Editing a user opens EditUser component", async ({ page }) => {
  const phone = generatePhoneNumber();
  await page.goto(APP_URL);

  let editButton = await page.getByRole("button", { name: "Edit" }).first();
  await page.pause();

  await editUser(
    page,
    editButton,
    {
      firstName: "a",
      lastName: "b",
      phoneNumber: phone,
      id: 1,
    },
    async () => {
      const errorInputs = await page.locator(".error").isVisible();
      expect(errorInputs).toBeFalsy();
      await page.pause();
    }
  );

  await page.pause();

  editButton = await page.getByRole("button", { name: "Edit" }).nth(1);
  await editUser(
    page,
    editButton,
    {
      firstName: "a",
      lastName: "b",
      phoneNumber: phone,
      id: 1,
    },
    async () => {
      await page.pause();
      const errorInputs = await page.locator(".error").isVisible();
      expect(errorInputs).toBeTruthy();
    }
  );
});
