# as-sales-web 向け GitHub Copilot 指示ファイル

## 1. プロジェクト概要

**プロジェクト名:** as-sales-web

**目的:** 最新のウェブテクノロジーで構築されたセールスエンジニア管理・情報システム。

**主な特性:**
- フロントエンド中心の Next.js アプリケーション
- React を使用したコンポーネントベースアーキテクチャ
- 包括的なテスト戦略（ユニット、統合、E2E）
- Storybook によるデザインシステムとコンポーネントカタログ

---

## 2. 技術スタック

### コアフレームワーク
- **Next.js:** 14.2.3（App Router を使用）
- **React:** 18.2.0
- **TypeScript:** 型安全性を重視した主要言語

### スタイリング & UI
- **Tailwind CSS:** ユーティリティファーストの CSS フレームワーク
- **PostCSS:** CSS 変換
- **Autoprefixer:** ブラウザベンダープレフィックス対応

### テスト & 品質
- **Jest:** ユニットおよび統合テスト
- **Vitest:** 代替テストランナー
- **Playwright:** エンドツーエンドテスト
- **Testing Library:** React コンポーネントテスティングユーティリティ
- **Storybook:** コンポーネント開発とドキュメント

### 開発・ビルド
- **pnpm:** パッケージマネージャー（ワークスペースベース）
- **ESLint:** 静的コード解析
- **Prettier:** コードフォーマッタ（Tailwind プラグイン付き）

---

## 3. コーディング規約

### 3.1 プロジェクト構成とファイル配置

#### ディレクトリ規約（Feature-Driven Architecture）
```
src/
├── app/              # Next.js app router（ページ、レイアウト）
├── components/       # 再利用可能な React コンポーネント
├── hooks/           # カスタム React フック
├── types/           # TypeScript 型定義
└── stories/         # Storybook コンポーネントストーリー
```

- **カプセル化:** 関連するコンポーネント、フック、型定義を機能ごとにグループ化します。
- **コロケーション:** コンポーネントファイルを使用される場所の近くに配置します。

#### ファイル命名規約
- **Next.js 特殊ファイル:** `page.tsx`, `layout.tsx`, `loading.tsx` など
  - 命名: 小文字
  - エクスポート: `export default`（必須）
  - 例: `src/app/page.tsx`, `src/app/layout.tsx`

- **React コンポーネント:** PascalCase
  - 命名: `UserCard.tsx`, `EngineerTable.tsx`
  - エクスポート: 名前付きエクスポート（推奨）＋デフォルトエクスポート（必要に応じて）
  - 例: `export const UserCard = ({ ... }) => { ... }`

- **フック・ユーティリティ:** camelCase
  - 命名: `useEngineerData.ts`, `formatDate.ts`
  - エクスポート: 名前付きエクスポート
  - 例: `export const useEngineerData = () => { ... }`

- **型・インターフェース:** PascalCase
  - 配置: `src/types/` またはコンポーネントと同じディレクトリ
  - 例: `src/types/engineer.ts` → `export interface Engineer { ... }`

### 3.2 React & Next.js 実装規約

#### Server / Client コンポーネント戦略
- **デフォルト:** すべてのコンポーネントは Server Components（React Server Components - RSC）として作成します。
- **Client Components:** 以下が必要な場合のみ使用：
  - 状態管理（`useState`, `useContext`）
  - 副作用（`useEffect`）
  - ブラウザAPI（localStorage、geolocation など）
  - イベントリスナー（`onClick`, `onChange` など）
- **ディレクティブ:** クライアント側レンダリングが必要なファイルの最上部に `'use client'` を追加します。
- **最適化:** ページ全体をクライアント化するのではなく、インタラクティブな要素を最小の末端コンポーネントに抽出してクライアント化します。

#### データ取得と更新
- **Fetch の配置:** データ取得は原則として Server Components で直接実行します。
- **データ渡し:** 取得したデータを子コンポーネントにプロップスで渡します。
- **例:**
  ```typescript
  // Server Component (app/page.tsx など)
  export default async function EngineerListPage() {
    const engineers = await fetchEngineers(); // Server で直接 fetch
    return <EngineerTable data={engineers} />;
  }
  ```

- **データ更新:** フォーム送信やデータ更新処理には Next.js Server Actions を使用します。
- **例:**
  ```typescript
  'use server'
  export async function updateEngineer(id: string, data: UpdateData) {
    // 更新ロジック
    revalidatePath('/engineers');
  }
  ```

### 3.3 Tailwind CSS 実装規約

#### クラス順序の強制
- **ルール:** チーム全体で Tailwind クラス順序を統一します。
- **ツール:** `prettier-plugin-tailwindcss` を使用（必須）。
- **設定:** Prettier が自動的に Tailwind クラスをソートします。
- **例:**
  ```tsx
  // ✅ 正しい（自動フォーマット）
  <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
    クリック
  </button>
  ```

