# Trello Clone Client

Trello 風のカンバンボードアプリケーションのフロントエンド実装です。React、TypeScript、Jotai を使用して構築されており、ドラッグ&ドロップ機能を備えた直感的なタスク管理インターフェースを提供します。

## 🚀 技術スタック

### フロントエンド

- **React 19.1.1** - UI ライブラリ
- **TypeScript 5.8.3** - 型安全性の確保
- **Vite 7.1.2** - 高速な開発サーバーとビルドツール
- **React Router DOM 7.8.2** - クライアントサイドルーティング

### 状態管理

- **Jotai 2.14.0** - アトミックな状態管理ライブラリ

### UI/UX

- **@hello-pangea/dnd 18.0.1** - ドラッグ&ドロップ機能
- **Axios 1.11.0** - HTTP クライアント

### 開発ツール

- **ESLint** - コード品質管理
- **TypeScript ESLint** - TypeScript 用のリンター

## 📁 プロジェクト構造

```
src/
├── lib/
│   └── api/
│       ├── index.ts              # Axios設定とAPIクライアント
│       └── interceptors/
│           └── request.ts        # 認証ヘッダーインターセプター
├── modules/                      # ドメイン別モジュール
│   ├── auth/                     # 認証関連
│   │   ├── auth.repository.ts    # 認証API呼び出し
│   │   └── current-user.state.ts # 現在のユーザー状態
│   ├── users/
│   │   └── user.entity.ts        # ユーザーエンティティ
│   ├── lists/                    # リスト管理
│   │   ├── list.entity.ts        # リストエンティティ
│   │   ├── list.repository.ts    # リストAPI呼び出し
│   │   └── list.state.ts         # リスト状態管理
│   └── cards/                    # カード管理
│       ├── card.entity.ts        # カードエンティティ
│       ├── card.repository.ts    # カードAPI呼び出し
│       └── card.state.ts         # カード状態管理
└── pages/                        # ページコンポーネント
    ├── Home/                     # メインボードページ
    │   ├── SortableBoard/        # ドラッグ&ドロップ可能なボード
    │   │   ├── index.tsx
    │   │   ├── SortableList.tsx  # ドラッグ可能なリスト
    │   │   ├── SortableCard.tsx  # ドラッグ可能なカード
    │   │   ├── AddList.tsx       # リスト追加フォーム
    │   │   └── AddCard.tsx       # カード追加フォーム
    │   ├── Sidebar/              # サイドバー
    │   ├── CardModal/            # カード詳細モーダル
    │   └── Home.css              # ホームページスタイル
    ├── Signin/                   # ログインページ
    └── Signup/                   # ユーザー登録ページ
```

## 🏗️ アーキテクチャ

### 設計パターン

1. **Repository パターン**

   - データアクセス層を抽象化
   - API 呼び出しを一元管理
   - ビジネスロジックとデータアクセスの分離

2. **Entity パターン**

   - ドメインオブジェクトの定義
   - データ変換とバリデーション
   - 型安全性の確保

3. **Atomic State Management**
   - Jotai による細かい粒度の状態管理
   - コンポーネント間の疎結合
   - パフォーマンスの最適化

### 状態管理

```typescript
// ユーザー状態
export const currentUserAtom = atom<User>();

// リスト状態
export const listsAtom = atom<List[]>([]);

// カード状態
export const cardsAtom = atom<Card[]>([]);
export const selectedCardIdAtom = atom<string | null>(null);

// 計算された状態（選択されたカード）
export const selectedCardAtom = atom((get) => {
  const selectedCardId = get(selectedCardIdAtom);
  const cards = get(cardsAtom);
  return selectedCardId
    ? cards.find((card) => card.id == selectedCardId)
    : null;
});
```

## 🎯 主要機能

### 認証システム

- **ユーザー登録** - 名前、メールアドレス、パスワードでの新規登録
- **ログイン** - メールアドレスとパスワードでの認証
- **認証状態管理** - JWT トークンによるセッション管理
- **自動リダイレクト** - 認証状態に応じたページ遷移

### カンバンボード機能

- **リスト管理**

  - リストの作成・削除
  - ドラッグ&ドロップによる並び替え
  - 位置情報の自動更新

- **カード管理**

  - カードの作成・削除
  - リスト間でのドラッグ&ドロップ移動
  - 同一リスト内での並び替え
  - カード詳細モーダル

- **リアルタイム更新**
  - ドラッグ&ドロップ操作の即座反映
  - エラー時の状態復元
  - 楽観的 UI 更新

### UI/UX 機能

- **レスポンシブデザイン** - モバイル・デスクトップ対応
- **直感的な操作** - ドラッグ&ドロップによる直感的な操作
- **モーダル表示** - カード詳細のモーダル表示
- **サイドバー** - ナビゲーション用サイドバー

## 🚀 セットアップと実行

### 前提条件

- Node.js (v18 以上推奨)
- npm または yarn

### インストール

```bash
npm install
```

### 環境変数の設定

`.env`ファイルを作成し、API のベース URL を設定してください：

```env
VITE_API_URL=http://localhost:3000/api
```

### 開発サーバーの起動

```bash
npm run dev
```

### ビルド

```bash
npm run build
```

### プレビュー

```bash
npm run preview
```

### リンターの実行

```bash
npm run lint
```

## 🔧 開発ガイドライン

### コード構造

- **モジュール分割**: 機能ごとにディレクトリを分割
- **型安全性**: TypeScript を活用した型定義
- **エラーハンドリング**: try-catch 文による適切なエラー処理
- **状態管理**: Jotai によるアトミックな状態管理

### コンポーネント設計

- **関心の分離**: 表示ロジックとビジネスロジックの分離
- **再利用性**: 汎用的なコンポーネントの作成
- **Props 設計**: 明確なインターフェース定義

### API 設計

- **Repository パターン**: データアクセス層の抽象化
- **エラーハンドリング**: 統一されたエラー処理
- **認証**: JWT トークンによる認証

## 📝 主要なエンティティ

### User

```typescript
export class User {
  id!: string;
  name!: string;
  email!: string;
  boardId!: string;
}
```

### List

```typescript
export class List {
  id!: string;
  title!: string;
  position!: number;
}
```

### Card

```typescript
export class Card {
  id!: string;
  title!: string;
  position!: number;
  description?: string;
  dueDate!: string;
  completed!: boolean;
  listId!: string;
}
```

## 🎨 スタイリング

- **CSS Modules**: コンポーネント単位でのスタイル管理
- **レスポンシブデザイン**: モバイルファーストのアプローチ
- **Trello 風 UI**: 直感的で使いやすいインターフェース

## 🔒 セキュリティ

- **JWT 認証**: トークンベースの認証システム
- **HTTPS 通信**: 本番環境での暗号化通信
- **入力検証**: フロントエンドでの基本的な入力検証

## 🚀 デプロイメント

### ビルド最適化

- **Vite**: 高速なビルドと HMR
- **Tree Shaking**: 未使用コードの除去
- **Code Splitting**: バンドルサイズの最適化

### 環境設定

- **環境変数**: VITE\_プレフィックスでの環境変数管理
- **API URL**: 環境に応じた API エンドポイント設定

## 📊 パフォーマンス

- **Jotai**: 細かい粒度の状態管理による再レンダリング最適化
- **React 19**: 最新の React 機能によるパフォーマンス向上
- **Vite**: 高速な開発サーバーとビルド

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 🆘 サポート

問題や質問がある場合は、GitHub の Issues ページで報告してください。

---

**注意**: このアプリケーションは学習目的で作成された Trello のクローンです。商用利用の際は適切なライセンスを確認してください。
