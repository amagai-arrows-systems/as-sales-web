# プロジェクト概要

- **目的**: 営業スタッフが手運用してExcelで提供している契約状況表を必要最低限の入力オペレーションでWebサービス提供し、事務的な負担を軽減することを目的とする。

## 技術スタック

- **フレームワーク**: Next.js (App Router)
- **ライブラリ**: React, Next.js, TypeScript, Tailwind CSS, shadcn/ui, Storybook, React Hook Form, Zod
- **テスト**: Jest, Playwright
- **Lint**: ESLint, Prettier
- **パッケージマネージャー**: pnpm (または npm/yarn)

## 開発概要

本プロジェクトは、[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) でブートストラップされた [Next.js](https://nextjs.org) プロジェクトです。

### はじめに

まず、開発サーバーを起動します。

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認してください。

`app/page.tsx` ファイルを編集することで、ページの編集を開始できます。ファイルを編集すると、ページは自動的に更新されます。


このプロジェクトでは、[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)を使用して、Vercel用の新しいフォントファミリーである[Geist](https://vercel.com/font)を自動的に最適化して読み込みます。

### 詳細情報

Next.jsについてさらに詳しく知りたい場合は、以下のリソースをご覧ください。

- [Next.jsドキュメント](https://nextjs.org/docs) - Next.jsの機能とAPIについて学習できます。

- [Next.jsを学ぶ](https://nextjs.org/learn) - インタラクティブなNext.jsチュートリアルです。

[Next.js GitHubリポジトリ](https://github.com/vercel/next.js)もご覧ください。フィードバックや貢献をお待ちしています！


### Vercelへのデプロイ

Next.jsアプリをデプロイする最も簡単な方法は、Next.js開発元が提供する[Vercelプラットフォーム](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)を利用することです。

詳細については、[Next.jsデプロイに関するドキュメント](https://nextjs.org/docs/app/building-your-application/deploying)をご覧ください。