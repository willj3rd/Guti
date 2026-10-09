import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage publishes verified contacts and loads its local assets", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "YOUR PROPERTY.OUR PRIDE.",
  );
  await expect(page.locator(".contact-person").first()).toContainText(
    "Darwin Gutierrez",
  );
  await expect(page.locator(".contact-person").first()).toHaveAttribute(
    "href",
    "tel:+14438563448",
  );
  await expect(page.locator(".contact-person").last()).toContainText("Will");
  await expect(page.locator(".contact-person").last()).toHaveAttribute(
    "href",
    "tel:+14108920177",
  );
  await expect(page.locator("a[href^='mailto:']")).toHaveCount(0);
  await expect(page.locator("#reviews")).toHaveCount(0);
  await expect(page.locator(".work-placeholder")).toContainText(
    "project photos ready",
  );
  await expect(page.locator(".hero-image-note")).toContainText(
    "not a client project",
  );
  await page.locator("#about").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator("img")
        .evaluateAll((images) =>
          images.every(
            (image) =>
              (image as HTMLImageElement).complete &&
              (image as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  expect(errors).toEqual([]);
});

test("estimate validates fields and prepares an honest text handoff", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Request a free estimate" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByLabel("Your name").fill("Will Example");
  await page.getByLabel("Phone number").fill("410-555-0100");
  await page
    .getByLabel("Property / service location")
    .fill("Salisbury, Maryland");
  await page.getByLabel("Service needed").selectOption("Lawn Care");
  await page.getByLabel("Preferred reply").selectOption("Email");
  await page.getByRole("button", { name: "Request a free estimate" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.getByLabel("Email address")).toBeFocused();
  await page.getByLabel("Email address").fill("will@example.com");
  await page
    .getByLabel("What can we help with?")
    .fill("I'd like regular care for my lawn.");
  await page.getByRole("button", { name: "Request a free estimate" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Nothing has been sent yet");
  const text = await page.getByLabel("Your estimate request").inputValue();
  expect(text).toContain("Name: Will Example");
  expect(text).toContain("Service: Lawn Care");
  expect(text).toContain("Preferred reply: Email");
  const sms = await page
    .getByRole("link", { name: "Text request to Darwin" })
    .getAttribute("href");
  expect(sms).toBe(`sms:+14438563448?body=${encodeURIComponent(text)}`);
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  await page.getByRole("button", { name: "Copy request" }).click();
  await expect(page.getByRole("status")).toContainText("Copied");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(text);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Request a free estimate" }),
  ).toBeFocused();
});

test("mobile navigation supports keyboard dismissal and anchor navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Home" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Services", exact: false })
    .click();
  await expect(page).toHaveURL(/#services$/);
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toHaveCount(0);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

for (const width of [320, 390, 768, 1440]) {
  test(`layout fits a ${width}px screen`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    const headline = await page.locator(".hero h1").boundingBox();
    expect(headline!.x + headline!.width).toBeLessThanOrEqual(width);
    await page.screenshot({
      path: `test-results/screenshots/home-${width}.png`,
      fullPage: true,
    });
  });
}

test("homepage meets automated WCAG AA checks", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

test("mobile menu meets automated WCAG AA checks", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

test("privacy and SEO routes respond without invented contact data", async ({
  request,
}) => {
  expect((await request.get("/privacy")).status()).toBe(200);
  expect(await (await request.get("/robots.txt")).text()).toContain("Allow: /");
  const response = await request.get("/opengraph-image");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("image/png");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("localhost");
  expect(sitemap).not.toContain("example.com");
});
