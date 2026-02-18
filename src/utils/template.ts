import Handlebars from 'handlebars';
import dayjs from 'dayjs';
import path from 'path';
import type { FeedItem, ParsedFeed } from '../types/feed.js';
import type { FeedConfig } from '../types/config.js';
import type { TemplateData } from '../types/template.js';
import { fileExists, readFile, getRootDir } from './file.js';
import { generateUid, slugify } from './placeholder.js';

/**
 * テンプレートを読み込む
 * @param domain - ドメイン名
 * @returns テンプレート文字列
 */
export async function loadTemplate(domain: string): Promise<string> {
  const rootDir = getRootDir();
  const domainTemplate = path.join(rootDir, 'templates', `${domain}.md`);
  const defaultTemplate = path.join(rootDir, 'templates', 'default.md');

  // ドメイン固有のテンプレートが存在すればそれを使用
  if (await fileExists(domainTemplate)) {
    return await readFile(domainTemplate);
  }

  // デフォルトテンプレートを使用
  if (await fileExists(defaultTemplate)) {
    return await readFile(defaultTemplate);
  }

  // テンプレートが存在しない場合は簡易的なデフォルト
  return getBuiltInTemplate();
}

/**
 * ビルトインのデフォルトテンプレートを取得する
 * @returns デフォルトテンプレート文字列
 */
function getBuiltInTemplate(): string {
  return `---
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
feed_name: {{feed_name}}
feed_url: {{feed_url}}
{{#if author}}author: {{author}}{{/if}}
{{#if guid}}guid: {{guid}}{{/if}}
{{#if tags_array}}tags: {{tags_array}}{{/if}}
{{#if categories_array}}categories: {{categories_array}}{{/if}}
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

## 本文

{{#if content}}
{{{content}}}
{{else}}
{{content_snippet}}
{{/if}}

---

*この記事は [{{feed_name}}]({{feed_url}}) から自動取得されました。*
`;
}

/**
 * フィードアイテムをテンプレートデータに変換する
 * @param item - フィードアイテム
 * @param feed - パースされたフィード
 * @param config - フィード設定
 * @param domain - ドメイン名
 * @returns テンプレートデータ
 */
export function itemToTemplateData(
  item: FeedItem,
  feed: ParsedFeed,
  config: FeedConfig,
  domain: string
): TemplateData {
  const title = item.title || '無題';
  const source = item.link || '';
  const pubDate = item.pubDate || item.isoDate || new Date().toISOString();
  const date = new Date(pubDate);

  // 一意のIDを生成（source URLベース、なければGUID、なければタイトル）
  const uidSource = source || item.guid || title;
  const uid = generateUid(uidSource);

  // スラッグを生成
  const slug = slugify(title);

  // 画像URLを取得
  let imageUrl = '';
  if (item.enclosure?.url) {
    imageUrl = item.enclosure.url;
  } else if (item['media:thumbnail']?.['$']?.url) {
    imageUrl = item['media:thumbnail']['$'].url;
  } else if (item['media:content']?.['$']?.url) {
    imageUrl = item['media:content']['$'].url;
  }

  // コンテンツを取得
  const content = item['content:encoded'] || item.content || '';
  const contentSnippet = item.contentSnippet || item.summary || '';

  // 著者情報
  const author = item['dc:creator'] || item.author || '';

  // カテゴリとタグ
  const categories = item.categories || [];
  const tags = config.tags || [];

  return {
    uid,
    title,
    description: item.summary || contentSnippet || '',
    type: 'feed',
    category: config.category || '',
    date: dayjs(date).format('YYYY-MM-DD'),
    created: date.toISOString(),
    updated: date.toISOString(),
    published: dayjs(date).format('YYYY-MM-DD'),
    modified: dayjs(date).format('YYYY-MM-DD'),
    source,
    domain,
    site_name: config.title,
    feed_name: feed.title || config.title,
    feed_url: config.feed,
    feed_category: config.category || '',
    excerpt: item.summary || '',
    content,
    content_snippet: contentSnippet,
    language: feed.language || '',
    image_url: imageUrl,
    author,
    authors: author ? `  - ${author}` : '',
    guid: item.guid || '',
    comments: item.comments || '',
    tags_array: tags.length > 0 ? tags.map((t) => `  - ${t}`).join('\n') : '',
    categories: categories.join(', '),
    categories_array: categories.length > 0 ? categories.map((c) => `  - ${c}`).join('\n') : '',
    slug,
    notes: '',
    visibility: 'public',
    status: 'published',
  };
}

/**
 * テンプレートをレンダリングする
 * @param templateStr - テンプレート文字列
 * @param data - テンプレートデータ
 * @returns レンダリングされたMarkdown
 */
export function renderTemplate(templateStr: string, data: TemplateData): string {
  const template = Handlebars.compile(templateStr);
  return template(data);
}
