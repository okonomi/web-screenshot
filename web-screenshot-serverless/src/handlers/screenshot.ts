import { Handler } from 'aws-lambda';
import chromium from 'chrome-aws-lambda';
import { Browser } from 'puppeteer';
import * as AWS from 'aws-sdk';
import format from 'date-fns/format'
import 'source-map-support/register';

AWS.config.update({region: 'us-east-1'});

const s3 = new AWS.S3();

export const handler: Handler = async (event) => {
  let result = null;
  let browser: Browser | null = null;

  try {
    await chromium.font('https://raw.githack.com/minoryorg/Noto-Sans-CJK-JP/master/fonts/NotoSansCJKjp-Regular.ttf');

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
      fullPage: true
    })

    await s3.upload({
      Bucket: 'web-screenshot-images-okonomi',
      Key: `${event.id}.png`,
      Body: screenshot
    }).promise()
  } catch (error) {
    throw error;
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  return result;
}
