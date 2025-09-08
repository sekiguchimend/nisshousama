# Dispatch Harmony Hub

派遣業務管理システムのフロントエンドプロジェクトです。

## プロジェクト構成

```
dispatch-harmony-hub/
├── front/              # Next.js フロントエンドアプリケーション
│   ├── src/
│   │   ├── app/        # Next.js App Router
│   │   ├── components/ # UIコンポーネント
│   │   ├── hooks/      # カスタムフック
│   │   ├── lib/        # ユーティリティ
│   │   └── providers/  # React Context
│   ├── package.json
│   └── README.md       # フロントエンド詳細ドキュメント
├── .git/               # Git リポジトリ
├── .gitignore
└── README.md           # このファイル
```

## 開発の開始

1. フロントエンドディレクトリに移動:
```bash
cd front
```

2. 依存関係をインストール:
```bash
yarn install
```

3. 開発サーバーを起動:
```bash
yarn dev
```

4. ブラウザで http://localhost:3000 を開く

## 技術スタック

- **Frontend**: Next.js 15 + React 18 + TypeScript
- **Styling**: Tailwind CSS + Radix UI
- **State Management**: TanStack Query
- **Development**: ESLint + TypeScript

詳細な情報は `front/README.md` をご確認ください。

## プロジェクト履歴

このプロジェクトは元々Vite + Reactで構築されていましたが、Next.js 15に移行されました。移行により以下の利点が得られています：

- Server Side Rendering (SSR) によるパフォーマンス向上
- App Router による改善されたルーティング
- Next.js の最適化機能の活用
- 改善されたSEO対応
