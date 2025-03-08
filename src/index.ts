import puppeteer from 'puppeteer';
import { turndown } from './turndown';

(async () => {
  // ブラウザの起動
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // 指定のURLにアクセス
  await page.goto('https://pjsekai.sega.jp/guideline/index.html', { waitUntil: 'networkidle2' });

  // CSSセレクターを使って、特定のIDの要素を取得（例: id="targetId" の要素）
  const element = await page.$('#block-2');

  if (element) {
    // 要素のinnerHTMLを取得
    const innerHTML = await page.evaluate(el => el.innerHTML, element);
    const md = turndown().turndown(innerHTML)

    Bun.file('./TERMS.md').write(md)
    console.log(md);
  } else {
    console.log('指定したIDの要素が見つかりませんでした。');
  }

  // ブラウザを閉じる
  await browser.close();
})();