#### クラス結合と組み合わせ
- **ユーティリティ関数:** `clsx` と `tailwind-merge` を組み合わせた `cn()` ヘルパーを使用します。
- **目的:** 動的なクラス結合とオーバーライド機能を有効にします。
- **例:**
  ```typescript
  // ユーティリティ: src/lib/cn.ts
  import { clsx, type ClassValue } from 'clsx';
  import { twMerge } from 'tailwind-merge';

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  ```

  ```tsx
  // コンポーネント使用例
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
  }

  export const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => {
    return (
      <button
        className={cn(
          'rounded px-4 py-2 font-semibold',
          variant === 'primary' && 'bg-blue-500 text-white hover:bg-blue-600',
          variant === 'secondary' && 'border border-gray-300 text-gray-700 hover:bg-gray-50',
          className
        )}
        {...props}
      />
    );
  };
  ```

#### 長いクラス文字列の扱い
- **禁止:** クラス文字列を別の変数に抽出しないこと（エディタ拡張機能と静的解析が機能しなくなります）。
- **❌ 間違い:**
  ```typescript
  const buttonStyle = "px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 ...";
  return <button className={buttonStyle}>クリック</button>;
  ```

- **✅ 正解（オプション 1）:** Prettier による自動折り返しを許容します。
- **✅ 正解（オプション 2）:** 複雑な UI をより小さく焦点を絞ったコンポーネントにリファクタリングします。

### 3.4 静的解析と自動化

#### インポートエイリアス規約
- **ルール:** 相対パスではなく `@/` エイリアスを使用した絶対パスを使用します。
- **禁止:** `../../components` のような相対インポートを使用しないこと。
- **例:**
  ```typescript
  // ❌ 間違い
  import { UserCard } from '../../../components/UserCard';
  import { useAuth } from '../../hooks/useAuth';

  // ✅ 正しい
  import { UserCard } from '@/components/UserCard';
  import { useAuth } from '@/hooks/useAuth';
  import type { User } from '@/types/user';
  ```

#### ESLint 設定
- **ベース:** `eslint-config-next`
- **追加ルール:**
  - **インポート順序:** インポート順序の一貫性を強制（ビルトイン、外部、エイリアス、相対）。
  - **`any` 禁止:** `any` 型の厳格な禁止—必要に応じて `unknown` を使用し、型ガードで絞り込みます。
  - **未使用変数:** エラー扱い（早期発見）。
  - **未使用インポート:** 自動削除。

#### TypeScript 厳密性
- **厳密モード:** `tsconfig.json` で有効化
- **暗黙的な Any 禁止:** `noImplicitAny: true`
- **Null チェック:** `strictNullChecks: true`
- **型推論:** 型が明白な場合は TypeScript 推論に依存；関数のパラメータと戻り値の型は明示的に注釈を付けます。

### 3.5 テスト要件

#### ユニットテスト（Jest/Vitest）
- **配置:** コンポーネントまたはフックと同じディレクトリ（`.test.ts` または `.test.tsx` サフィックス）。
- **スコープ:** フック、ユーティリティ、コンポーネントロジックを単独でテストします。
- **例パターン:**
  ```typescript
  // src/hooks/useEngineerData.test.ts
  describe('useEngineerData', () => {
    it('should fetch engineer data', () => { ... });
  });

  // src/components/EngineerTable.test.tsx
  describe('EngineerTable', () => {
    it('should render engineer rows', () => { ... });
  });
  ```

#### コンポーネントストーリー（Storybook）
- **配置:** コンポーネントと同じディレクトリ（`.stories.tsx` サフィックス）。
- **目的:** コンポーネント API とビジュアル状態をドキュメント化します。
- **例:**
  ```typescript
  // src/components/EngineerTable.stories.tsx
  import type { Meta, StoryObj } from '@storybook/react';
  import { EngineerTable } from './EngineerTable';

  const meta = {
    component: EngineerTable,
    tags: ['autodocs'],
  } satisfies Meta<typeof EngineerTable>;

  export default meta;
  type Story = StoryObj<typeof meta>;

  export const Default: Story = {
    args: { data: [...] },
  };
  ```

#### E2E テスト（Playwright）
- **配置:** `tests-e2e/` ディレクトリ
- **目的:** 完全なユーザーワークフローと重要なパスをテストします。
- **例:**
  ```typescript
  // tests-e2e/engineer-list.spec.ts
  import { test, expect } from '@playwright/test';

  test('should display engineer list', async ({ page }) => {
    await page.goto('/');
    const table = page.getByRole('table');
    await expect(table).toBeVisible();
  });
  ```

---

## 4. ベストプラクティスと制約事項

### 4.1 型安全性
- **禁止:** 型定義または関数シグネチャで `any` 型を決して使用しないこと。
- **代替案:** 必要に応じて `unknown` 型を使用し、型ガードで絞り込みます。
- **厳密な型付け:** 常に関数のパラメータと戻り値の型を明示的に注釈を付けます。
- **ジェネリック型:** 再利用可能で型安全なユーティリティとコンポーネントにはジェネリクスを使用します。

### 4.2 コンポーネントパターン

