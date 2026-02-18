# 出力パス設定ガイド

フィード設定ファイルで `output_path` と `output_filename` を使用して、記事ファイルの出力先をカスタマイズする方法を説明します。

## 基本概念

### output_path

記事ファイルを保存するディレクトリパスを指定します。

**デフォルト値**: `feed/{domain}/`

### output_filename

記事ファイルのファイル名を指定します。

**デフォルト値**: `{date:YYYYMMDD}_{title}.md`

## プレースホルダー

パスとファイル名では、以下のプレースホルダーが使用できます：

### 基本プレースホルダー

- `{domain}` - ドメイン名
- `{category}` - カテゴリ
- `{feed_name}` - フィード名
- `{title}` - 記事タイトル（サニタイズ済み）
- `{slug}` - スラッグ
- `{uid}` - 一意のID
- `{guid}` - 記事のGUID

### 日付プレースホルダー

- `{date:FORMAT}` - 記事の日付
- `{published:FORMAT}` - 公開日時
- `{created:FORMAT}` - 作成日時

日付フォーマットの詳細は [プレースホルダーリファレンス](placeholder-reference.md) を参照してください。

## 設定パターン

### パターン1: ドメイン別フォルダ（デフォルト）

記事をドメインごとにフォルダ分けします。

```yaml
output_path: "feed/{domain}/"
output_filename: "{date:YYYYMMDD}_{title}.md"
```

**出力例:**
```
feed/
├── example.com/
│   ├── 20260218_記事タイトル1.md
│   └── 20260219_記事タイトル2.md
└── dev.to/
    ├── 20260218_another-article.md
    └── 20260219_yet-another.md
```

### パターン2: 年月別フォルダ

記事を年月ごとにフォルダ分けします。アーカイブに適しています。

```yaml
output_path: "feed/{domain}/{date:YYYY}/{date:MM}/"
output_filename: "{date:DD}_{slug}.md"
```

**出力例:**
```
feed/
└── example.com/
    ├── 2026/
    │   ├── 01/
    │   │   ├── 15_article-one.md
    │   │   └── 20_article-two.md
    │   └── 02/
    │       ├── 01_article-three.md
    │       └── 18_article-four.md
    └── 2025/
        └── 12/
            └── 31_year-end-post.md
```

### パターン3: カテゴリ別フォルダ

記事をカテゴリごとにフォルダ分けします。

```yaml
output_path: "feed/{category}/{domain}/"
output_filename: "{published:YYYY-MM-DD}_{title}.md"
```

**出力例:**
```
feed/
├── tech/
│   ├── example.com/
│   │   └── 2026-02-18_tech-article.md
│   └── dev.to/
│       └── 2026-02-18_programming-tips.md
├── news/
│   └── news-site.com/
│       └── 2026-02-18_breaking-news.md
└── blog/
    └── personal-blog.com/
        └── 2026-02-18_my-thoughts.md
```

### パターン4: フラット構造（UID）

すべての記事を一つのフォルダに格納し、UIDでファイル名を決定します。

```yaml
output_path: "articles/"
output_filename: "{uid}.md"
```

**出力例:**
```
articles/
├── 1a2b3c4d5.md
├── 9f8e7d6c5.md
├── 3b4c5d6e7.md
└── 7e8f9a0b1.md
```

### パターン5: カテゴリと日付の組み合わせ

カテゴリ別に年月フォルダを作成します。

```yaml
output_path: "feed/{category}/{date:YYYY-MM}/"
output_filename: "{date:DD}_{domain}_{slug}.md"
```

**出力例:**
```
feed/
├── tech/
│   ├── 2026-01/
│   │   ├── 15_example.com_tutorial.md
│   │   └── 20_dev.to_tips-and-tricks.md
│   └── 2026-02/
│       └── 18_example.com_new-feature.md
└── news/
    └── 2026-02/
        ├── 18_news-site.com_breaking-news.md
        └── 19_news-site.com_update.md
```

### パターン6: 日付ベースのアーカイブ

年月フォルダに、詳細な日付時刻のファイル名で保存します。

```yaml
output_path: "archive/{date:YYYY-MM}/"
output_filename: "{date:DD}_{domain}_{slug}.md"
```

**出力例:**
```
archive/
├── 2026-01/
│   ├── 15_example.com_article-title.md
│   └── 20_dev.to_another-post.md
└── 2026-02/
    ├── 01_example.com_monthly-update.md
    └── 18_example.com_latest-news.md
```

