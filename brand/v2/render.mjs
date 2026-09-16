import { chromium } from '/Users/brucewaynesmacbook/Desktop/fiverr-gigs/node_modules/playwright-core/index.mjs';
// usage: node render.mjs out.png "query=string" W H
const [,, out, query, w, h] = process.argv;
const W = +w || 2400, H = +h || 1400;
const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl']
});
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.on('console', m => { if (m.type() === 'error') console.error('[page]', m.text()); });
page.on('pageerror', e => console.error('[pageerror]', e.message));
const url = `http://127.0.0.1:8123/logo3d.html?${query}&w=${W}&h=${H}`;
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForFunction(() => window.__ready === true || window.__error, null, { timeout: 90000 });
const err = await page.evaluate(() => window.__error);
if (err) { console.error('ERROR', err); process.exit(1); }
await page.waitForTimeout(300);
const transparent = /bg=transparent/.test(query);
await page.screenshot({ path: out, omitBackground: transparent, fullPage: false });
await browser.close();
console.log('wrote', out);
