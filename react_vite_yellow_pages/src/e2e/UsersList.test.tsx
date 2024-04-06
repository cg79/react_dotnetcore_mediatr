import { test, expect } from "@playwright/test";

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
  // await page.pause();
});

test("Editing a user opens EditUser component", async ({ page }) => {
  await page.goto(APP_URL);
  await page.click('button:has-text("Edit")'); // Click on the Edit button of a user
  await page.waitForSelector("input#firstName");
  const inputExists = await page.isVisible("input#firstName");
  expect(inputExists).toBe(true);
  await page.pause();
});
