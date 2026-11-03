import puppeteer from 'puppeteer-core'

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const OUT = 'D:\\saas\\.impeccable\\review\\'

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--disable-gpu', '--hide-scrollbars'],
})
const page = await browser.newPage()

// bottom of page + mobile
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://localhost:5173/?flat=1', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 1200))
const total = await page.evaluate(() => document.documentElement.scrollHeight)
console.log('total height', total)
await page.evaluate((v) => window.scrollTo(0, v), total - 900)
await new Promise((r) => setTimeout(r, 1400))
await page.screenshot({ path: `${OUT}footer.png` })
await page.evaluate((v) => window.scrollTo(0, v), total - 2000)
await new Promise((r) => setTimeout(r, 1400))
await page.screenshot({ path: `${OUT}enter2.png` })

await page.setViewport({ width: 390, height: 844 })
await page.goto('http://localhost:5173/?flat=1', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 1200))
await page.screenshot({ path: `${OUT}mobile-hero.png` })
await page.evaluate((v) => window.scrollTo(0, v), 1500)
await new Promise((r) => setTimeout(r, 1400))
await page.screenshot({ path: `${OUT}mobile-walk.png` })

await browser.close()
console.log('done')
