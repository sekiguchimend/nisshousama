# Dispatch Harmony Hub - Frontend (Next.js)

このプロジェクトは、派遣業務管理システムのフロントエンドをNext.js 15で構築したものです。元々のVite + Reactプロジェクトから変換されています。

## 技術スタック

- **Next.js 15** - React フレームワーク（App Router使用）
- **React 18** - ユーザーインターフェースライブラリ
- **TypeScript** - 型安全性のための言語
- **Tailwind CSS** - スタイリング
- **Radix UI** - UIコンポーネント
- **TanStack Query** - データフェッチングとキャッシュ
- **Lucide React** - アイコンライブラリ

## セットアップ手順

1. 依存関係のインストール:
```bash
yarn install
```

2. 開発サーバーの起動:
```bash
yarn dev
```

3. ブラウザで http://localhost:3000 を開く

## プロジェクト構造

```
front/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css     # グローバルスタイル
│   │   ├── layout.tsx      # ルートレイアウト
│   │   ├── page.tsx        # ホームページ
│   │   └── not-found.tsx   # 404ページ
│   ├── components/
│   │   ├── dashboard/      # ダッシュボードコンポーネント
│   │   └── ui/            # 再利用可能なUIコンポーネント
│   ├── hooks/             # カスタムフック
│   ├── lib/               # ユーティリティ関数
│   └── providers/         # React Context プロバイダー
├── package.json
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 利用可能なスクリプト

- `yarn dev` - 開発サーバーを起動
- `yarn build` - プロダクション用にビルド
- `yarn start` - プロダクションサーバーを起動
- `yarn lint` - ESLintでコードをチェック

## 機能

### ダッシュボード

- **RTパネル**: リアルタイム監視パネル
- **勤務管理**: 従業員とホステスの出勤管理
- **伝票管理**: 各種伝票の作成・管理
- **レポート・検索**: データ集計とレポート生成
- **システム管理**: システム設定と管理機能

### UIコンポーネント

- Business Cards - 業務カード形式のUI
- Pink Theme - ピンクを基調とした配色テーマ
- レスポンシブデザイン - モバイル対応
- ダークモード対応

## カスタマイズ

### カラーテーマ
`src/app/globals.css` でカスタムCSS変数を定義してカラーテーマを調整できます。

### コンポーネント
shadcn/uiベースのコンポーネントを使用しており、`components.json`で設定をカスタマイズできます。

## 移行について

このプロジェクトは元々のVite + Reactプロジェクトから以下の変更を行っています：

1. **ルーティング**: React Router → Next.js App Router
2. **SSR対応**: クライアントサイドレンダリング → Server Side Rendering
3. **バンドラー**: Vite → Next.js内蔵のWebpack
4. **ファイル構造**: `src/pages/` → `src/app/`

## 注意事項

- 一部のコンポーネントには `'use client'` ディレクティブが追加されています（インタラクティブな機能のため）
- Server ComponentsとClient Componentsの適切な使い分けが行われています
