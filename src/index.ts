#!/usr/bin/env node

import path from 'path';
import { loadFeedConfigs, fetchFeed, getDomainFromConfig, getOutputFilename } from './utils/parser.js';
import { loadTemplate, itemToTemplateData, renderTemplate } from './utils/template.js';
import { writeFile, getExistingUrls, getRootDir } from './utils/file.js';
import { replacePlaceholders, validatePlaceholders, slugify } from './utils/placeholder.js';
import type { PathPlaceholderData } from './types/template.js';

/**
 * メイン処理: フィードを取得してMarkdownファイルに変換する
 */
async function main(): Promise<void> {
  console.log('🚀 フィード取得を開始します...\n');

  const rootDir = getRootDir();
  const feedDir = path.join(rootDir, 'feed');

  // コマンドライン引数の確認
  const isDryRun = process.argv.includes('--dry-run');
  if (isDryRun) {
    console.log('📝 ドライランモードで実行します（ファイルは作成されません）\n');
  }

  try {
    // フィード設定を読み込む
    const configs = await loadFeedConfigs(feedDir);
    console.log(`📚 ${configs.length}件のフィード設定を読み込みました\n`);

    if (configs.length === 0) {
      console.log('⚠️  フィード設定が見つかりませんでした');
      console.log(`フィード設定ファイルを ${feedDir} 配下に配置してください`);
      return;
    }

    let totalProcessed = 0;
    let totalSkipped = 0;
    let totalErrors = 0;

    // 各フィード設定を処理
    for (const { config } of configs) {
      console.log(`\n📡 処理中: ${config.title}`);
      console.log(`   フィードURL: ${config.feed}`);

      try {
        // ドメインを取得
        const domain = getDomainFromConfig(config, config.feed);
        console.log(`   ドメイン: ${domain}`);

        // 出力パスとファイル名のテンプレートを取得
        const outputPathTemplate = config.output_path || 'feed/{domain}/';
        const outputFilenameTemplate = getOutputFilename(config);

        // プレースホルダーの検証
        const invalidPathPlaceholders = validatePlaceholders(outputPathTemplate);
        const invalidFilenamePlaceholders = validatePlaceholders(outputFilenameTemplate);

        if (invalidPathPlaceholders.length > 0) {
          console.error(`   ❌ 無効なプレースホルダー（パス）: ${invalidPathPlaceholders.join(', ')}`);
          totalErrors++;
          continue;
        }

        if (invalidFilenamePlaceholders.length > 0) {
          console.error(`   ❌ 無効なプレースホルダー（ファイル名）: ${invalidFilenamePlaceholders.join(', ')}`);
          totalErrors++;
          continue;
        }

        // テンプレートを読み込む
        const template = await loadTemplate(domain);

        // フィードを取得
        const feed = await fetchFeed(config.feed);
        console.log(`   📄 ${feed.items.length}件の記事を取得しました`);

        // 既存記事URLを取得（重複チェック用）
        const outputPathBase = path.join(rootDir, outputPathTemplate.replace(/\{[^}]+\}/g, domain));
        const existingUrls = await getExistingUrls(outputPathBase);

        // 各記事を処理
        for (const item of feed.items) {
          const source = item.link || item.guid || '';

          // 重複チェック
          if (source && existingUrls.has(source)) {
            totalSkipped++;
            continue;
          }

          // テンプレートデータを作成
          const templateData = itemToTemplateData(item, feed, config, domain);

          // パス用のプレースホルダーデータを作成
          const pubDate = item.pubDate || item.isoDate || new Date().toISOString();
          const date = new Date(pubDate);
          const pathData: PathPlaceholderData = {
            domain,
            category: config.category || '',
            feed_name: feed.title || config.title,
            title: templateData.title,
            slug: slugify(templateData.title),
            uid: templateData.uid,
            guid: item.guid || '',
            published: date,
            created: date,
            date: date,
          };

          // 出力パスとファイル名を生成
          const outputPath = replacePlaceholders(outputPathTemplate, pathData);
          const outputFilename = replacePlaceholders(outputFilenameTemplate, pathData);
          const fullPath = path.join(rootDir, outputPath, outputFilename);

          // Markdownをレンダリング
          const markdown = renderTemplate(template, templateData);

          // ファイルを書き込む
          if (!isDryRun) {
            await writeFile(fullPath, markdown);
          }

          totalProcessed++;
          console.log(`   ✅ 作成: ${path.relative(rootDir, fullPath)}`);
        }
      } catch (error) {
        console.error(`   ❌ エラー: ${error}`);
        totalErrors++;
      }
    }

    // 結果サマリーを表示
    console.log('\n' + '='.repeat(50));
    console.log('📊 処理結果');
    console.log('='.repeat(50));
    console.log(`✅ 新規作成: ${totalProcessed}件`);
    console.log(`⏭️  スキップ: ${totalSkipped}件（重複）`);
    console.log(`❌ エラー: ${totalErrors}件`);
    console.log('='.repeat(50));

    if (isDryRun) {
      console.log('\n📝 ドライランモードのため、実際のファイルは作成されていません');
    }

    console.log('\n✨ 処理が完了しました！');
  } catch (error) {
    console.error('❌ エラーが発生しました:', error);
    process.exit(1);
  }
}

// メイン処理を実行
main();