#### Props インターフェース
- 常に明示的な `Props` または `ComponentProps` インターフェースを定義します（インライン定義は不可）。
- ネイティブ要素を拡張する場合は React の組み込み `ComponentProps` または `HTMLAttributes` を使用します。
- 例:
  ```typescript
  interface EngineerTableProps {
    data: Engineer[];
    onSelect?: (engineer: Engineer) => void;
    isLoading?: boolean;
  }

  export const EngineerTable = ({ data, onSelect, isLoading }: EngineerTableProps) => {
    // ...
  };
  ```

#### 条件付きレンダリング
- シンプルな条件には三項演算子またはショートサーキット（`&&`）を使用します。
- 複雑な条件は Boolean ヘルパー変数に抽出するか、別のコンポーネントに分割して明確にします。

### 4.3 データ処理とセキュリティ

#### 外部 API 統合
- **禁止:** 外部 API のレスポンスをそのままフロントエンドに返さないこと。
- **検証:** サーバー側で必ず API データを検証して変換します。
- **型マッピング:** 外部 API 型を内部型定義にマッピングします。
- **例:**
  ```typescript
  // ✅ 正解：サーバー側の検証と変換
  export async function getEngineers() {
    const apiResponse = await fetch('https://api.example.com/engineers');
    const rawData = await apiResponse.json();
    
    // スキーマに対して検証（Zod、Yup など使用）
    const validated = engineerSchema.parse(rawData);
    
    // 必要に応じて変換
    return validated.map(toEngineerDTO);
  }
  ```

#### エラーハンドリング
- エラーを適切にキャッチしてログに記録します。
- ユーザーフレンドリーなエラーメッセージを返します（機密情報を公開しないこと）。
- 開発環境では React Error Boundary を使用します。

### 4.4 パフォーマンス最適化
- **画像最適化:** Next.js の `Image` コンポーネントを使用して自動最適化とレスポンシブサイジングを実現します。
- **コード分割:** Next.js App Router を活用して自動コード分割と遅延ロードを実現します。
- **メモ化:** `React.memo()` は控えめに使用し、測定可能なパフォーマンス向上がある場合のみです。
- **データプリフェッチ:** 予想されるユーザーアクションに対して `prefetchQuery` などのパターンを使用します（該当する場合）。

### 4.5 アクセシビリティ
- セマンティック HTML: 適切な要素（`<button>`, `<nav>`, `<main>` など）を使用します。
- ARIA ラベル: ラベルが見えないインタラクティブ要素に `aria-label` または `aria-labelledby` を提供します。
- キーボードナビゲーション: すべてのインタラクティブコンポーネントがキーボードでアクセス可能であることを確認します。
- 色コントラスト: Tailwind カラーユーティリティで WCAG AA コンプライアンスを維持します。

### 4.6 開発ワークフロー
- **コミット前:** リンター、フォーマッター、テストを実行します。
  ```bash
  pnpm lint       # ESLint
  pnpm format     # Prettier（Tailwind プラグイン付き）
  pnpm test       # ユニットテスト
  pnpm test:e2e   # E2E テスト
  ```

- **コードレビューチェックリスト:**
  - ✅ すべての型が明示的に定義されている（`any` がない）。
  - ✅ すべてのインポートが `@/` エイリアスを使用している。
  - ✅ Server / Client コンポーネント分離が意図的である。
  - ✅ Tailwind クラスが Prettier で自動フォーマットされている。
  - ✅ テストが重要なロジックとユーザーフローをカバーしている。

---

## 5. クイックリファレンス

| 概念 | 標準 | 例 |
|---------|----------|---------|
| **コンポーネントファイル** | PascalCase + 名前付きエクスポート | `export const UserCard = (...) => {}` |
| **フックファイル** | camelCase + 名前付きエクスポート | `export const useUserData = () => {}` |
| **Server Component** | デフォルト（ディレクティブなし） | 通常の TSX ファイル |
| **Client Component** | `'use client'` を最上部に | `'use client'; export const Button = ...` |
| **インポート** | `@/` エイリアスの絶対パス | `import { Button } from '@/components/Button'` |
| **Tailwind クラス** | Prettier で自動ソート | `className="rounded bg-blue-500 px-4 py-2 text-white"` |
| **型定義** | 明示的、`any` は不可 | `interface Props { id: string; name: string }` |
| **API レスポンス処理** | サーバー側の検証 | クライアントに送信する前に常に検証 |
| **テスト** | コロケーションした `.test.tsx` ファイル | `UserCard.test.tsx` を同じディレクトリに |

---

## 6. 判断に迷った場合

1. **TypeScript 型を使用:** 推論よりも明示的な型付けを優先します。
2. **コンポーネントを小さく保つ:** ロジックをカスタムフックに抽出します。
3. **Server ファースト:** Server Components でデータを取得し、Client Components はインタラクティビティのみ。
4. **重要なフローをテスト:** ユーザーが直面する動作と重要なパスに焦点を当てます。
5. **チームに相談:** 判断パターンが不明な場合は、既存コードまたはチームガイドラインを参照します。
