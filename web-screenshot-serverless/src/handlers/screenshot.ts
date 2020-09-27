import { Handler } from 'aws-lambda';
import chromium from 'chrome-aws-lambda';
import { Browser } from 'puppeteer';
import 'source-map-support/register';


export const handler: Handler = async (event) => {
  let result = null;
  let browser: Browser | null = null;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    let page = await browser.newPage();

    await page.goto(event.url || 'https://example.com');
    result = await page.title();

    const screenshot = await page.screenshot({
      fullPage: true,
      path: './screenshot.png'
    })
  } catch (error) {
    throw error;
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  return result;
}
