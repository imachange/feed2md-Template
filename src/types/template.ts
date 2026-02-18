/**
 * テンプレートデータの型定義
 */
export interface TemplateData {
  /** 一意のID */
  uid: string;
  /** 記事タイトル */
  title: string;
  /** 説明 */
  description: string;
  /** タイプ */
  type: string;
  /** カテゴリ */
  category: string;
  /** 日付（YYYY-MM-DD） */
  date: string;
  /** 作成日時（ISO 8601） */
  created: string;
  /** 更新日時（ISO 8601） */
  updated: string;
  /** 公開日時（YYYY-MM-DD） */
  published: string;
  /** 変更日時（YYYY-MM-DD） */
  modified: string;
  /** 元記事URL */
  source: string;
  /** ドメイン */
  domain: string;
  /** サイト名 */
  site_name: string;
  /** フィード名 */
  feed_name: string;
  /** フィードURL */
  feed_url: string;
  /** フィードカテゴリ */
  feed_category: string;
  /** 抜粋 */
  excerpt: string;
  /** 本文HTML */
  content: string;
  /** 本文テキスト */
  content_snippet: string;
  /** 言語 */
  language: string;
  /** 画像URL */
  image_url: string;
  /** 著者名 */
  author: string;
  /** 著者情報（YAML形式） */
  authors: string;
  /** GUID */
  guid: string;
  /** コメントURL */
  comments: string;
  /** タグ（YAML配列形式） */
  tags_array: string;
  /** カテゴリ（カンマ区切り） */
  categories: string;
  /** カテゴリ配列 */
  categories_array: string;
  /** スラッグ */
  slug: string;
  /** メモ */
  notes: string;
  /** 公開範囲 */
  visibility: string;
  /** ステータス */
  status: string;
}

/**
 * パス/ファイル名用のプレースホルダーデータ
 */
export interface PathPlaceholderData {
  /** ドメイン名 */
  domain: string;
  /** カテゴリ */
  category: string;
  /** フィード名 */
  feed_name: string;
  /** 記事タイトル（サニタイズ済み） */
  title: string;
  /** スラッグ */
  slug: string;
  /** 一意のID */
  uid: string;
  /** GUID */
  guid: string;
  /** 公開日時 */
  published: Date;
  /** 作成日時 */
  created: Date;
  /** 日付（記事の公開日時） */
  date: Date;
}
