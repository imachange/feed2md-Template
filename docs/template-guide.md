# テンプレートカスタマイズガイド

Markdownテンプレートのカスタマイズ方法について説明します。

## テンプレートとは

テンプレートは、フィードから取得した記事データをMarkdownファイルに変換する際の書式を定義するファイルです。

## テンプレートファイルの種類

### default.md

すべてのフィードに適用されるデフォルトテンプレートです。

**場所**: `templates/default.md`

### ドメイン固有テンプレート

特定のドメインに対してのみ適用されるテンプレートです。

**場所**: `templates/{domain}.md`

例:
- `templates/example.com.md`
- `templates/dev.to.md`
- `templates/github.com.md`

## テンプレートの優先順位

1. ドメイン固有テンプレート（`templates/{domain}.md`）
2. デフォルトテンプレート（`templates/default.md`）
3. ビルトインテンプレート（コードに埋め込まれた最小限のテンプレート）

## テンプレートの構文

テンプレートは [Handlebars](https://handlebarsjs.com/) 形式で記述します。

### 基本的な構文

#### 変数の展開

```handlebars
{{変数名}}
```

例:
```markdown
# {{title}}

公開日: {{published}}
```

#### HTMLエスケープなし（コンテンツ用）

```handlebars
{{{変数名}}}
```

例:
```markdown
{{{content}}}
```

#### 条件分岐

```handlebars
{{#if 変数名}}
  変数が存在する場合の内容
{{/if}}
```

例:
```markdown
{{#if image_url}}
![]({{image_url}})
{{/if}}

{{#if author}}
著者: {{author}}
{{/if}}
```

## 利用可能なプレースホルダー

テンプレート内で使用できるプレースホルダーの一覧は、[プレースホルダーリファレンス](placeholder-reference.md) を参照してください。

## テンプレート例

### シンプルなテンプレート

```markdown
---
title: "{{title}}"
date: {{date}}
source: {{source}}
---

# {{title}}

{{#if image_url}}
![]({{image_url}})
{{/if}}

{{#if excerpt}}
> {{excerpt}}
{{/if}}

{{{content}}}

---

[元記事を読む]({{source}})
```

### 詳細なメタデータを含むテンプレート

```markdown
---
uid: {{uid}}
title: "{{title}}"
type: {{type}}
category: {{category}}
date: {{date}}
created: {{created}}
published: {{published}}
source: {{source}}
domain: {{domain}}
site_name: {{site_name}}
{{#if author}}author: {{author}}{{/if}}
{{#if tags_array}}
tags:
{{tags_array}}
{{/if}}
{{#if categories_array}}
categories:
{{categories_array}}
{{/if}}
---

# {{title}}

{{#if image_url}}
![]({{image_url}})

{{/if}}
## メタ情報

- **公開日**: {{published}}
- **ソース**: [{{site_name}}]({{source}})
{{#if author}}- **著者**: {{author}}{{/if}}
{{#if categories}}- **カテゴリ**: {{categories}}{{/if}}

{{#if excerpt}}
## 概要

{{excerpt}}
{{/if}}

## 本文

{{{content}}}

{{#if comments}}
## コメント

[コメントを見る]({{comments}})
{{/if}}

---

*この記事は [{{feed_name}}]({{feed_url}}) から自動取得されました。*
```

### ミニマルなテンプレート

```markdown
---
title: "{{title}}"
date: {{date}}
source: {{source}}
---

# {{title}}

{{{content}}}

[🔗 {{source}}]({{source}})
```

### ブログ風テンプレート

```markdown
---
title: "{{title}}"
date: {{published}}
author: {{author}}
categories: {{categories_array}}
tags: {{tags_array}}
---

{{#if image_url}}
<div class="hero-image">
  <img src="{{image_url}}" alt="{{title}}">
</div>
{{/if}}

# {{title}}

<div class="meta">
  <span class="date">📅 {{published}}</span>
  {{#if author}}<span class="author">✍️ {{author}}</span>{{/if}}
  <span class="source">🔗 <a href="{{source}}">{{site_name}}</a></span>
</div>

---

{{#if excerpt}}
**TL;DR**: {{excerpt}}

---
{{/if}}

{{{content}}}

---

<footer>
  <p>この記事は <a href="{{feed_url}}">{{feed_name}}</a> から自動取得されました。</p>
  <p><a href="{{source}}">元の記事を読む →</a></p>
</footer>
```

## ドメイン固有テンプレートの例

### GitHub Blog用

`templates/github.com.md`:

```markdown
---
title: "{{title}}"
date: {{published}}
source: {{source}}
domain: {{domain}}
{{#if tags_array}}
tags:
{{tags_array}}
{{/if}}
---

# 🐙 {{title}}

{{#if image_url}}
![]({{image_url}})
{{/if}}

**公開日**: {{published}} | **ソース**: [GitHub Blog]({{source}})

---

{{{content}}}

---

📰 *[GitHub Blog](https://github.blog) より*
```

### Dev.to用

`templates/dev.to.md`:

```markdown
---
title: "{{title}}"
author: {{author}}
published: {{published}}
source: {{source}}
{{#if tags_array}}
tags:
{{tags_array}}
{{/if}}
---

# {{title}}

{{#if author}}
by **{{author}}** | {{/if}}{{published}}

{{#if image_url}}
![Cover Image]({{image_url}})
{{/if}}

{{{content}}}

---

💬 [DEV Community で議論する]({{source}})
```

## テンプレートのデバッグ

### すべてのフィールドを表示するテンプレート

デバッグ用に、すべてのフィールドを表示するテンプレートを作成すると便利です：

```markdown
---
uid: {{uid}}
title: "{{title}}"
---

# デバッグ情報

## 基本情報
- uid: {{uid}}
- title: {{title}}
- description: {{description}}
- type: {{type}}
- category: {{category}}

## 日付
- date: {{date}}
- created: {{created}}
- updated: {{updated}}
- published: {{published}}
- modified: {{modified}}

## ソース
- source: {{source}}
- domain: {{domain}}
- site_name: {{site_name}}
- feed_name: {{feed_name}}
- feed_url: {{feed_url}}
- feed_category: {{feed_category}}

## コンテンツ
- excerpt: {{excerpt}}
- content_snippet: {{content_snippet}}
- language: {{language}}
- image_url: {{image_url}}

## 著者
- author: {{author}}
- authors: {{authors}}

## その他
- guid: {{guid}}
- comments: {{comments}}
- slug: {{slug}}
- visibility: {{visibility}}
- status: {{status}}

## タグ・カテゴリ
tags_array:
{{tags_array}}

categories: {{categories}}

categories_array:
{{categories_array}}

## 本文

{{{content}}}
```

## 注意事項

### HTMLコンテンツ

- `{{{content}}}` はHTMLをそのまま出力します（エスケープなし）
- セキュリティ上の理由から、信頼できるフィードのみを使用してください

### YAMLフロントマター

- フロントマター内では、改行を含む値は適切にインデントする必要があります
- 配列は `{{tags_array}}` のように既にYAML形式で整形されています

### 空の値

- 値が存在しない場合、プレースホルダーは空文字列に置き換えられます
- `{{#if}}` で存在チェックができます

## トラブルシューティング

### プレースホルダーが展開されない

- プレースホルダーの記法が正しいか確認（`{{変数名}}`）
- 使用可能なプレースホルダーか確認（[プレースホルダーリファレンス](placeholder-reference.md)）

### YAMLエラー

- フロントマターのYAMLが正しい形式か確認
- 特殊文字（`:`, `"`など）が含まれる場合はクォートで囲む

### HTMLが表示されない

- コンテンツには `{{{content}}}` （トリプル中括弧）を使用
- `{{content}}` だとHTMLタグがエスケープされます

## 参考リンク

- [Handlebars公式ドキュメント](https://handlebarsjs.com/)
- [プレースホルダーリファレンス](placeholder-reference.md)
- [フィード設定ガイド](feed-config.md)
