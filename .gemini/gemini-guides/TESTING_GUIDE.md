# テスティングガイドライン (Next.js App Router Stack)

このドキュメントは、プロジェクトにおけるテスト方針、ツールの役割分担、および実装のベストプラクティスを定義する。

## 1. 技術スタック
- **Framework**: Next.js (App Router)
- **Core**: React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Storybook
- **Forms/Validation**: React Hook Form, Zod
- **Testing**: Jest (Unit/Logic), Playwright (E2E)
- **Lint/Format**: ESLint, Prettier
- **Package Manager**: pnpm

## 2. テスト戦略と役割分担

### 2.1 ユニットテスト (Jest / React Testing Library)
- **対象**:
    - ビジネスロジック（純粋関数）
    - Zod スキーマによるバリデーション
    - カスタムフック (`renderHook` を使用)
    - ユーティリティ関数
- **指針**: UIの見た目ではなく「入力に対する出力/振る舞い」を検証する。

### 2.2 コンポーネントテスト & VRT (Storybook)
- **対象**: shadcn/ui をベースとした共通コンポーネント、複雑なUIパーツ。
- **指針**:
    - `play` 関数を用いた Interaction Test で、ボタンクリックやフォーム入力の挙動を検証。
    - 各コンポーネントの `*.stories.tsx` を作成し、視覚的なカタログ化と VRT（Visual Regression Test）の基盤とする。

### 2.3 E2Eテスト (Playwright)
- **対象**: ユーザーの重要ジャーニー（ログイン、決済、データ投稿など）。
- **指針**:
    - 実際のブラウザ環境で実行。
    - App Router の Server Components と Client Components の境界を越えた結合を確認。
    - MSW (Mock Service Worker) を使用し、外部APIをモックして安定性を確保。

## 3. 実装ベストプラクティス

### 3.1 Zod & React Hook Form
- バリデーションロジックは必ず Zod スキーマに集約し、スキーマ単体でのユニットテストを行う。
- フォーム全体のテストは Storybook の Interaction Test で行い、エラーメッセージの表示を検証する。

### 3.2 shadcn/ui の扱い
- shadcn/ui 自体のコードは `components/ui` に配置されるが、これらはライブラリコードとして扱い、直接的なユニットテストは避ける。
- これらを組み合わせて作成する「ドメインコンポーネント」に対してテストを記述する。

### 3.3 CI/CD 統合
- **Pre-commit**: `lint-staged` を使用し、ESLint, Prettier, Jest (関連ファイルのみ) を実行。
- **CI (GitHub Actions)**:
    1. `pnpm install`
    2. `pnpm lint`
    3. `pnpm test` (Jest)
    4. `pnpm build`
    5. `pnpm exec playwright test` (重要パスのみ)

## 4. AI への指示用プロンプト例
コード生成やレビューを依頼する際は、以下の制約を前提とすること：
- 「テストコードを書く際は、ロジックは Jest、UIの振る舞いは Storybook、結合フローは Playwright という役割分担に従ってください」
- 「バリデーションのテストは Zod スキーマの safeParse を用いたパターンを優先してください」
- 「shadcn/ui コンポーネントを使用する場合、アクセシビリティ（aria-label等）を考慮したコードを生成してください」
