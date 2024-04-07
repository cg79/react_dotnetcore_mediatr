import { test, expect } from "@playwright/test";
import { generatePhoneNumber } from "./helpers";
import { editUser } from "./FillEditUser";
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
      const errorDiv = await page.locator(".error");
      const errorText = await errorDiv.textContent();

      expect(errorText).toEqual(
        "sPhone number is already associated with another user."
      );
    }
  );
});
