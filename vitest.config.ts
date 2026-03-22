
import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // 単一プロジェクトで十分。複数必要な場合は vitest.workspace.ts を使う
  test: {
    // ※ name は付けない（addonが自動付与する "storybook:<abs path>" に任せる）
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
    setupFiles: ['.storybook/vitest.setup.ts'], // 後述で作成
    // include はプラグインが Storybook 設定から拾うが、明示する場合は以下のように
    include: ['**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  },
  plugins: [
    storybookTest({
      // .storybook の **絶対パス**を渡す（相対でも動くが絶対が安全）
      configDir: path.join(dirname, '.storybook'),
      // storybookScript: 'pnpm storybook --no-open', // ←必要なら明示
    }),
  ],
});
