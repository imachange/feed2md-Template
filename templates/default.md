---
uid: {{uid}}
title: "{{title}}"
type: {{type}}
{{#if category}}category: {{category}}{{/if}}
date: {{date}}
created: {{created}}
published: {{published}}
{{#if modified}}modified: {{modified}}{{/if}}
source: {{source}}
domain: {{domain}}
site_name: {{site_name}}
feed_name: {{feed_name}}
feed_url: {{feed_url}}
{{#if feed_category}}feed_category: {{feed_category}}{{/if}}
{{#if author}}author: {{author}}{{/if}}
{{#if guid}}guid: {{guid}}{{/if}}
{{#if language}}language: {{language}}{{/if}}
{{#if tags_array}}
tags:
{{tags_array}}
{{/if}}
{{#if categories_array}}
categories:
{{categories_array}}
{{/if}}
{{#if visibility}}visibility: {{visibility}}{{/if}}
{{#if status}}status: {{status}}{{/if}}
---

# {{title}}

{{#if image_url}}
![]({{image_url}})
{{/if}}

{{#if excerpt}}
> {{excerpt}}
{{/if}}

## メタ情報

- **公開日**: {{published}}
- **ソース**: [{{site_name}}]({{source}})
{{#if author}}- **著者**: {{author}}{{/if}}
{{#if categories}}- **カテゴリ**: {{categories}}{{/if}}
{{#if language}}- **言語**: {{language}}{{/if}}

## 本文

{{#if content}}
{{{content}}}
{{else}}
{{content_snippet}}
{{/if}}

{{#if comments}}
## コメント

[コメントを見る]({{comments}})
{{/if}}

---

*この記事は [{{feed_name}}]({{feed_url}}) から自動取得されました。*

<!-- 
利用可能なプレースホルダー:
基本情報: uid, title, description, type, category
日付: date, created, updated, published, modified
ソース: source, domain, site_name, feed_name, feed_url, feed_category
コンテンツ: excerpt, content, content_snippet, language, image_url
著者・その他: author, authors, guid, comments
タグ・カテゴリ: tags_array, categories, categories_array
その他: slug, notes, visibility, status

条件分岐: {{#if フィールド名}}...{{/if}}
-->
