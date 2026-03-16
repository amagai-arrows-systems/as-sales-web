# コンポーネント実装・設計ルール1. ディレクトリ構成（Layered Architecture）

コンポーネントはその「関心事」と「再利用性」に応じて、以下の3つのレイヤーに配置する。

* src/components/ui/ (Shared UI)
* 役割: プロジェクト全体で共有する最小単位のUI部品。
   * ルール: shadcn/uiベース。ビジネスロジック・API通信は禁止。スタイルと汎用Propsのみ。
* src/components/functional/ (Common Parts)
* 役割: ドメイン（特定の機能）に依存しない、再利用可能な機能コンポーネント（例：DataTable, SearchInput, FormWrapper）。
   * ルール: React Hook Form や Zod のロジックを含んでも良いが、特定のAPIレスポンスには依存させない。
* src/features/[feature-name]/components/ (Feature Specific)
* 役割: 特定のドメイン・機能に密結合したコンポーネント（例：UserProfileCard, PostEditor）。
   * ルール: その機能特有のデータ構造をPropsで受け取る、またはServer Componentsとしてデータを取得する。

2. Server / Client Components の使い分け
App Routerのパフォーマンスを最大化するため、「可能な限り Server Components」を優先する。

* Server Components (Default)
* データフェッチ、秘密情報の保持、バックエンド処理を担当。
   * src/features/ レイヤーの親コンポーネントで主に採用。
* Client Components ('use client')
* インタラクティブな操作（onClick, onChange）、Hooks（useState, useEffect）、React Hook Form を使用する場合。
   * 「Client Component は末端に追いやる」 ことを意識し、必要な部分だけを最小単位で切り出す。

3. 実装ガイドライン

* 命名規則:
* ファイル名・コンポーネント名ともに PascalCase（例: SubmitButton.tsx）。
   * ディレクトリ名は kebab-case。
* TypeScript:
* Propsには必ず型定義（type または interface）を付与する。
   * shadcn/uiのパターンに従い、React.ComponentPropsWithoutRef<"button"> 等を継承して標準属性を使えるようにする。
* スタイル:
* Tailwind CSS を使用。
   * クラスの結合には cn() ユーティリティ（tailwind-merge + clsx）を必須とする。

4. フォームとバリデーション

* React Hook Form + Zod:
* バリデーションスキーマ（Zod）は、コンポーネント外（schema.ts）に定義し、型安全性を担保する。
   * フォーム全体を管理するコンポーネントは 'use client' とする。

5. テストとドキュメント

* Storybook:
* ui/ および functional/ レイヤーのコンポーネントは必ず .stories.tsx を作成する。
* Jest / React Testing Library:
* functional/ レイヤーの複雑なロジックやバリデーション挙動に対して作成する。
* Playwright:
* app/ ページ単位のE2Eテスト、またはクリティカルパス（決済、ログイン等）に対して作成する。
