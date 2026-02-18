---
uid: {{uid}}
title: "{{title}}"
type: {{type}}
date: {{date}}
created: {{created}}
published: {{published}}
source: {{source}}
domain: {{domain}}
site_name: {{site_name}}
{{#if author}}author: {{author}}{{/if}}
{{#if tags_array}}
tags:
{{tags_array}}
{{/if}}
---

# {{title}}

{{#if image_url}}
![]({{image_url}})

{{/if}}
{{#if excerpt}}
**概要**: {{excerpt}}

{{/if}}
**公開日**: {{published}} | **ソース**: [{{site_name}}]({{source}}){{#if author}} | **著者**: {{author}}{{/if}}

---

{{#if content}}
{{{content}}}
{{else}}
{{content_snippet}}
{{/if}}

---

📰 *[{{feed_name}}]({{feed_url}}) より*
