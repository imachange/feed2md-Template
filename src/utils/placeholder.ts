import dayjs from 'dayjs';
import crypto from 'crypto';
import type { PathPlaceholderData } from '../types/template.js';

/**
 * 文字列をファイル名として安全な形式にサニタイズする
 * @param str - サニタイズする文字列
 * @returns サニタイズされた文字列
 */
export function sanitizeFileName(str: string): string {
  return str
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '') // 無効な文字を削除
    .replace(/\s+/g, '_') // スペースをアンダースコアに
    .replace(/^\.+/, '') // 先頭のドットを削除
    .substring(0, 200); // 長さを制限
}

/**
 * 文字列をスラッグ化する
 * @param str - スラッグ化する文字列
 * @returns スラッグ
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // 英数字、スペース、ハイフン以外を削除
    .replace(/[\s_-]+/g, '-') // スペースとアンダースコアをハイフンに
    .replace(/^-+|-+$/g, ''); // 前後のハイフンを削除
}

/**
 * 文字列から一意のIDを生成する
 * @param str - 元の文字列
 * @returns 16進数9桁のID
 */
export function generateUid(str: string): string {
  const hash = crypto.createHash('sha256').update(str).digest('hex');
  return hash.substring(0, 9);
}

/**
 * URLからドメイン名を抽出する
 * @param url - URL
 * @returns ドメイン名
 */
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '');
  } catch {
    return 'unknown';
  }
}

/**
 * 日付フォーマットのプレースホルダーを処理する
 * @param format - moment.js形式のフォーマット文字列（例: "YYYY-MM-DD", "YYYYMMDD"）
 * @param date - 日付オブジェクト
 * @returns フォーマットされた日付文字列
 */
export function formatDatePlaceholder(format: string, date: Date): string {
  return dayjs(date).format(format);
}

/**
 * パス/ファイル名のプレースホルダーを置換する
 * @param template - プレースホルダーを含むテンプレート文字列
 * @param data - プレースホルダーデータ
 * @returns 置換後の文字列
 */
export function replacePlaceholders(template: string, data: PathPlaceholderData): string {
  let result = template;

  // 日付プレースホルダーの処理（フォーマット指定あり）
  // {date:YYYY-MM-DD}, {published:YYYYMMDD}, {created:YYYY/MM/DD} などに対応
  const datePatterns = [
    { key: 'date', value: data.date },
    { key: 'published', value: data.published },
    { key: 'created', value: data.created },
  ];

  for (const { key, value } of datePatterns) {
    // フォーマット指定あり: {date:YYYY-MM-DD}
    const regex = new RegExp(`\\{${key}:([^}]+)\\}`, 'g');
    result = result.replace(regex, (_, format) => {
      return formatDatePlaceholder(format, value);
    });

    // フォーマット指定なし: {date} -> デフォルト YYYY-MM-DD
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), formatDatePlaceholder('YYYY-MM-DD', value));
  }

  // 通常のプレースホルダーの処理
  const placeholders: Record<string, string> = {
    domain: data.domain,
    category: data.category,
    feed_name: data.feed_name,
    title: sanitizeFileName(data.title),
    slug: data.slug,
    uid: data.uid,
    guid: sanitizeFileName(data.guid),
  };

  for (const [key, value] of Object.entries(placeholders)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }

  return result;
}

/**
 * プレースホルダーが有効かどうかを検証する
 * @param template - 検証するテンプレート文字列
 * @returns 無効なプレースホルダーの配列
 */
export function validatePlaceholders(template: string): string[] {
  const validPlaceholders = [
    'domain',
    'category',
    'feed_name',
    'title',
    'slug',
    'uid',
    'guid',
    'date',
    'published',
    'created',
  ];

  const placeholderPattern = /\{([^}:]+)(?::[^}]+)?\}/g;
  const found: string[] = [];
  const invalid: string[] = [];

  let match;
  while ((match = placeholderPattern.exec(template)) !== null) {
    const placeholder = match[1];
    if (placeholder && !found.includes(placeholder)) {
      found.push(placeholder);
      if (!validPlaceholders.includes(placeholder)) {
        invalid.push(placeholder);
      }
    }
  }

  return invalid;
}
