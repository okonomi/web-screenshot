import { Handler } from 'aws-lambda';
import launchChrome from '@serverless-chrome/lambda';
import CDP from 'chrome-remote-interface';
import * as puppeteer from 'puppeteer';
import 'source-map-support/register';


export const handler: Handler = async (event) => {
  let slsChrome = null
  let browser: puppeteer.Browser
  let page: puppeteer.Page

  try {
    // 前処理
    // serverless-chromeを起動し、PuppeteerからWebSocketで接続する
    slsChrome = await launchChrome()
    browser = await puppeteer.connect({ 
      browserWSEndpoint: (await CDP.Version()).webSocketDebuggerUrl 
    })
    const context = browser.defaultBrowserContext()

    // 初期設定
    const page = await context.newPage()
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'ja' })
    await page.goto(`https://www.google.co.jp/`, { waitUntil: 'networkidle0' })
    // // Webフォントを適用して豆腐を回避
    // // If User Agent is not set, the font will not be reflected, so User Agent must be set
    // await page.evaluate(() => {
    //     var style = document.createElement('style')
    //     style.textContent = `
    //         @import url('//fonts.googleapis.com/css?family=Source+Code+Pro');
    //         @import url('//fonts.googleapis.com/earlyaccess/notosansjp.css');
    //         div, input, a{ font-family: 'Noto Sans JP', sans-serif !important; };`
    //     document.head.appendChild(style)
    // })
    await page.waitFor(1000) // Wait until the font is reflected
    const screenShot = await page.screenshot({fullPage: true})
    // const searchResults = await page.evaluate(() => {
    //   const ret = []
    //   const nodeList = document.querySelectorAll<HTMLElement>("div#search h3")

    //   nodeList.forEach(node => {
    //     ret.push(node.innerText)
    //   })

    //   return ret
    // })

    await page.waitFor(1000)
    return { result: 'OK' }
  } catch (err) {
    console.error(err)
    return { result: 'NG' }
  } finally {
    if (page) {
      await page.close()
    }

    if (browser) {
      await browser.disconnect()
    }

    if (slsChrome) { 
      await slsChrome.kill()
    }
  }
}
