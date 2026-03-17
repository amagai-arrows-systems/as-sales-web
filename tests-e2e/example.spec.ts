import { test, expect } from '@playwright/test';

test('タイトル表示が正しいこと', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Create Next App/);
});

test('Templatesリンクが正しく表示すること', async ({ page }) => {
  await page.goto('/');

  // Click the Templates link.
  await page.getByRole('link', { name: 'Templates' }).click();

  // URLが期待通りに変更されたか確認
  await expect(page).toHaveURL('https://vercel.com/templates/next.js?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app');
});

test('Learningリンクが正しく表示すること', async ({ page }) => {
  await page.goto('/');

  // Click the Learning link.
  await page.getByRole('link', { name: 'Learning' }).click();

  // URLが期待通りに変更されたか確認
  await expect(page).toHaveURL('https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app');
});

test('Deploy Nowボタンが正しく表示すること', async ({ page }) => {
  await page.goto('/');

  // altテキストが「Vercel Logo」の場合
  await page.getByAltText('Vercel logomark').click();

  // 別タブが開くのを待機してクリック
  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    // altテキストが「Vercel Logo」の場合
    page.getByAltText('Vercel logomark').click()
  ]);

  // URLが期待通りに変更されたか確認
  await expect(newPage).toHaveURL('https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app');
});

test('Documentationボタンが正しく表示すること', async ({ page }) => {
  await page.goto('/');

  // 別タブが開くのを待機してクリック
  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    // 「送信」というテキストを持つボタンをクリック
    page.getByRole('link', { name: 'Documentation' }).click()
    // page.getByRole('button', { name: 'Documentation' }).click()
    // page.getByAltText('Vercel logomark').click()
  ]);

  // URLが期待通りに変更されたか確認
  await expect(newPage).toHaveURL('https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app');
});


// test('get started link', async ({ page }) => {
//   await page.goto('/');

//   // 「送信」というテキストを持つボタンをクリック
//   await page.getByRole('button', { name: 'Documentation' }).click(); 

//   // Expects page to have a heading with the name of "src/app/page.tsx".
//   await expect(page.getByRole('heading', { name: 'src/app/page.tsx' })).toBeVisible();
// });
