# 貢献ガイドライン

feed-to-markdown プロジェクトへの貢献に興味を持っていただき、ありがとうございます！

## 行動規範

このプロジェクトに参加するすべての人は、お互いを尊重し、建設的なコミュニケーションを心がけてください。

## 貢献の方法

### バグ報告

バグを発見した場合は、[Bug Report](https://github.com/imachange/feed2md-Action/issues/new?template=bug_report.yml) から報告してください。

以下の情報を含めると、問題の解決が早くなります：
- バグの詳細な説明
- 再現手順
- 期待される動作と実際の動作
- エラーログ
- 環境情報（OS、Node.jsバージョンなど）

### 機能要望

新しい機能のアイデアがある場合は、[Feature Request](https://github.com/imachange/feed2md-Action/issues/new?template=feature_request.yml) から提案してください。

### フィード追加

新しいフィードを追加したい場合は、以下の手順に従ってください：

1. フィード設定ファイルを作成
2. 動作確認（`pnpm run fetch -- --dry-run`）
3. プルリクエストを作成

または、[Feed Request](https://github.com/imachange/feed2md-Action/issues/new?template=feed_request.yml) からリクエストすることもできます。

### プルリクエスト

プルリクエストを作成する前に：

1. Issueを作成して、変更内容について議論する
2. 既存のIssueやPRと重複していないか確認する
3. 小さく、焦点を絞った変更にする

## 開発環境のセットアップ

### 必要なツール

- Node.js 18以上
- pnpm 8以上
- Git

### セットアップ手順

1. リポジトリをフォーク

2. フォークしたリポジトリをクローン
   ```bash
   git clone https://github.com/あなたのユーザー名/feed2md-Action.git
   cd feed2md-Action
   ```

3. 依存関係をインストール
   ```bash
   pnpm install
   ```

4. ブランチを作成
   ```bash
   git checkout -b feature/my-feature
   # または
   git checkout -b fix/bug-fix
   ```

5. 変更を加える

6. 型チェックを実行
   ```bash
   pnpm run typecheck
   ```

7. 動作確認
   ```bash
   pnpm run fetch -- --dry-run
   ```

8. コミット
   ```bash
   git add .
   git commit -m "✨新規: 機能の説明"
   ```

9. プッシュ
   ```bash
   git push origin feature/my-feature
   ```

10. プルリクエストを作成

## コーディング規約

### TypeScript

- strict モードを有効にする
- TSDocコメントを充実させる
- 型定義を明示的に書く
- `any` の使用は避ける

### コミットメッセージ

コミットメッセージは以下の形式に従ってください：

```
<絵文字><種別>: <内容>（簡潔な日本語） #<issue番号>
```

#### 絵文字と種別

- `✨新規`: 新機能
- `🐛修正`: バグ修正
- `📝ドキュメント`: ドキュメントの更新
- `♻️リファクタリング`: リファクタリング
- `🎨スタイル`: コードスタイルの変更
- `⚡️パフォーマンス`: パフォーマンス改善
- `✅テスト`: テストの追加・修正
- `🔧設定`: 設定ファイルの変更
- `⬆️依存関係`: 依存関係の更新
- `🔄自動更新`: 自動更新（GitHub Actions）

#### 例

```
✨新規: プレースホルダー機能を追加 #123
🐛修正: フィード取得時のタイムアウトエラーを修正 #456
📝ドキュメント: READMEにセットアップ手順を追加
```

### ファイル構成

- `src/`: ソースコード
  - `types/`: 型定義
  - `utils/`: ユーティリティ関数
  - `index.ts`: メインエントリーポイント
- `templates/`: テンプレートファイル
- `feed/`: フィード設定ファイル
- `docs/`: ドキュメント

### コードスタイル

- インデント: スペース2つ
- クォート: シングルクォート
- セミコロン: 使用する
- 行の長さ: 最大120文字

`.editorconfig` の設定に従ってください。

## テスト

現在、自動テストは実装されていません。以下の手動テストを実行してください：

1. 型チェック
   ```bash
   pnpm run typecheck
   ```

2. ドライラン
   ```bash
   pnpm run fetch -- --dry-run
   ```

3. 実際の実行
   ```bash
   pnpm run fetch
   ```

## プルリクエストのレビュープロセス

1. 自動チェック（CI）が通ることを確認
2. コードレビューを受ける
3. フィードバックに対応
4. 承認されたらマージ

## ライセンス

このプロジェクトに貢献することで、あなたの貢献が MIT License の下でライセンスされることに同意したものとみなされます。

## 質問・相談

質問や相談がある場合は、以下の方法でお問い合わせください：

- GitHub Discussions の [Q&A](https://github.com/imachange/feed2md-Action/discussions/categories/q-and-a)
- GitHub Issues

---

ご協力ありがとうございます！ 🎉
