import puppeteer from 'puppeteer-core'

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const URL = process.env.URL || 'http://localhost:5173/?flat=1'
const OUT = 'D:\\saas\\.impeccable\\review\\'
const shots = [
  ['walk', 1500],
  ['walk2', 2600],
  ['ticket', 3900],
  ['mirror', 5300],
  ['humans', 6300],
  ['enter', 7400],
]

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--disable-gpu', '--hide-scrollbars'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 1200))

for (const [name, y] of shots) {
  await page.evaluate((v) => window.scrollTo(0, v), y)
  await new Promise((r) => setTimeout(r, 1400))
  await page.screenshot({ path: `${OUT}${name}.png` })
  console.log('shot', name)
}
await browser.close()
