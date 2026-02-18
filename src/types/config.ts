/**
 * フィード設定のフロントマター型定義
 */
export interface FeedConfig {
  /** サイト名（必須） */
  title: string;
  /** フィードURL（必須） */
  feed: string;
  /** タイプ（必須: "feed"） */
  type: 'feed';
  /** ドメイン名（オプション） */
  domain?: string;
  /** カテゴリ（オプション） */
  category?: string;
  /** タグ（オプション） */
  tags?: string[];
  /** 出力パス（プレースホルダー対応、デフォルト: feed/{domain}/） */
  output_path?: string;
  /** 出力ファイル名（プレースホルダー対応、デフォルト: {date:YYYYMMDD}_{title}.md） */
  output_filename?: string;
}

/**
 * フィード設定ファイルの情報
 */
export interface FeedConfigFile {
  /** 設定ファイルのパス */
  filePath: string;
  /** フロントマターの設定 */
  config: FeedConfig;
}
