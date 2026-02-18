import Parser from 'rss-parser';
import type { FeedConfig, FeedConfigFile } from '../types/config.js';
import type { ParsedFeed } from '../types/feed.js';
import { findFiles, parseFrontmatter, getRootDir } from './file.js';
import path from 'path';

const parser = new Parser({
  timeout: 30000, // 30秒のタイムアウト
  customFields: {
    item: [
      ['media:content', 'media:content'],
      ['media:thumbnail', 'media:thumbnail'],
      ['content:encoded', 'content:encoded'],
      ['dc:creator', 'dc:creator'],
    ],
  },
});

/**
 * フィード設定ファイルを検索して読み込む
 * @param feedDir - フィード設定ファイルが格納されているディレクトリ
 * @returns フィード設定ファイルの配列
 */
export async function loadFeedConfigs(feedDir: string): Promise<FeedConfigFile[]> {
  const configFiles: FeedConfigFile[] = [];

  // .mdファイルを再帰的に検索
  const files = await findFiles(feedDir, /\.md$/);

  for (const filePath of files) {
    try {
      const { data } = await parseFrontmatter<FeedConfig>(filePath);

      // type: feed のみを対象とする
      if (data.type === 'feed' && data.title && data.feed) {
        configFiles.push({
          filePath,
          config: data,
        });
      }
    } catch (error) {
      console.error(`フィード設定ファイルの読み込みエラー: ${filePath}`, error);
    }
  }

  return configFiles;
}

/**
 * フィードを取得してパースする
 * @param feedUrl - フィードのURL
 * @returns パースされたフィード
 */
export async function fetchFeed(feedUrl: string): Promise<ParsedFeed> {
  try {
    const feed = await parser.parseURL(feedUrl);
    return feed as ParsedFeed;
  } catch (error) {
    throw new Error(`フィードの取得に失敗しました: ${feedUrl} - ${error}`);
  }
}

/**
 * フィード設定からドメイン名を取得する
 * @param config - フィード設定
 * @param feedUrl - フィードURL
 * @returns ドメイン名
 */
export function getDomainFromConfig(config: FeedConfig, feedUrl: string): string {
  if (config.domain) {
    return config.domain;
  }

  // フィードURLからドメインを抽出
  try {
    const url = new URL(feedUrl);
    return url.hostname.replace(/^www\./, '');
  } catch {
    return 'unknown';
  }
}

/**
 * 出力パスのデフォルト値を取得する
 * @param config - フィード設定
 * @returns 出力パス
 */
export function getOutputPath(config: FeedConfig): string {
  const rootDir = getRootDir();
  const outputPath = config.output_path || 'feed/{domain}/';
  // プレースホルダーはplaceholder.tsで処理されるので、ここでは相対パスを返す
  return path.join(rootDir, outputPath);
}

/**
 * 出力ファイル名のデフォルト値を取得する
 * @param config - フィード設定
 * @returns ファイル名テンプレート
 */
export function getOutputFilename(config: FeedConfig): string {
  return config.output_filename || '{date:YYYYMMDD}_{title}.md';
}
