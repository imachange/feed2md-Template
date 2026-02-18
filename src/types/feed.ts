/**
 * フィードアイテムの型定義
 */
export interface FeedItem {
  /** 記事タイトル */
  title?: string;
  /** 記事URL */
  link?: string;
  /** 公開日時 */
  pubDate?: string;
  /** 作成日時 */
  isoDate?: string;
  /** 著者 */
  author?: string;
  /** 説明/要約 */
  summary?: string;
  /** コンテンツ */
  content?: string;
  /** コンテンツのスニペット */
  contentSnippet?: string;
  /** GUID */
  guid?: string;
  /** カテゴリ */
  categories?: string[];
  /** コメントURL */
  comments?: string;
  /** 画像URL */
  enclosure?: {
    url: string;
    type?: string;
    length?: string;
  };
  /** その他のカスタムフィールド */
  [key: string]: any;
}

/**
 * パースされたフィードの型定義
 */
export interface ParsedFeed {
  /** フィードのタイトル */
  title?: string;
  /** フィードの説明 */
  description?: string;
  /** フィードのURL */
  feedUrl?: string;
  /** サイトのURL */
  link?: string;
  /** 言語 */
  language?: string;
  /** フィードアイテムの配列 */
  items: FeedItem[];
}
