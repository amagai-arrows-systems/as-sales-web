import { test, expect } from '@playwright/test';

test.describe('Engineer List Page', () => {
  test('should display the engineer list table with data', async ({ page }) => {
    // ページにアクセス
    await page.goto('/');

    // タイトルの確認
    await expect(page.locator('h1')).toHaveText('就業状況管理一覧');

    // テーブルが表示されるのを待つ
    const table = page.locator('table');
    await expect(table).toBeVisible();

    // ネットワークがアイドルになるのを待ち、初期データのレンダリングを保証
    await page.waitForLoadState('networkidle');

    // ダミーデータの1件目（佐藤 太郎）が表示されていることを確認
    const row = page.locator('tbody tr').filter({ hasText: '佐藤 太郎' });
    await expect(row).toBeVisible();

    // 2件目（林 裕太）も確認
    const row2 = page.locator('tbody tr').filter({ hasText: '林 裕太' });
    await expect(row2).toBeVisible();
  });

  test('should filter engineers by name, client, or site', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const searchInput = page.locator('input[type="text"][placeholder*="検索"]');
    await expect(searchInput).toBeVisible();

    // 初期状態の行数を取得 (30件のはず)
    const initialRowCount = await page.locator('tbody tr').count();
    expect(initialRowCount).toBe(30);

    // "デモ" でフィルタリング (client)
    await searchInput.fill('デモ');
    // "デモシステムズ" を持つクライアントは5件
    await expect(page.locator('tbody tr')).toHaveCount(5);
    await expect(page.getByText('佐藤 太郎')).toBeVisible();
    await expect(page.getByText('林 裕太')).toBeVisible();
    
    // "株式会社エンジニアリング" は表示されない
    await expect(page.getByText('田中 美咲')).not.toBeVisible();

    // 検索ボックスをクリア
    await searchInput.fill('');
    await expect(page.locator('tbody tr')).toHaveCount(initialRowCount);
  });

  test('should sort engineers by column', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const idHeader = page.locator('th', { hasText: 'No' });
    const clientHeader = page.locator('th', { hasText: '契約先/常駐先' });
    const firstRowLocator = page.locator('tbody tr:first-child');

    // 1. Sort by ID (descending, since default is ascending)
    await idHeader.click(); // Should be descending now
    
    // The highest ID is 1338
    await expect(firstRowLocator).toContainText('1338');
    await expect(firstRowLocator).toContainText('岡田 准一');

    // 2. Sort by ID (ascending)
    await idHeader.click();
    await expect(firstRowLocator).toContainText('1301');
    await expect(firstRowLocator).toContainText('佐藤 太郎');
    
    // 3. Sort by Client (ascending)
    await clientHeader.click();
    // 'デモシステムズ' should be one of the first, so '阿部 寛' (with '株式会社エンジニアリング') should not be first.
    await expect(firstRowLocator).not.toContainText('阿部 寛');
    // Let's check for a more specific first entry if possible. 'デモシステムズ' is likely first alphabetically.
    await expect(firstRowLocator).toContainText('佐藤 太郎'); // 佐藤 太郎 is with デモシステムズ

    // 4. Sort by Client (descending)
    await clientHeader.click();
    // 'フューチャー・テクノロジー' is one of the last in alphabetical order. '山本 恵' is with them.
    await expect(firstRowLocator).toContainText('山本 恵'); 
  });
});
