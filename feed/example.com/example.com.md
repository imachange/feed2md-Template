---
# フィード設定の例
# このファイルはサンプルです。実際のフィードを追加する際の参考にしてください。

# 必須フィールド
title: "Example Blog"  # サイト名
feed: "https://example.com/feed.xml"  # フィードURL
type: "feed"  # 必ず "feed" を指定

# オプションフィールド
domain: "example.com"  # ドメイン名（省略時はフィードURLから自動抽出）
category: "tech"  # カテゴリ
tags:
  - 技術
  - プログラミング

# 出力パスのカスタマイズ（オプション）
# デフォルト: feed/{domain}/
# プレースホルダーが使用可能:
#   {domain}, {category}, {feed_name}, {date:FORMAT}, {published:FORMAT}, {created:FORMAT}
output_path: "feed/{domain}/"

# 出力ファイル名のカスタマイズ（オプション）
# デフォルト: {date:YYYYMMDD}_{title}.md
# プレースホルダーが使用可能:
#   {title}, {slug}, {uid}, {guid}, {date:FORMAT}, {published:FORMAT}, {created:FORMAT}
output_filename: "{date:YYYYMMDD}_{title}.md"

# 【出力パスの設定例】
# 年月別フォルダ:
# output_path: "feed/{domain}/{date:YYYY}/{date:MM}/"
# output_filename: "{date:DD}_{slug}.md"
# 結果: feed/example.com/2026/02/18_article-slug.md

# カテゴリ別フォルダ:
# output_path: "feed/{category}/{domain}/"
# output_filename: "{published:YYYY-MM-DD}_{title}.md"
# 結果: feed/tech/example.com/2026-02-18_記事タイトル.md

# フラット構造（UIDのみ）:
# output_path: "articles/"
# output_filename: "{uid}.md"
# 結果: articles/1a2b3c4d5.md
---

# Example Blog フィード設定

このファイルは Example Blog のフィード設定ファイルのサンプルです。

フィードを追加する場合は、このファイルを参考に新しい設定ファイルを作成してください。
