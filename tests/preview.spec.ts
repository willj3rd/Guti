import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import path from "node:path";

test("self-contained HTML renders offline with working navigation, estimates, and privacy", async ({ page, context }) => {
  await context.setOffline(true);
  await page.setViewportSize({ width: 390, height: 844 });
  const errors: string[] = [];
  const remoteRequests: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("request", request => { if (/^https?:/.test(request.url())) remoteRequests.push(request.url()); });
  // The managed Chromium policy blocks file:// navigation. Render the exact
  // exported file contents with all network access disabled instead.
  await page.setContent(await readFile(path.resolve("preview/Gutierrez-Website.html"), "utf8"));
  await expect(page.getByRole("heading", { level: 1 })).toContainText("YOUR PROPERTY.");
  await expect.poll(() => page.locator(".hero-media img").evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await expect(page.locator("body")).toHaveCSS("font-family", /Manrope/);
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Contact", exact: false }).click();
  await page.getByLabel("Your name").fill("Preview Visitor");
  await page.getByLabel("Phone number").fill("410-555-0100");
  await page.getByLabel("Property / service location").fill("Salisbury");
  await page.getByLabel("Service needed").selectOption("Lawn Care");
  await page.getByRole("button", { name: "Request a free estimate" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByLabel("Your estimate request")).toHaveValue(/Name: Preview Visitor/);
  await expect(page.getByRole("link", { name: "Text request to Darwin" })).toHaveAttribute("href", /^sms:\+14438563448/);
  await page.getByRole("button", { name: "Close request preview" }).click();
  await page.getByRole("link", { name: "Privacy", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Your privacy." })).toBeVisible();
  await page.getByRole("link", { name: "Back to the website" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("YOUR PROPERTY.");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  expect(remoteRequests).toEqual([]);
  expect(errors).toEqual([]);
});
