import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * プロジェクトのルートディレクトリを取得する
 * @returns ルートディレクトリのパス
 */
export function getRootDir(): string {
  // src/utils/file.ts から ../../ でルートへ
  return path.resolve(__dirname, '../..');
}

/**
 * ファイルが存在するかチェックする
 * @param filePath - チェックするファイルパス
 * @returns 存在する場合true
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * ディレクトリを再帰的に作成する
 * @param dirPath - 作成するディレクトリパス
 */
export async function ensureDir(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true });
}

/**
 * ファイルを書き込む（ディレクトリが存在しない場合は作成）
 * @param filePath - 書き込むファイルパス
 * @param content - ファイルの内容
 */
export async function writeFile(filePath: string, content: string): Promise<void> {
  const dir = path.dirname(filePath);
  await ensureDir(dir);
  await fs.writeFile(filePath, content, 'utf-8');
}

/**
 * ファイルを読み込む
 * @param filePath - 読み込むファイルパス
 * @returns ファイルの内容
 */
export async function readFile(filePath: string): Promise<string> {
  return await fs.readFile(filePath, 'utf-8');
}

/**
 * グロブパターンでファイルを検索する（再帰的）
 * @param dir - 検索するディレクトリ
 * @param pattern - マッチするファイル名のパターン（正規表現）
 * @returns マッチしたファイルパスの配列
 */
export async function findFiles(dir: string, pattern: RegExp): Promise<string[]> {
  const files: string[] = [];

  async function scan(currentDir: string): Promise<void> {
    try {
      const entries = await fs.readdir(currentDir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);

        if (entry.isDirectory()) {
          // node_modules, .git などは除外
          if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
            await scan(fullPath);
          }
        } else if (entry.isFile() && pattern.test(entry.name)) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // ディレクトリの読み取りエラーは無視
    }
  }

  await scan(dir);
  return files;
}

/**
 * Markdownファイルのフロントマターを解析する
 * @param filePath - Markdownファイルのパス
 * @returns フロントマターとコンテンツ
 */
export async function parseFrontmatter<T = Record<string, any>>(
  filePath: string
): Promise<{ data: T; content: string }> {
  const content = await readFile(filePath);
  const { data, content: markdownContent } = matter(content);
  return { data: data as T, content: markdownContent };
}

/**
 * 既存の記事URLリストを取得する（重複チェック用）
 * @param feedDir - フィードの出力ディレクトリ
 * @returns 既存記事のURLセット
 */
export async function getExistingUrls(feedDir: string): Promise<Set<string>> {
  const urls = new Set<string>();

  if (!(await fileExists(feedDir))) {
    return urls;
  }

  try {
    const files = await findFiles(feedDir, /\.md$/);

    for (const file of files) {
      try {
        const { data } = await parseFrontmatter<{ source?: string }>(file);
        if (data.source) {
          urls.add(data.source);
        }
      } catch (error) {
        // ファイル解析エラーは無視して続行
      }
    }
  } catch (error) {
    // ディレクトリ読み取りエラーは無視
  }

  return urls;
}
