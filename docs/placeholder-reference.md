# プレースホルダーリファレンス

テンプレートとパス/ファイル名で使用できるプレースホルダーの完全なリファレンスです。

## パス・ファイル名用プレースホルダー

`output_path` と `output_filename` で使用できるプレースホルダーです。

### 基本情報

| プレースホルダー | 説明 | 例 |
|---------------|------|-----|
| `{domain}` | ドメイン名 | `example.com` |
| `{category}` | カテゴリ | `tech` |
| `{feed_name}` | フィード名 | `Example Blog` |
| `{title}` | 記事タイトル（サニタイズ済み） | `記事タイトル` |
| `{slug}` | スラッグ（英数字のみ） | `article-title` |
| `{uid}` | 一意のID（16進数9桁） | `1a2b3c4d5` |
| `{guid}` | 記事のGUID/ID | `article-123` |

### 日付プレースホルダー

日付プレースホルダーは、[Day.js](https://day.js.org/docs/en/display/format)のフォーマット記法に対応しています。

#### {date:FORMAT}

記事の公開日時をフォーマットします。

**例:**
- `{date}` → `2026-02-18` （デフォルト: YYYY-MM-DD）
- `{date:YYYYMMDD}` → `20260218`
- `{date:YYYY-MM-DD}` → `2026-02-18`
- `{date:YYYY/MM/DD}` → `2026/02/18`
- `{date:YYYY}` → `2026`
- `{date:MM}` → `02`
- `{date:DD}` → `18`
- `{date:YYYY-MM}` → `2026-02`

#### {published:FORMAT}

記事の公開日時をフォーマットします（`{date}` と同じ）。

**例:**
- `{published}` → `2026-02-18`
- `{published:YYYY}` → `2026`
- `{published:YYYY-MM}` → `2026-02`
- `{published:YYYYMMDD}` → `20260218`

#### {created:FORMAT}

記事の作成日時をフォーマットします。

**例:**
- `{created}` → `2026-02-18`
- `{created:YYYY-MM-DD_HH-mm-ss}` → `2026-02-18_10-30-45`
- `{created:YYYYMMDD_HHmmss}` → `20260218_103045`

### 日付フォーマットトークン

| トークン | 説明 | 例 |
|---------|------|-----|
| `YYYY` | 4桁の年 | `2026` |
| `YY` | 2桁の年 | `26` |
| `MMMM` | 月の名前（フル） | `February` |
| `MMM` | 月の名前（短縮） | `Feb` |
| `MM` | 2桁の月 | `02` |
| `M` | 月（ゼロ埋めなし） | `2` |
| `DD` | 2桁の日 | `18` |
| `D` | 日（ゼロ埋めなし） | `18` |
| `HH` | 2桁の時（24時間） | `10` |
| `H` | 時（24時間、ゼロ埋めなし） | `10` |
| `mm` | 2桁の分 | `30` |
| `m` | 分（ゼロ埋めなし） | `30` |
| `ss` | 2桁の秒 | `45` |
| `s` | 秒（ゼロ埋めなし） | `45` |

### 使用例

```yaml
# 例1: 年月別フォルダ
output_path: "feed/{domain}/{date:YYYY}/{date:MM}/"
output_filename: "{date:DD}_{slug}.md"
# 結果: feed/example.com/2026/02/18_article-title.md

# 例2: カテゴリ別
output_path: "feed/{category}/"
output_filename: "{date:YYYYMMDD}_{title}.md"
# 結果: feed/tech/20260218_記事タイトル.md

# 例3: フラット構造
output_path: "articles/"
output_filename: "{uid}.md"
# 結果: articles/1a2b3c4d5.md

# 例4: 詳細な日付
output_path: "archive/{date:YYYY-MM}/"
output_filename: "{created:YYYY-MM-DD_HH-mm-ss}_{domain}_{slug}.md"
# 結果: archive/2026-02/2026-02-18_10-30-45_example.com_article-title.md
```

## テンプレート内用プレースホルダー

テンプレートファイル（`.md`）内で使用できるプレースホルダーです。

### 基本情報

| プレースホルダー | 説明 | 型 |
|----------------|------|-----|
| `{{uid}}` | 一意のID | 文字列 |
| `{{title}}` | 記事タイトル | 文字列 |
| `{{description}}` | 説明 | 文字列 |
| `{{type}}` | タイプ（`feed`） | 文字列 |
| `{{category}}` | カテゴリ | 文字列 |

### 日付（フォーマット済み）

テンプレート内では、日付は既にフォーマットされた文字列です。

| プレースホルダー | 説明 | 形式 |
|----------------|------|------|
| `{{date}}` | 日付 | `YYYY-MM-DD` |
| `{{created}}` | 作成日時 | ISO 8601 |
| `{{updated}}` | 更新日時 | ISO 8601 |
| `{{published}}` | 公開日時 | `YYYY-MM-DD` |
| `{{modified}}` | 変更日時 | `YYYY-MM-DD` |

### ソース情報

| プレースホルダー | 説明 |
|----------------|------|
| `{{source}}` | 元記事URL |
| `{{domain}}` | ドメイン |
| `{{site_name}}` | サイト名 |
| `{{feed_name}}` | フィード名 |
| `{{feed_url}}` | フィードURL |
| `{{feed_category}}` | フィードカテゴリ |

### コンテンツ

| プレースホルダー | 説明 | エスケープ |
|----------------|------|-----------|
| `{{excerpt}}` | 抜粋 | あり |
| `{{{content}}}` | 本文HTML | **なし** |
| `{{content_snippet}}` | 本文テキスト | あり |
| `{{language}}` | 言語 | あり |
| `{{image_url}}` | 画像URL | あり |

> **注意**: `{{{content}}}` はトリプル中括弧を使用します（HTMLエスケープなし）。

### 著者情報

| プレースホルダー | 説明 | 形式 |
|----------------|------|------|
| `{{author}}` | 著者名 | 文字列 |
| `{{authors}}` | 著者情報 | YAML形式 |

### メタデータ

| プレースホルダー | 説明 |
|----------------|------|
| `{{guid}}` | GUID |
| `{{comments}}` | コメントURL |
| `{{slug}}` | スラッグ |
| `{{notes}}` | メモ |
| `{{visibility}}` | 公開範囲 |
| `{{status}}` | ステータス |

### タグ・カテゴリ

| プレースホルダー | 説明 | 形式 |
|----------------|------|------|
| `{{tags_array}}` | タグ | YAML配列 |
| `{{categories}}` | カテゴリ | カンマ区切り |
| `{{categories_array}}` | カテゴリ配列 | YAML配列 |

### 条件分岐

Handlebarsの `{{#if}}` ヘルパーを使用して、値が存在する場合のみ表示できます。

```handlebars
{{#if image_url}}
![]({{image_url}})
{{/if}}

{{#if author}}
著者: {{author}}
{{/if}}

{{#if modified}}
最終更新: {{modified}}
{{/if}}
```

### テンプレート例

```markdown
---
uid: {{uid}}
title: "{{title}}"
type: {{type}}
{{#if category}}category: {{category}}{{/if}}
date: {{date}}
published: {{published}}
source: {{source}}
domain: {{domain}}
site_name: {{site_name}}
{{#if author}}author: {{author}}{{/if}}
{{#if tags_array}}
tags:
{{tags_array}}
{{/if}}
---

# {{title}}

{{#if image_url}}
![]({{image_url}})
{{/if}}

{{#if excerpt}}
> {{excerpt}}
{{/if}}

**公開日**: {{published}}{{#if author}} | **著者**: {{author}}{{/if}}

{{{content}}}

---

[元記事を読む]({{source}}) | [{{feed_name}}]({{feed_url}})
```

## サニタイズ処理

### ファイル名のサニタイズ

パス・ファイル名用の `{title}` と `{guid}` は、ファイルシステムで安全な形式に自動変換されます：

- 無効な文字（`< > : " / \ | ? *`）を削除
- スペースをアンダースコアに変換
- 先頭のドットを削除
- 最大200文字に制限

**例:**
- `記事のタイトル？` → `記事のタイトル`
- `Hello World` → `Hello_World`
- `file/path` → `filepath`

### スラッグ化

`{slug}` は以下のルールで生成されます：

- 小文字に変換
- 英数字とハイフンのみを残す
- スペースとアンダースコアをハイフンに変換
- 前後のハイフンを削除

**例:**
- `Hello World` → `hello-world`
- `記事タイトル123` → `123`
- `React.js Tutorial` → `reactjs-tutorial`

## 参考リンク

- [Day.js フォーマットドキュメント](https://day.js.org/docs/en/display/format)
- [Handlebars 公式ドキュメント](https://handlebarsjs.com/)
- [出力パス設定ガイド](output-path-guide.md)
- [テンプレートカスタマイズガイド](template-guide.md)