### パターン7: ドメインとカテゴリの階層

ドメインとカテゴリの両方で整理します。

```yaml
output_path: "feed/{domain}/{category}/"
output_filename: "{published:YYYYMMDD}_{slug}.md"
```

**出力例:**
```
feed/
└── example.com/
    ├── tech/
    │   ├── 20260218_programming-tips.md
    │   └── 20260219_new-framework.md
    ├── blog/
    │   └── 20260218_personal-thoughts.md
    └── news/
        └── 20260218_company-update.md
```

## 高度な使用例

### タイムスタンプ付きのユニークなファイル名

```yaml
output_path: "feed/{domain}/"
output_filename: "{created:YYYY-MM-DD_HH-mm-ss}_{uid}.md"
```

重複を完全に防ぎます。

### カテゴリなしの場合のフォールバック

カテゴリが設定されていない場合、プレースホルダーは空文字列になります：

```yaml
output_path: "feed/{category}/{domain}/"
# カテゴリがない場合: feed//example.com/
```

このような場合は、以下のように設定することを推奨します：

```yaml
# カテゴリがあればカテゴリ別、なければドメインのみ
output_path: "feed/{domain}/"
```

または、すべてのフィード設定にカテゴリを明示的に設定します。

## ベストプラクティス

### 1. 一貫性のある命名規則

同じリポジトリ内では、一貫した命名規則を使用することを推奨します。

**推奨:**
```yaml
# すべてのフィードで統一
output_path: "feed/{domain}/{date:YYYY}/"
output_filename: "{date:YYYYMMDD}_{slug}.md"
```

### 2. 日付フォーマットの選択

**ファイル名には日付の短縮形式を使用:**
```yaml
output_filename: "{date:YYYYMMDD}_{title}.md"
# 良い: 20260218_article.md
```

**フォルダ名には読みやすい形式を使用:**
```yaml
output_path: "feed/{domain}/{date:YYYY}/{date:MM}/"
# 良い: feed/example.com/2026/02/
```

### 3. ファイル名の長さ

タイトルベースのファイル名は長くなりがちです：

```yaml
# 長い
output_filename: "{date:YYYY-MM-DD}_{title}.md"

# 短い（推奨）
output_filename: "{date:YYYYMMDD}_{slug}.md"
# または
output_filename: "{uid}.md"
```

### 4. 重複チェックとの相性

重複チェックは記事のURL（`source`）で行われます。
`output_path` や `output_filename` を変更しても、重複チェックには影響しません。

ただし、出力先が変わると既存ファイルが見つからなくなるため、同じ記事が再度作成される可能性があります。

### 5. SEO フレンドリーなスラッグ

ウェブサイトで公開する場合は、スラッグを使用することを推奨します：

```yaml
output_filename: "{date:YYYY-MM-DD}/{slug}.md"
# 例: 2026-02-18/how-to-use-typescript.md
```

## トラブルシューティング

### ファイルが作成されない

**原因**: 無効なプレースホルダーを使用している

**解決策**: エラーメッセージを確認し、有効なプレースホルダーに修正してください。

```bash
❌ 無効なプレースホルダー（パス）: invalid_placeholder
```

使用可能なプレースホルダーは [プレースホルダーリファレンス](placeholder-reference.md) を参照してください。

### ファイル名が長すぎる

**原因**: タイトルが長い場合、ファイル名も長くなります

**解決策**: スラッグやUIDを使用してください

```yaml
# 長い
output_filename: "{date:YYYYMMDD}_{title}.md"

# 短い
output_filename: "{date:YYYYMMDD}_{slug}.md"
# または
output_filename: "{uid}.md"
```

### 同じ記事が複数作成される

**原因**: `output_path` や `output_filename` を変更した

**解決策**: 

1. 古いファイルを削除
2. または、設定を元に戻す

### スラッシュが多い

**原因**: カテゴリが設定されていないフィードでカテゴリプレースホルダーを使用している

```yaml
output_path: "feed/{category}/{domain}/"
# カテゴリなし → feed//example.com/
```

**解決策**: 

1. すべてのフィードにカテゴリを設定
2. または、カテゴリプレースホルダーを使わない

## 参考リンク

- [プレースホルダーリファレンス](placeholder-reference.md)
- [フィード設定ガイド](feed-config.md)
- [Day.js フォーマット](https://day.js.org/docs/en/display/format)
