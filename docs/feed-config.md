# フィード設定ガイド

フィード設定ファイルの作成方法と設定項目について説明します。

## フィード設定ファイルとは

フィード設定ファイルは、取得したいRSS/Atom/JSON FeedのURLと、その出力方法を定義するMarkdownファイルです。

## ファイルの配置場所

フィード設定ファイルは `feed/` ディレクトリ配下に配置します。階層構造は自由です。

```
feed/
├── example.com/
│   └── example.com.md
├── tech/
│   ├── dev.to.md
│   └── github-blog.md
├── news/
│   └── news-site.md
└── personal-blogs/
    ├── blog-a.md
    └── blog-b.md
```

## 基本的な設定

### 最小構成

```yaml
---
title: "Example Blog"
feed: "https://example.com/feed.xml"
type: "feed"
---
```

### 必須フィールド

- `title`: サイト名（文字列）
- `feed`: フィードURL（文字列）
- `type`: `"feed"` 固定値

## オプションフィールド

### domain

ドメイン名を明示的に指定します。省略した場合は、フィードURLから自動抽出されます。

```yaml
domain: "example.com"
```

### category

フィードのカテゴリを指定します。出力パスのプレースホルダーとして使用できます。

```yaml
category: "tech"
```

### tags

フィードに関連するタグを配列で指定します。テンプレート内で使用できます。

```yaml
tags:
  - 技術
  - プログラミング
  - Web開発
```

### output_path

記事ファイルの出力先ディレクトリを指定します。プレースホルダーが使用可能です。

デフォルト: `feed/{domain}/`

```yaml
output_path: "feed/{domain}/"
# または
output_path: "feed/{category}/{domain}/"
# または
output_path: "feed/{domain}/{date:YYYY}/{date:MM}/"
```

### output_filename

記事ファイルのファイル名を指定します。プレースホルダーが使用可能です。

デフォルト: `{date:YYYYMMDD}_{title}.md`

```yaml
output_filename: "{date:YYYYMMDD}_{title}.md"
# または
output_filename: "{published:YYYY-MM-DD}_{slug}.md"
# または
output_filename: "{uid}.md"
```

## 完全な設定例

```yaml
---
title: "Example Tech Blog"
feed: "https://example.com/feed.xml"
type: "feed"
domain: "example.com"
category: "tech"
tags:
  - 技術
  - プログラミング
  - Web開発
output_path: "feed/{category}/{domain}/"
output_filename: "{date:YYYYMMDD}_{slug}.md"
---

# Example Tech Blog

このフィードは Example Tech Blog の記事を取得します。

技術系の記事を中心に、Web開発に関する情報を発信しています。
```

## 使用例

### シンプルな構成

```yaml
---
title: "GitHub Blog"
feed: "https://github.blog/feed/"
type: "feed"
---
```

### カテゴリ別に整理

```yaml
---
title: "Dev.to"
feed: "https://dev.to/feed"
type: "feed"
category: "tech"
tags:
  - 技術
  - コミュニティ
output_path: "feed/{category}/"
---
```

### 年月別フォルダ

```yaml
---
title: "News Site"
feed: "https://news.example.com/rss"
type: "feed"
category: "news"
output_path: "feed/{category}/{date:YYYY}/{date:MM}/"
output_filename: "{date:DD}_{title}.md"
---
```

### UIDベースのフラット構造

```yaml
---
title: "Blog Collection"
feed: "https://blog.example.com/feed.xml"
type: "feed"
output_path: "articles/"
output_filename: "{uid}.md"
---
```

## プレースホルダー

出力パスとファイル名で使用可能なプレースホルダーについては、[プレースホルダーリファレンス](placeholder-reference.md) と [出力パス設定ガイド](output-path-guide.md) を参照してください。

## 注意事項

### フィードURLの確認

- フィードURLが正しいか、ブラウザで確認してください
- 一部のサイトでは、複数のフィード（記事フィード、コメントフィードなど）を提供している場合があります
- JSON Feedの場合は、通常 `/feed.json` というURLです

### ドメイン名

- `domain` を省略した場合、フィードURLから自動抽出されます
- サブドメインがある場合（`blog.example.com`）、そのままドメインとして使用されます
- `www.` は自動的に削除されます

### 重複チェック

- 記事の重複は、記事のURL（`source`）で判定されます
- `output_path` や `output_filename` を変更すると、既存ファイルとの重複チェックが正しく動作しない場合があります

## トラブルシューティング

### フィードが取得できない

1. フィードURLをブラウザで開いて、正しく表示されるか確認
2. フィードの形式（RSS、Atom、JSON Feed）を確認
3. タイムアウト（30秒）以内にレスポンスが返ってくるか確認

### ファイルが作成されない

1. ドライラン（`pnpm run fetch -- --dry-run`）で動作確認
2. エラーメッセージを確認
3. プレースホルダーが正しいか確認

### 無効なプレースホルダーエラー

エラーメッセージに表示された無効なプレースホルダーを修正してください。
使用可能なプレースホルダーのリストは [プレースホルダーリファレンス](placeholder-reference.md) を参照してください。

## 参考リンク

- [プレースホルダーリファレンス](placeholder-reference.md)
- [出力パス設定ガイド](output-path-guide.md)
- [テンプレートカスタマイズガイド](template-guide.md)
